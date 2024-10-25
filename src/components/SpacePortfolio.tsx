
import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from 'react-icons/fa'

export default function SpacePortfolio() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.position.z = 5

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    const planets: THREE.Mesh[] = []
    const planetData = [
      { name: 'Skills', color: 0x00ff00, position: new THREE.Vector3(-2, 2, 0) },
      { name: 'About', color: 0xff0000, position: new THREE.Vector3(2, -2, 0) },
      { name: 'Hire', color: 0x0000ff, position: new THREE.Vector3(-2, -2, 0) },
      { name: 'Contact', color: 0xffff00, position: new THREE.Vector3(2, 2, 0) },
    ]

    planetData.forEach((data) => {
      const geometry = new THREE.SphereGeometry(0.5, 32, 32)
      const material = new THREE.MeshPhongMaterial({ color: data.color })
      const planet = new THREE.Mesh(geometry, material)
      planet.position.copy(data.position)
      scene.add(planet)
      planets.push(planet)
    })

    const starGeometry = new THREE.BufferGeometry()
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff })

    const starVertices = []
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000
      const y = (Math.random() - 0.5) * 2000
      const z = -Math.random() * 2000
      starVertices.push(x, y, z)
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))
    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    const ambientLight = new THREE.AmbientLight(0x404040)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 1, 100)
    pointLight.position.set(0, 0, 10)
    scene.add(pointLight)

    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()

      planets.forEach((planet) => {
        planet.rotation.x += 0.01
        planet.rotation.y += 0.01
      })

      stars.rotation.y += 0.0002

      renderer.render(scene, camera)
    }

    animate()

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(planets)

      if (intersects.length > 0) {
        const intersectedPlanet = intersects[0].object as THREE.Mesh
        const planetIndex = planets.indexOf(intersectedPlanet)
        setActiveSection(planetData[planetIndex].name)
      } else {
        setActiveSection(null)
      }
    }

    window.addEventListener('mousemove', onMouseMove)

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    setIsLoading(false)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const sectionContent = {
    Skills: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Skills</h2>
        <ul className="list-disc list-inside">
          <li>React & React Native</li>
          <li>TypeScript</li>
          <li>Node.js</li>
          <li>GraphQL</li>
          <li>Python</li>
          <li>Machine Learning</li>
        </ul>
      </div>
    ),
    About: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">About Peter Schun</h2>
        <p>
          Peter Schun is a passionate full-stack developer with 8+ years of experience in creating innovative web and
          mobile applications. He specializes in React, TypeScript, and Node.js, with a keen interest in AI and machine
          learning.
        </p>
      </div>
    ),
    Hire: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Hire Peter</h2>
        <p>
          Looking for a skilled developer to bring your ideas to life? Peter is available for freelance projects,
          full-time positions, and consulting work.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Get in Touch
        </button>
      </div>
    ),
    Contact: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Contact</h2>
        <p>Feel free to reach out for collaborations or just a friendly chat.</p>
        <div className="flex space-x-4">
          <a href="https://github.com/peterschun" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-2xl hover:text-gray-300" />
          </a>
          <a href="https://linkedin.com/in/peterschun" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-2xl hover:text-blue-400" />
          </a>
          <a href="mailto:peter@schun.com">
            <FaEnvelope className="text-2xl hover:text-red-400" />
          </a>
        </div>
      </div>
    ),
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white font-sans">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <>
          <canvas ref={canvasRef} className="absolute inset-0" />
          <div className="absolute top-4 left-4 z-10">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Peter Schun
            </h1>
            <p className="text-xl">Full-Stack Developer & AI Enthusiast</p>
          </div>
          <div className="absolute bottom-4 right-4 z-10">
            <a
              href="/peter_schun_cv.pdf"
              download
              className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <FaFileDownload />
              <span>Download CV</span>
            </a>
          </div>
          <AnimatePresence>
            {activeSection && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="absolute bottom-4 left-4 z-10 bg-black bg-opacity-50 backdrop-blur-md p-6 rounded-lg max-w-md"
              >
                {sectionContent[activeSection as keyof typeof sectionContent]}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}