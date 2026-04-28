import React from "react";
import Ballpit from "../Ballpit/Ballpit";
import { motion as Motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="about-section bg-gradient-to-t from-[#090e1a] to-[#0f213f]"
    >
      {/* Ballpit background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          
        }}
      >
        
        <Ballpit
          wallStrength={5}
          bounds="parent"
          count={100}
          gravity={0.001}
          friction={1}
          wallBounce={0.95}
          followCursor={false}
          colors={[
            "#38BDF8", // sky-400
            "#0EA5E9", // sky-600
            "#A5B4FC", // indigo-300
            "#F9A8D4", // pink-300
            "#FDE68A", // yellow-300
          ]}
        />
      </div> 
      


      {/* Glassmorphism card */}
      <Motion.div
        className="about-card"
        whileHover={{ scale: 1.02, boxShadow: "0 12px 40px rgba(0,0,0,0.5)" }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="about-title">
          About Me
        </h2>

        <Motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="about-text"
        >
          Hey there 👋 I’m a developer who loves building cool things with code and an aspiring AI engineer exploring the future of intelligent systems.

          I enjoy crafting apps that are both useful and delightful, solving tough coding challenges, and experimenting with how AI can make tech feel more human. For me, code isn’t just about logic—it’s about creating experiences that matter.
        </Motion.p>
      </Motion.div>

    </section>
  );
}

