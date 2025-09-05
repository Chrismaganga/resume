import { Cursor, useTypewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import Media from './Media';

const LeftBanner = () => {
  const [text] = useTypewriter({
    words: [
      "Full Stack Developer .", 
      "React & Next.js Expert .", 
      "Python & Django Specialist .", 
      "Node.js & Express .", 
      "Vue.js & Angular .", 
      "Cloud & DevOps Engineer .", 
      "AI/ML Enthusiast .", 
      "Mobile App Developer ."
    ],
    loop: true,
    typeSpeed: 30,
    deleteSpeed: 15,
    delaySpeed: 2000,
  });

  return (
    <div className="w-full lgl:w-1/2 flex flex-col gap-20 relative z-10">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-8"
      >
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full w-fit"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-cyan-400">Available for work</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-6xl lg:text-7xl font-bold text-white leading-tight"
        >
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-green-400 bg-clip-text text-transparent">
            Chris
          </span>
        </motion.h1>

        {/* Typewriter Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-3xl lg:text-4xl font-bold text-gray-300"
        >
          a{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {text}
          </span>
          <Cursor
            cursorBlinking="true"
            cursorStyle="|"
            cursorColor="#00d4ff"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg text-gray-400 leading-relaxed max-w-lg"
        >
          I craft exceptional digital experiences through innovative web development, 
          combining cutting-edge technologies with creative problem-solving to build 
          scalable, user-centric applications that make a real impact.
        </motion.p>

        {/* Tech Stack Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap gap-3"
        >
          {['React', 'Python', 'Node.js', 'Vue.js', 'Angular', 'TypeScript'].map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="px-4 py-2 bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/50 rounded-full text-sm font-medium text-gray-300 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Media Icons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <Media />
      </motion.div>
    </div>
  );
};

export default LeftBanner;
