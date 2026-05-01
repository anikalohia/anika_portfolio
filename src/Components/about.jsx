import React from "react";
import Ballpit from "../Ballpit/Ballpit";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="about-section relative min-h-screen py-24 overflow-hidden">
      {/* Ballpit background - contained and subtle */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Ballpit
          wallStrength={5}
          bounds="parent"
          count={80}
          gravity={0.001}
          friction={0.99}
          wallBounce={0.9}
          followCursor={true}
          colors={[
            "#38bdf8", 
            "#818cf8", 
            "#c084fc", 
            "#fb7185",
            "#22d3ee"
          ]}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] md:rounded-[40px] p-6 md:p-16 shadow-2xl">
            {/* Visual element or placeholder for profile/icon */}
            <div className="w-32 h-32 md:w-64 md:h-64 shrink-0 rounded-3xl overflow-hidden bg-gradient-to-br from-sky-400 to-indigo-600 p-1">
              <div className="w-full h-full bg-[#030712] rounded-[22px] flex items-center justify-center">
                <span className="text-4xl md:text-6xl">👋</span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight">
                About Me
              </h2>
              
              <div className="space-y-4 text-gray-300 text-base md:text-lg leading-relaxed">
                <p>
                  Hey there! I’m <span className="text-sky-400 font-semibold">Anika</span>, a developer who loves building cool things with code and an aspiring AI engineer exploring the future of intelligent systems.
                </p>
                <p>
                  I enjoy crafting apps that are both useful and delightful, solving tough coding challenges, and experimenting with how AI can make tech feel more human.
                </p>
                <p>
                  For me, code isn’t just about logic—it’s about <span className="text-white italic">creating experiences</span> that matter and making a positive impact through technology.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-sky-400 uppercase tracking-widest">
                  Innovator
                </div>
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-indigo-400 uppercase tracking-widest">
                  Problem Solver
                </div>
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-purple-400 uppercase tracking-widest">
                  Lifelong Learner
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

