import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Title from '../layouts/Title';

const FrameworkShowcase = () => {
  const [activeFramework, setActiveFramework] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const frameworks = [
    {
      id: 1,
      name: 'React',
      image: '/src/assets/images/frameworks/react.svg',
      description: 'A JavaScript library for building user interfaces with component-based architecture and virtual DOM.',
      features: ['Component-based', 'Virtual DOM', 'JSX Syntax', 'Hooks', 'Ecosystem'],
      color: 'from-cyan-400 to-blue-500',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-400/30'
    },
    {
      id: 2,
      name: 'JavaScript',
      image: '/src/assets/images/frameworks/javascript.svg',
      description: 'The programming language that powers the modern web with dynamic and interactive features.',
      features: ['ES6+ Features', 'Async/Await', 'Modules', 'Closures', 'Prototypes'],
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-400/30'
    },
    {
      id: 3,
      name: 'Python',
      image: '/src/assets/images/frameworks/python.svg',
      description: 'A versatile programming language known for its simplicity and powerful libraries for various applications.',
      features: ['Django/Flask', 'Data Science', 'AI/ML', 'Automation', 'Web Scraping'],
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-400/30'
    },
    {
      id: 4,
      name: 'Node.js',
      image: '/src/assets/images/frameworks/nodejs.svg',
      description: 'A JavaScript runtime built on Chrome\'s V8 engine for building scalable network applications.',
      features: ['Express.js', 'REST APIs', 'Real-time', 'Microservices', 'NPM Ecosystem'],
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-400/30'
    },
    {
      id: 5,
      name: 'Vue.js',
      image: '/src/assets/images/frameworks/vue.svg',
      description: 'A progressive JavaScript framework for building user interfaces with an approachable learning curve.',
      features: ['Reactive Data', 'Component System', 'Vuex', 'Vue Router', 'Composition API'],
      color: 'from-emerald-400 to-green-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-400/30'
    },
    {
      id: 6,
      name: 'Angular',
      image: '/src/assets/images/frameworks/angular.svg',
      description: 'A platform and framework for building single-page client applications using TypeScript.',
      features: ['TypeScript', 'Dependency Injection', 'RxJS', 'Angular CLI', 'Testing'],
      color: 'from-red-400 to-pink-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-400/30'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFramework((prev) => (prev + 1) % frameworks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [frameworks.length]);

  return (
    <section className="w-full py-20 border-b border-gray-700/50">
      <div className="flex justify-center items-center text-center mb-16">
        <Title title="TECH STACK" des="Frameworks & Technologies" />
      </div>

      {/* Framework Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {frameworks.map((framework, index) => (
          <motion.div
            key={framework.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative group cursor-pointer ${framework.bgColor} ${framework.borderColor} border rounded-2xl p-6 hover:scale-105 transition-all duration-300 ${
              activeFramework === index ? 'ring-2 ring-cyan-400/50' : ''
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setActiveFramework(index)}
          >
            {/* Glow effect */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${framework.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            
            {/* Framework Image */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 mb-4 relative">
                <img 
                  src={framework.image} 
                  alt={framework.name}
                  className="w-full h-full object-contain filter drop-shadow-lg"
                />
                {activeFramework === index && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20"
                  />
                )}
              </div>
              
              <h3 className={`text-2xl font-bold bg-gradient-to-r ${framework.color} bg-clip-text text-transparent mb-2`}>
                {framework.name}
              </h3>
              
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {framework.description}
              </p>
              
              {/* Features */}
              <div className="flex flex-wrap gap-2 justify-center">
                {framework.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 text-xs font-medium bg-gradient-to-r ${framework.color} bg-opacity-20 text-white rounded-full border ${framework.borderColor}`}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Active Framework Details */}
      <motion.div
        key={activeFramework}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className={`${frameworks[activeFramework].bgColor} ${frameworks[activeFramework].borderColor} border rounded-2xl p-8 relative overflow-hidden`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20"></div>
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
            {/* Framework Image */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 relative">
                <img 
                  src={frameworks[activeFramework].image} 
                  alt={frameworks[activeFramework].name}
                  className="w-full h-full object-contain filter drop-shadow-2xl"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-cyan-400/30 rounded-full"
                />
              </div>
            </div>
            
            {/* Framework Info */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className={`text-4xl font-bold bg-gradient-to-r ${frameworks[activeFramework].color} bg-clip-text text-transparent mb-4`}>
                {frameworks[activeFramework].name}
              </h2>
              
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {frameworks[activeFramework].description}
              </p>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-400">Expertise Level</span>
                  <span className="text-sm font-bold text-cyan-400">95%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "95%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-2 bg-gradient-to-r ${frameworks[activeFramework].color} rounded-full`}
                  />
                </div>
              </div>
              
              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 bg-gradient-to-r ${frameworks[activeFramework].color} text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300`}
              >
                View Projects
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Framework Indicators */}
      <div className="flex justify-center mt-8 space-x-2">
        {frameworks.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveFramework(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeFramework === index 
                ? 'bg-cyan-400 scale-125' 
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default FrameworkShowcase;
