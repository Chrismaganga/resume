import { motion } from 'framer-motion';
import ResumeCard from './ResumeCard';

const Education = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className="w-full flex flex-col lgl:flex-row gap-10 lgl:gap-20"
    >
      {/* part one */}
      <div>
        <div className="py-6 lgl:py-12 font-titleFont flex flex-col gap-4">
          <p className="text-sm text-designColor tracking-[4px]">1994 - 2005</p>
          <h2 className="text-3xl md:text-4xl font-bold">Education Quality</h2>
        </div>
        <div className="mt-6 lgl:mt-14 w-full h-[1000px] border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
          <ResumeCard
            title=" Diploma in Programming"
            subTitle="IT Diploma (2015 - 2016)"
            result="3.90/4"
            des="The training provided by colleges in order to prepare people to work in various sectors of the economy or areas of culture."
          />
          <ResumeCard
            title="AS - Backend Developer"
            subTitle=" (2017 - 2019)"
            result="4.75/5"
            des="Experience and knowledge gained"
          />
          <ResumeCard
            title="Secondary School Education"
            subTitle="Magunje High School (1994 - 1998)"
            result="5.00/5"
            des="Secondary education or post-primary education covers two phases on the International Standard Classification of Education scale."
          />
        </div>
      </div>
      {/* part Two */}

      <div>
        <div className="py-6 lgl:py-12 font-titleFont flex flex-col gap-4">
          <p className="text-sm text-designColor tracking-[4px]">2017 - 2024</p>
          <h2 className="text-3xl md:text-4xl font-bold">Job Experience</h2>
        </div>
        <div className="mt-6 lgl:mt-14 w-full h-[1000px] border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
          <ResumeCard
            title="Software Engineer"
            subTitle="Wedding Insider - (2019 - Present)"
            result="SA"
            des="Web development is an important part of our culture."
          />
          <ResumeCard
            title="Web Developer"
            subTitle="PrimeShift Developer Team - (2017 - 2019)"
            result="SA"
            des="A popular destination with a growing number of highly qualified homegrown graduates, it's true that securing a role in SA isn't easy."
          />
          <ResumeCard
            title="Front-end Developer"
            subTitle="Freelancing - (2020 - present)"
            result="SA"
            des="SA economy has grown strongly over recent years, having transformed itself from a producer and innovation-based economy."
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Education