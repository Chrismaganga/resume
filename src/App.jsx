import Banner from "./components/banner/Banner";
import Contact from "./components/contact/Contact";
import Features from "./components/features/Features";
import Footer from "./components/footer/Footer";
import FooterBottom from "./components/footer/FooterBottom";
import Navbar from "./components/navbar/Navbar";
import Projects from "./components/projects/Projects";
import Resume from "./components/resume/Resume";
import ResumeGenerator from "./components/resume-generator/ResumeGenerator";
import Testimonial from "./components/tesimonial/Testimonial";
import FrameworkShowcase from "./components/framework-showcase/FrameworkShowcase";

function App() {
  return (
    <div className="w-full h-auto bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"></div>
        <div className="absolute inset-0 bg-[url('./assets/images/tech-background.svg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <div className="max-w-screen-xl mx-auto px-4">
          <Banner />
          <div id="frameworks">
            <FrameworkShowcase />
          </div>
          <div id="features">
            <Features />
          </div>
          <div id="projects">
            <Projects />
          </div>
          <div id="resume">
            <Resume />
          </div>
          <ResumeGenerator />
          <div id="testimonial">
            <Testimonial />
          </div>
          <div id="contact">
            <Contact />
          </div>
          <Footer />
          <FooterBottom />
        </div>
      </div>
    </div>
  );
}

export default App;
