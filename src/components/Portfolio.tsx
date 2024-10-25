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
    Twitter,
    ExternalLink,
    Bot
  } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState<string>('about');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
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
    { 
      name: 'React', 
      level: 90, 
      color: 'from-cyan-500 to-blue-500',
      icon: <Bot className="w-6 h-6" />,
      description: 'Advanced component architecture & state management'
    },
    { 
      name: 'TypeScript', 
      level: 85, 
      color: 'from-blue-500 to-indigo-500',
      icon: <Code className="w-6 h-6" />,
      description: 'Type-safe development & advanced patterns'
    },
    { 
      name: 'Node.js', 
      level: 80, 
      color: 'from-green-500 to-emerald-500',
      icon: <Bot className="w-6 h-6" />,
      description: 'Server-side applications & API development'
    },
    { 
      name: 'Python', 
      level: 75, 
      color: 'from-yellow-500 to-orange-500',
      icon: <Code className="w-6 h-6" />,
      description: 'Data processing & automation'
    },
    { 
      name: 'AWS', 
      level: 70, 
      color: 'from-orange-500 to-red-500',
      icon: <Bot className="w-6 h-6" />,
      description: 'Cloud infrastructure & serverless architecture'
    }
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
    <div className={`space-y-12 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} transition-all duration-1000`}>
      <h2 className="text-4xl font-orbitron font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-transparent bg-clip-text">
        Technical Arsenal
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className="relative group"
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
            style={{
              animationDelay: `${index * 150}ms`
            }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-300" />
            <div className="relative p-6 bg-gray-800 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02]">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-600/20">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-space-grotesk font-bold text-white">
                  {skill.name}
                </h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{skill.description}</span>
                  <span className="font-mono">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                    style={{ 
                      width: hoveredSkill === skill.name ? `${skill.level}%` : '0%',
                      transition: 'width 1s ease-out'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const HireSection = () => (
    <div className={`space-y-12 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} transition-all duration-1000`}>
      <h2 className="text-4xl font-orbitron font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-transparent bg-clip-text">
        Collaboration Protocols
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            title: "Strategic Consulting",
            description: "Architecture planning & technical roadmapping",
            features: ["System Design", "Performance Optimization", "Security Audit"],
            icon: <Bot className="w-8 h-8" />,
            color: "from-cyan-500 to-blue-500"
          },
          {
            title: "Development",
            description: "Full-stack implementation & deployment",
            features: ["Frontend Development", "Backend Systems", "DevOps"],
            icon: <Code className="w-8 h-8" />,
            color: "from-purple-500 to-pink-500"
          }
        ].map((service, index) => (
          <div
            key={service.title}
            className="group relative"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-300" />
            <div className="relative p-8 bg-gray-800 rounded-xl hover:transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${service.color} bg-opacity-20`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-space-grotesk font-bold text-white">
                  {service.title}
                </h3>
              </div>
              
              <p className="text-gray-400 mb-6">
                {service.description}
              </p>
              
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300">
                    <ChevronRight className="w-4 h-4 text-cyan-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="mt-8 w-full py-3 px-6 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02]">
                <span className="flex items-center justify-center gap-2">
                  Initiate Collaboration
                  <ExternalLink className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ContactSection = () => (
    <div className={`space-y-12 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} transition-all duration-1000`}>
      <h2 className="text-4xl font-orbitron font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-transparent bg-clip-text">
        Initialize Connection
      </h2>
      
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur opacity-30"></div>
        <form className="relative space-y-6 p-8 bg-gray-800 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-gray-300 font-space-grotesk">Identification</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 bg-gray-900 rounded-lg border border-gray-700 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all duration-300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-300 font-space-grotesk">Communication Channel</label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 bg-gray-900 rounded-lg border border-gray-700 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all duration-300"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-gray-300 font-space-grotesk">Transmission Content</label>
            <textarea
              placeholder="Your Message"
              rows={6}
              className="w-full p-4 bg-gray-900 rounded-lg border border-gray-700 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all duration-300"
            />
          </div>
          
          <button className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] font-space-grotesk">
            <span className="flex items-center justify-center gap-2">
              Transmit Message
              <Mail className="w-5 h-5" />
            </span>
          </button>
        </form>
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