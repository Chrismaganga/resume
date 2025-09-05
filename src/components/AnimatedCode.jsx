import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedCode = ({ 
  codeSnippets = [], 
  className = "",
  showHeader = true,
  autoPlay = true,
  interval = 4000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const defaultSnippets = [
    {
      language: "React",
      code: `import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Hello World!</h1>
    </motion.div>
  );
};`,
      level: 100
    },
    {
      language: "JavaScript",
      code: `// Modern JavaScript ES6+ Features
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const userData = await response.json();
    
    return {
      ...userData,
      fullName: \`\${userData.firstName} \${userData.lastName}\`,
      isActive: userData.status === 'active'
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user data');
  }
};`,
      level: 95
    },
    {
      language: "Python",
      code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Resume API", version="1.0.0")

class ResumeData(BaseModel):
    name: str
    email: str
    skills: List[str]
    experience: Optional[int] = 0

@app.get("/")
async def root():
    return {"message": "Welcome to Resume API"}

@app.post("/resume/")
async def create_resume(resume: ResumeData):
    processed_data = {
        "id": generate_id(),
        "created_at": datetime.now(),
        **resume.dict()
    }
    return processed_data`,
      level: 85
    },
    {
      language: "Node.js",
      code: `const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
      level: 90
    }
  ];

  const snippets = codeSnippets.length > 0 ? codeSnippets : defaultSnippets;

  useEffect(() => {
    if (autoPlay) {
      const intervalId = setInterval(() => {
        setIsTyping(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % snippets.length);
          setIsTyping(false);
        }, 500);
      }, interval);
      return () => clearInterval(intervalId);
    }
  }, [autoPlay, interval, snippets.length]);

  const highlightCode = (code) => {
    return code
      .replace(/(import|from|const|let|var|function|class|if|else|for|while|return|async|await|try|catch|finally|export|default)/g, '<span class="code-keyword">$1</span>')
      .replace(/(['"`].*?['"`])/g, '<span class="code-string">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="code-comment">$1</span>')
      .replace(/(\w+)(?=\s*\()/g, '<span class="code-function">$1</span>')
      .replace(/(\$\{.*?\})/g, '<span class="code-variable">$1</span>')
      .replace(/(\b\d+\b)/g, '<span class="text-yellow-400">$1</span>');
  };

  return (
    <motion.div 
      className={`code-highlight glow-hover ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {showHeader && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">{snippets[currentIndex].language}</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400">Live</span>
            </div>
          </div>
        </div>
      )}
      
      <motion.div 
        key={currentIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`code-line ${isTyping ? 'typewriter' : ''}`}
      >
        <div 
          dangerouslySetInnerHTML={{ 
            __html: highlightCode(snippets[currentIndex].code) 
          }}
        />
      </motion.div>
      
      {/* Progress indicator */}
      <div className="flex gap-1 mt-4">
        {snippets.map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded ${
              index === currentIndex 
                ? 'bg-gradient-to-r from-blue-500 to-green-500' 
                : 'bg-gray-700'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default AnimatedCode;
