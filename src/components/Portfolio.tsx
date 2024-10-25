import React, { useState } from 'react';
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
      className={`flex items-center gap-2 p-4 rounded-lg transition-all duration-300 ${
        activeSection === section
          ? 'bg-indigo-600 text-white'
          : 'hover:bg-indigo-100'
      }`}
      onClick={() => setActiveSection(section)}
      //onMouseEnter={() => setCursorSize(40)}
      //onMouseLeave={() => setCursorSize(20)}
    >
      <Icon className="w-5 h-5" />
      <span className="hidden md:inline">{label}</span>
    </button>
  );

  const AboutSection = () => (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        XJohanseen
      </h2>
      <p className="text-xl text-gray-700">
        Full-stack developer with a passion for creating immersive web experiences.
        Transforming ideas into elegant, efficient solutions.
      </p>
      <div className="flex gap-4">
        <a href="https://github.com" className="text-gray-600 hover:text-indigo-600 transition-colors">
          <Github className="w-6 h-6" />
        </a>
        <a href="https://linkedin.com" className="text-gray-600 hover:text-indigo-600 transition-colors">
          <Linkedin className="w-6 h-6" />
        </a>
        <a href="https://twitter.com" className="text-gray-600 hover:text-indigo-600 transition-colors">
          <Twitter className="w-6 h-6" />
        </a>
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
    <div className="min-h-screen bg-gray-50 cursor-none">
      {/**<CustomCursor /> */}
      <div className="max-w-6xl mx-auto p-6">
        <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 bg-white/80 backdrop-blur-lg p-2 rounded-full shadow-lg z-40">
          <NavButton icon={User} label="About" section="about" />
          <NavButton icon={Code} label="Skills" section="skills" />
          <NavButton icon={Briefcase} label="Hire" section="hire" />
          <NavButton icon={Mail} label="Contact" section="contact" />
          <button
            className="flex items-center gap-2 p-4 rounded-lg hover:bg-indigo-100 transition-all duration-300"
            //onMouseEnter={() => setCursorSize(40)}
            //onMouseLeave={() => setCursorSize(20)}
          >
            <Download className="w-5 h-5" />
            <span className="hidden md:inline">CV</span>
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