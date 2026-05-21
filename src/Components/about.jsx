import React from "react";
import Ballpit from "../Ballpit/Ballpit";
import { motion as Motion } from "framer-motion";

export default function About({ onSecretClick, isEasterEggActive }) {
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
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] md:rounded-[40px] p-6 md:p-16 shadow-2xl">
            <div className="flex-1 text-center md:text-left">
              <Motion.h2 
                whileInView={{ transition: { staggerChildren: 0.1 } }}
                className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight hand-underline active"
              >
                The human behind the code
              </Motion.h2>
              
              <div className="space-y-4 text-gray-300 text-base md:text-lg leading-relaxed relative">
                <p>
                  Hi, I’m <span onClick={onSecretClick} className={`font-semibold cursor-pointer transition-colors duration-500 ${isEasterEggActive ? 'text-sky-400 easter-egg-active' : 'text-sky-400'}`}>Anika</span> — a Full-Stack Developer and AI enthusiast passionate about building intelligent, user-focused digital products.
                </p>
                <p>
                  I build scalable web applications and explore how AI can create more natural, human-centered experiences. From real-time collaborative platforms to AI-powered learning tools, I enjoy solving meaningful problems through clean engineering and thoughtful design.
                </p>
                <p>
                  Currently focused on full-stack development, machine learning, and building products that bridge technology with real-world impact.
                </p>
                <p>
                  Beyond development, I enjoy creating content and exploring storytelling through digital media and design.
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

              {/* Personality Section */}
              <div className="mt-12 pt-8 border-t border-white/5">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-6">
                  Off-screen, you’ll probably find me…
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { text: "Experimenting with ideas", icon: "💡" },
                    { text: "Creating chaotic content", icon: "🎬" },
                    { text: "Overthinking design", icon: "🎨" }
                  ].map((item, i) => (
                    <Motion.div
                      key={i}
                      whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.08)" }}
                      className="p-4 rounded-2xl bg-white/5 border border-white/5 transition-colors cursor-default"
                    >
                      <span className="text-2xl mb-2 block">{item.icon}</span>
                      <p className="text-gray-400 text-sm font-medium">{item.text}</p>
                    </Motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
}

