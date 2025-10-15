import React from "react";
import Ballpit from "../Ballpit/Ballpit";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      style={{
        
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        minHeight: "500px",
        maxHeight: "1000px",
        width: "calc(100% - 6rem)",
        borderRadius: "75px",
        margin: " 3rem auto",
        padding: "0px",
       
        
      }
    }
    className="bg-gradient-to-t from-[#090e1a] to-[#0f213f]"
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
      <motion.div
        style={{
          position: "relative",
          zIndex: 1,
          width: "60%",
          maxWidth: "700px",
          textAlign: "center",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          padding: "2.5rem",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
        }}
        whileHover={{ scale: 1.02, boxShadow: "0 12px 40px rgba(0,0,0,0.5)" }}
        transition={{ duration: 0.3 }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            marginBottom: "1rem",
            color: "#F9FAFB",
          }}
        >
          About Me
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.6",
            color: "#E2E8F0",
          }}
        >
          Hey there 👋 I’m a developer who loves building cool things with code and an aspiring AI engineer exploring the future of intelligent systems.

          I enjoy crafting apps that are both useful and delightful, solving tough coding challenges, and experimenting with how AI can make tech feel more human. For me, code isn’t just about logic—it’s about creating experiences that matter.
        </motion.p>
      </motion.div>

    </section>
  );
}

