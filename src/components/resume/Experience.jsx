
import {motion} from "framer-motion"
import ResumeCard from "./ResumeCard";

const Experience = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className="py-12 font-titleFont flex gap-20"
    >
      <div>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-designColor tracking-[4px]">2017 - 2024</p>
          <h2 className="text-4xl font-bold">Job Experience</h2>
        </div>
        <div className="mt-14 w-full h-[1000px] border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
          <ResumeCard
            title="Software Engineer"
            subTitle="WeddingInsider - (2020 - Present)"
            result="SA"
            des="Development is an important part of our culture."
          />
         <ResumeCard
            title="Frontend Software Engineer"
            subTitle="Freelancing - (2021 - Present)"
            result="SA"
            des="Development is an important part of our culture."
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-designColor tracking-[4px]">2017 - 2024</p>
          <h2 className="text-4xl font-bold"> Experience</h2>
        </div>
        <div className="mt-14 w-full h-[1000px] border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">

          <ResumeCard
            title="React, Redux, JavaScript, React Native"
            subTitle="Udacity (2024 - 2025)"
            result="SA"
            des="Software Engineering."
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Experience;
