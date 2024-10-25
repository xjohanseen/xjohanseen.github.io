import React, { useEffect, useState } from 'react';
import { 
  Code, 
  User, 
  Mail, 
  Download, 
  Briefcase,
  ChevronRight,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isLoaded, setIsLoaded] = useState(false);
  //const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  //const [cursorSize, setCursorSize] = useState(20);

  /**
   * useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
   */

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const skills = [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'AWS', level: 70 }
  ];

  /**
   * 
   *const CustomCursor = () => (
    <div 
      className="fixed pointer-events-none z-50 mix-blend-difference"
      style={{
        left: mousePosition.x - cursorSize/2,
        top: mousePosition.y - cursorSize/2,
        width: cursorSize,
        height: cursorSize,
      }}
    >
      <div className="w-full h-full rounded-full bg-white animate-pulse" />
    </div>
  );
   * @returns 
   */

  const NavButton = ({ icon: Icon, label, section }: { icon: React.ElementType; label: string; section: string }) => (

    <button
    className={`group flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-lg
      ${activeSection === section
        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-purple-500/25'
        : 'hover:bg-white/10 text-gray-300 hover:text-white'
      }`}
    onClick={() => setActiveSection(section)}
    //onMouseEnter={() => setCursorSize(40)}
      //onMouseLeave={() => setCursorSize(20)}
  >
    <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
    <span className="hidden md:inline font-space-grotesk">{label}</span>
  </button>
  );


  const AboutSection = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className={`space-y-8 transform ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} transition-all duration-1000`}>
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-orbitron font-bold">
            <span className="text-gray-200 block transform hover:scale-105 transition-transform duration-300">
              Hi, I'm
            </span>
            <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-transparent bg-clip-text block transform hover:scale-105 transition-transform duration-300">
              X
            </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text transform hover:scale-105 transition-transform duration-300">
                Johanseen
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </span>
          </h1>
          <p className="text-xl text-gray-400 font-space-grotesk leading-relaxed">
            Full-stack developer crafting immersive digital experiences through elegant code and innovative design.
          </p>
        </div>
        
        <div className="flex gap-6">
          {[
            { icon: Github, href: "https://github.com", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
            { icon: Twitter, href: "https://twitter.com", label: "Twitter" }
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              className="group relative w-12 h-12 flex items-center justify-center rounded-xl bg-gray-800 hover:bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-300"
              aria-label={label}
            >
              <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transform group-hover:scale-110 transition-all duration-300" />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300" />
            </a>
          ))}
        </div>
      </div>

      <div className={`relative transform ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} transition-all duration-1000 delay-300`}>
        <div className="relative w-full aspect-square">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl transform rotate-6 blur-2xl opacity-30 animate-pulse" />
          <img
            src="/api/placeholder/500/500"
            alt="X Johanseen"
            className="relative rounded-2xl w-full h-full object-cover shadow-2xl"
          />
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-20" />
        </div>
      </div>
    </div>
  );

  const SkillsSection = () => (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-3xl font-bold">Technical Expertise</h2>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-1000 ease-out"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ContactSection = () => (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-3xl font-bold">Get in Touch</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
        />
        <textarea
          placeholder="Your Message"
          rows={4}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
        />
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
          Send Message
        </button>
      </form>
    </div>
  );

  const HireSection = () => (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-3xl font-bold">Work With Me</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg border border-gray-200 hover:border-indigo-600 transition-colors">
          <h3 className="text-xl font-bold mb-4">Consultation</h3>
          <p className="text-gray-600">Technical consultation and architecture planning</p>
          <ChevronRight className="mt-4 text-indigo-600" />
        </div>
        <div className="p-6 rounded-lg border border-gray-200 hover:border-indigo-600 transition-colors">
          <h3 className="text-xl font-bold mb-4">Development</h3>
          <p className="text-gray-600">Full-stack development and implementation</p>
          <ChevronRight className="mt-4 text-indigo-600" />
        </div>
      </div>
    </div>
  );

    return (
        <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto p-6">
            <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 bg-gray-800/80 backdrop-blur-xl p-3 rounded-2xl shadow-2xl border border-gray-700/50 z-40">
              <NavButton icon={User} label="About" section="about" />
              <NavButton icon={Code} label="Skills" section="skills" />
              <NavButton icon={Briefcase} label="Hire" section="hire" />
              <NavButton icon={Mail} label="Contact" section="contact" />
              <button className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white transition-all duration-300 shadow-lg shadow-purple-500/25">
                <Download className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="hidden md:inline font-space-grotesk">CV</span>
              </button>
            </nav>
    
            <main className="pt-20 pb-32">
            {activeSection === 'about' && <AboutSection />}
            {activeSection === 'skills' && <SkillsSection />}
            {activeSection === 'hire' && <HireSection />}
            {activeSection === 'contact' && <ContactSection />}
            </main>
          </div>
        </div>
      );
};

export default Portfolio;