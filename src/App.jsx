
import Hero from "./Components/hero";
import About from "./Components/about";
import Project from "./Components/project";
import Contact from "./Components/contact";
import Navbar from "./Components/navbar"; 
import "./style.css";
import Skill from "./Components/skill";

export default function LandingPage() {
  return (
    <div>
      
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      <About />
      <Skill/>
      <Project />
      
      <Contact />
    </div>
  );
}
