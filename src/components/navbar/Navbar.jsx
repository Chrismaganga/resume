import { FaFacebookF, FaLinkedinIn, FaTwitter, FaGithub, FaCode, FaHome, FaUser, FaProjectDiagram, FaFileAlt, FaComments, FaEnvelope } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-scroll";
import { logo } from "../../assets/index";
import { navLinksdata } from '../../constants';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation icons mapping
  const navIcons = {
    home: FaHome,
    features: FaCode,
    projects: FaProjectDiagram,
    resume: FaFileAlt,
    testimonial: FaComments,
    contact: FaEnvelope
  };

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com", color: "hover:text-gray-300" },
    { icon: FaLinkedinIn, href: "https://linkedin.com", color: "hover:text-blue-400" },
    { icon: FaTwitter, href: "https://twitter.com", color: "hover:text-cyan-400" },
    { icon: FaFacebookF, href: "https://facebook.com", color: "hover:text-blue-500" }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 shadow-lg shadow-cyan-400/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <img 
                src={logo} 
                alt="Chris Portfolio" 
                className="w-12 h-12 rounded-full border-2 border-cyan-400/30 hover:border-cyan-400 transition-colors duration-300"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Chris
              </h1>
              <p className="text-xs text-gray-400">Full Stack Developer</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinksdata.map(({ _id, title, link }) => {
              const Icon = navIcons[link] || FaCode;
              const isActive = activeSection === link;
              
              return (
                <motion.div
                  key={_id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    activeClass="active"
                    to={link}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={500}
                    onSetActive={() => setActiveSection(link)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-400/30'
                        : 'text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{title}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Social Links - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, color }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`w-10 h-10 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg flex items-center justify-center text-gray-400 ${color} transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/10`}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMenu(!showMenu)}
            className="lg:hidden w-12 h-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg flex items-center justify-center text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300"
          >
            {showMenu ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMenu(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden"
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gray-900/95 backdrop-blur-md border-l border-gray-700/50 shadow-2xl lg:hidden"
            >
              <div className="flex flex-col h-full">
                
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <img 
                      src={logo} 
                      alt="Chris Portfolio" 
                      className="w-10 h-10 rounded-full border-2 border-cyan-400/30"
                    />
                    <div>
                      <h2 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Chris
                      </h2>
                      <p className="text-xs text-gray-400">Full Stack Developer</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowMenu(false)}
                    className="w-8 h-8 bg-gray-800/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    <FiX className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="flex-1 px-6 py-6">
                  <ul className="space-y-2">
                    {navLinksdata.map(({ _id, title, link }) => {
                      const Icon = navIcons[link] || FaCode;
                      const isActive = activeSection === link;
                      
                      return (
                        <motion.li
                          key={_id}
                          initial={{ x: 50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: _id * 0.1 }}
                        >
                          <Link
                            onClick={() => setShowMenu(false)}
                            activeClass="active"
                            to={link}
                            spy={true}
                            smooth={true}
                            offset={-80}
                            duration={500}
                            onSetActive={() => setActiveSection(link)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                              isActive
                                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-400/30'
                                : 'text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{title}</span>
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>

                {/* Mobile Social Links */}
                <div className="p-6 border-t border-gray-700/50">
                  <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                    <FaCode className="w-4 h-4 text-cyan-400" />
                    Connect With Me
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map(({ icon: Icon, href, color }, index) => (
                      <motion.a
                        key={index}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-3 px-4 py-3 bg-gray-800/50 rounded-lg text-gray-400 ${color} transition-all duration-300 hover:bg-cyan-400/10`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {Icon === FaGithub ? 'GitHub' : 
                           Icon === FaLinkedinIn ? 'LinkedIn' : 
                           Icon === FaTwitter ? 'Twitter' : 'Facebook'}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Mobile Status */}
                <div className="p-6 border-t border-gray-700/50">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Available for work</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
