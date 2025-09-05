import LeftBanner from './LeftBanner';
import RightBanner from './RightBanner';

const Banner = () => {
  return (
    <section
      id="home"
      className="w-full pt-32 pb-20 flex flex-col gap-10 xl:gap-0 lgl:flex-row items-center border-b border-gray-700/50 font-titleFont relative"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-500/10 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-green-400/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-cyan-400/10 rounded-full blur-lg animate-pulse delay-3000"></div>
      </div>
      
      <LeftBanner />
      <RightBanner />
    </section>
  );
}

export default Banner
