import React from "react";
import { motion as Motion } from "framer-motion";

export default function BuildingNext() {
  const nextProjects = [
    {
      title: "AI-Powered Career Roadmap",
      description: "A tool that analyzes your current skills and creates a personalized learning path to reach your dream role.",
      status: "In Research",
      icon: "🗺️"
    },
    {
      title: "Sustainable Tech Directory",
      description: "A platform to find and contribute to eco-friendly software projects and hardware alternatives.",
      status: "Prototyping",
      icon: "🌱"
    }
  ];

  return (
    <section id="next" className="py-24 px-6 relative overflow-hidden bg-white/5 backdrop-blur-sm border-y border-white/5">
      {/* Background Decorative */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-500/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 relative">
          <Motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            What I’m <span className="text-sky-400">building next</span>
          </Motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            The future is full of problems waiting for a solution. Here’s what’s currently on my radar.
          </p>

          {/* Chaotic but Smart: Static Keywords for cleaner UI */}
          <div className="absolute top-0 right-0 hidden xl:flex flex-col gap-2 items-end opacity-10 pointer-events-none">
            <span className="text-xs font-mono">#EdgeAI</span>
            <span className="text-xs font-mono">#Web3Sustainability</span>
            <span className="text-xs font-mono">#PersonalizedLearning</span>
          </div>

          {/* Static Sticky Note for Building Next */}
          <Motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            className="absolute top-0 left-0 bg-emerald-100/80 text-gray-800 p-4 rounded-lg shadow-lg -rotate-3 cursor-grab active:cursor-grabbing z-20 hidden lg:block w-44 border-b-2 border-emerald-300"
          >
            <p className="font-mono text-[10px] leading-tight">
              🛠️ <b>Dev Log:</b> Currently obsessed with reducing latency in RAG pipelines.
            </p>
          </Motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {nextProjects.map((project, index) => (
            <Motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-[32px] p-8 relative group hover:bg-white/[0.08] transition-colors"
            >
              <div className="text-4xl mb-4">{project.icon}</div>
              <div className="absolute top-8 right-8 px-3 py-1 rounded-full bg-sky-400/10 text-sky-400 text-[10px] font-bold uppercase tracking-widest">
                {project.status}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-0">
                {project.description}
              </p>
              
              {/* Static Thoughts for cleaner look */}
              {index === 0 ? (
                <div className="absolute -bottom-4 -right-4 bg-indigo-500/80 text-white px-3 py-1.5 rounded-xl text-[10px] font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  💭 Linking LLMs to local vector DBs...
                </div>
              ) : (
                <div className="absolute -bottom-4 -right-4 bg-emerald-500/80 text-white px-3 py-1.5 rounded-xl text-[10px] font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  💭 Researching green cloud APIs...
                </div>
              )}
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
