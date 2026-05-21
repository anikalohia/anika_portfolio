import React, { useState } from "react";
import Hero from "./Components/hero";
import About from "./Components/about";
import Project from "./Components/project";
import Contact from "./Components/contact";
import Navbar from "./Components/navbar"; 
import "./style.css";
import Skill from "./Components/skill";
import BuildingNext from "./Components/BuildingNext";
import { motion as Motion, AnimatePresence } from "framer-motion";

export default function LandingPage() {
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleSecretClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount >= 5) {
      setIsEasterEggActive(true);
      setTimeout(() => {
        setIsEasterEggActive(false);
        setClickCount(0);
      }, 5000);
    }
  };

  return (
    <div className="relative">
      <Navbar />
      
      <Hero />
      <About onSecretClick={handleSecretClick} isEasterEggActive={isEasterEggActive} />
      <Skill />
      <Project />
      <BuildingNext />
      
      <Contact />

      {/* Easter Egg Response */}
      <AnimatePresence>
        {isEasterEggActive && (
          <Motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-sky-500 text-white px-8 py-4 rounded-full font-bold shadow-2xl pointer-events-none"
          >
            🚀 You found the secret! Keep building great things! ✨
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
