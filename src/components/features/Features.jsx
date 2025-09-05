import { AiFillAppstore } from "react-icons/ai";
import { FaMobile, FaGlobe, FaCode} from "react-icons/fa";
import { SiProgress, SiAntdesign } from "react-icons/si";

import Title from "../layouts/Title";
import Card from "./Card";
import AnimatedCode from "../AnimatedCode";

const Features = () => {

const FeaturesData = [
  {
    id: 1,
    icon: <FaCode />,
    title: "Full Stack Development",
    des: "Building end-to-end web applications using modern technologies like React, Node.js, Python, and cloud platforms.",
  },
  {
    id: 2,
    icon: <AiFillAppstore />,
    title: "Web Development",
    des: "Creating responsive, interactive websites and web applications with cutting-edge frameworks and libraries.",
  },
  {
    id: 3,
    icon: <SiProgress />,
    title: "SEO Optimization",
    des: "Implementing data-driven SEO strategies to improve online visibility and drive organic traffic growth.",
  },
  {
    id: 4,
    icon: <FaMobile />,
    title: "Mobile Development",
    des: "Developing cross-platform mobile applications that deliver exceptional user experiences across all devices.",
  },
  {
    id: 5,
    icon: <SiAntdesign />,
    title: "UI/UX Design",
    des: "Creating engaging user experiences through thoughtful design, intuitive interfaces, and user-centered principles.",
  },
  {
    id: 6,
    icon: <FaGlobe />,
    title: "Cloud & DevOps",
    des: "Deploying and managing scalable applications with modern cloud infrastructure and DevOps practices.",
  },
];

  return (
    <section
      id="features"
      className="w-full py-20 border-b-[1px] border-b-black"
    >
      
      <Title title="Features" des="What I Do" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-20">
        {FeaturesData.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
      
      {/* Animated Code Showcase */}
      <div className="mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Live Code Showcase
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Watch my code come to life with animated highlights showcasing different programming languages and frameworks.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <AnimatedCode 
            className="text-sm"
            interval={3500}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
