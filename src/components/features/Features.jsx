import { AiFillAppstore } from "react-icons/ai";
import { FaMobile, FaGlobe} from "react-icons/fa";
import { SiProgress, SiAntdesign } from "react-icons/si";

import Title from "../layouts/Title";
import Card from "./Card";

const Features = () => {

const FeaturesData = [
  {
    id: 1,
    title: "Business Stratagy",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque solutahic consequuntur eum repellendus ad",
  },
  {
    id: 2,
    icon: <AiFillAppstore />,
    title: "Web Development",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque solutahic consequuntur eum repellendus ad",
  },
  {
    id: 3,
    icon: <SiProgress />,
    title: "SEO Optimisation",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque solutahic consequuntur eum repellendus ad",
  },
  {
    id: 4,
    icon: <FaMobile />,
    title: "Web Development",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque solutahic consequuntur eum repellendus ad",
  },
  {
    id: 5,
    icon: <SiAntdesign />,
    title: "Tailwindcss",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque solutahic consequuntur eum repellendus ad",
  },
  {
    id: 6,
    icon: <FaGlobe />,
    title: "Hosting Websites",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque solutahic consequuntur eum repellendus ad",
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
    </section>
  );
};

export default Features;
