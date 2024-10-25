import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from 'react-icons/fa'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Types
interface PlanetData {
  name: SectionName
  color: number
  position: THREE.Vector3
}

type SectionName = 'Skills' | 'About' | 'Hire' | 'Contact'

interface SectionContentProps {
  title: string
  children: React.ReactNode
}

// Components
const SectionContent: React.FC<SectionContentProps> = ({ title, children }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">{title}</h2>
    {children}
  </div>
)

const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
  </div>
)

const Header = () => (
  <div className="absolute top-4 left-4 z-10">
    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
      X Johanseen
    </h1>
    <p className="text-xl">Full-Stack Developer & AI Enthusiast</p>
  </div>
)

const CVDownloadButton = () => (
  <Button
    asChild
    className="absolute bottom-4 right-4 z-10 bg-white text-black hover:bg-gray-200 transition-colors"
  >
    <a href="/peter_schun_cv.pdf" download className="flex items-center space-x-2">
      <FaFileDownload />
      <span>Download CV</span>
    </a>
  </Button>
)

export default function SpacePortfolio() {
  const [activeSection, setActiveSection] = useState<SectionName | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const planetsRef = useRef<THREE.Mesh[]>([])

  const planetData: PlanetData[] = [
    { name: 'Skills', color: 0x00ff00, position: new THREE.Vector3(-2, 2, 0) },
    { name: 'About', color: 0xff0000, position: new THREE.Vector3(2, -2, 0) },
    { name: 'Hire', color: 0x0000ff, position: new THREE.Vector3(-2, -2, 0) },
    { name: 'Contact', color: 0xffff00, position: new THREE.Vector3(2, 2, 0) },
  ]

  const initThreeJS = useCallback(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    })

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.position.z = 5

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.maxDistance = 10
    controls.minDistance = 3

    // Create planets
    planetData.forEach((data) => {
      const geometry = new THREE.SphereGeometry(0.5, 32, 32)
      const material = new THREE.MeshPhongMaterial({ 
        color: data.color,
        shininess: 100,
        specular: new THREE.Color(0x444444)
      })
      const planet = new THREE.Mesh(geometry, material)
      planet.position.copy(data.position)
      planet.userData.name = data.name
      scene.add(planet)
      planetsRef.current.push(planet)
    })

    // Create stars
    const starGeometry = new THREE.BufferGeometry()
    const starVertices = new Float32Array(30000)
    for (let i = 0; i < 10000 * 3; i += 3) {
      starVertices[i] = (Math.random() - 0.5) * 2000
      starVertices[i + 1] = (Math.random() - 0.5) * 2000
      starVertices[i + 2] = -Math.random() * 2000
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))
    const starMaterial = new THREE.PointsMaterial({ 
      color: 0xffffff,
      size: 2,
      sizeAttenuation: true
    })
    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5)
    const pointLight = new THREE.PointLight(0xffffff, 1, 100)
    pointLight.position.set(0, 0, 10)
    scene.add(ambientLight, pointLight)

    sceneRef.current = scene
    cameraRef.current = camera
    rendererRef.current = renderer

    return { scene, camera, renderer, controls, stars }
  }, [])

  useEffect(() => {
    const threeJSObjects = initThreeJS()
    if (!threeJSObjects) return

    const { scene, camera, renderer, controls, stars } = threeJSObjects

    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()

      planetsRef.current.forEach((planet) => {
        planet.rotation.x += 0.01
        planet.rotation.y += 0.01
      })

      stars.rotation.y += 0.0002

      renderer.render(scene, camera)
    }

    animate()
    setIsLoading(false)

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(planetsRef.current)

      if (intersects.length > 0) {
        const planet = intersects[0].object
        setActiveSection(planet.userData.name as SectionName)
        document.body.style.cursor = 'pointer'
      } else {
        setActiveSection(null)
        document.body.style.cursor = 'default'
      }
    }

    const handleResize = () => {
      if (!camera || !renderer) return
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [initThreeJS])

  const sectionContent = {
    Skills: (
      <SectionContent title="Skills">
        <ul className="list-disc list-inside space-y-2">
          <li>React & React Native</li>
          <li>TypeScript</li>
          <li>Node.js</li>
          <li>GraphQL</li>
          <li>Python</li>
          <li>Machine Learning</li>
        </ul>
      </SectionContent>
    ),
    About: (
      <SectionContent title="About Peter Schun">
        <p className="text-gray-200">
          Peter Schun is a passionate full-stack developer with 8+ years of experience in creating innovative web and
          mobile applications. He specializes in React, TypeScript, and Node.js, with a keen interest in AI and machine
          learning.
        </p>
      </SectionContent>
    ),
    Hire: (
      <SectionContent title="Hire Peter">
        <p className="text-gray-200">
          Looking for a skilled developer to bring your ideas to life? Peter is available for freelance projects,
          full-time positions, and consulting work.
        </p>
        <Button className="mt-4">Get in Touch</Button>
      </SectionContent>
    ),
    Contact: (
      <SectionContent title="Contact">
        <p className="text-gray-200">Feel free to reach out for collaborations or just a friendly chat.</p>
        <div className="flex space-x-6 mt-4">
          <a 
            href="https://github.com/peterschun" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            <FaGithub className="text-2xl" />
          </a>
          <a 
            href="https://linkedin.com/in/peterschun" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaLinkedin className="text-2xl" />
          </a>
          <a 
            href="mailto:peter@schun.com"
            className="hover:text-red-400 transition-colors"
          >
            <FaEnvelope className="text-2xl" />
          </a>
        </div>
      </SectionContent>
    ),
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white font-sans">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <canvas ref={canvasRef} className="absolute inset-0" />
          <Header />
          <CVDownloadButton />
          <AnimatePresence>
            {activeSection && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-4 left-4 z-10"
              >
                <Card className="bg-black/50 backdrop-blur-md">
                  <CardContent className="p-6">
                    {sectionContent[activeSection]}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}