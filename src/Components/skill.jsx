import React from "react";
import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaJava } from "react-icons/fa";
import { SiTensorflow, SiPytorch, SiPostgresql, SiMongodb, SiFastapi } from "react-icons/si";
import { motion as Motion } from "framer-motion";

const skills = [
  {
    category: "Frontend",
    icon: <FaReact className="w-8 h-8 text-cyan-400" />,
    items: ["React", "JavaScript", "TailwindCSS", "Next.js"],
    color: "from-cyan-500/20 to-blue-500/20",
    borderColor: "group-hover:border-cyan-400/50"
  },
  {
    category: "Backend",
    icon: <FaNodeJs className="w-8 h-8 text-green-400" />,
    items: ["Node.js", "Express", "PostgreSQL", "FastAPI", "MongoDB"],
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "group-hover:border-green-400/50"
  },
  {
    category: "AI & Machine Learning",
    icon: <SiTensorflow className="w-8 h-8 text-orange-400" />,
    items: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas"],
    color: "from-orange-500/20 to-red-500/20",
    borderColor: "group-hover:border-orange-400/50"
  },
  {
    category: "Languages",
    icon: <FaPython className="w-8 h-8 text-yellow-400" />,
    items: ["Python", "C++", "Java", "SQL"],
    color: "from-yellow-500/20 to-orange-500/20",
    borderColor: "group-hover:border-yellow-400/50"
  },
  {
    category: "Tools & DevOps",
    icon: <FaGitAlt className="w-8 h-8 text-rose-400" />,
    items: ["Git", "Docker", "Postman", "Linux"],
    color: "from-rose-500/20 to-pink-500/20",
    borderColor: "group-hover:border-rose-400/50"
  }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden">
      {/* Background Decorative */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 relative">
          <Motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 hand-underline active"
          >
            Toolkit & <span className="text-sky-400">Problems I solved</span>
          </Motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base px-4">
            A developer's toolkit is only as good as the problems it can solve. Here's how I leverage these technologies.
          </p>

          {/* Chaotic but Smart: Floating Thought for Skills - Static version for cleaner look */}
          <Motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            className="absolute -top-16 left-0 md:left-20 bg-sky-500/10 backdrop-blur-md border border-sky-400/20 text-sky-400/80 p-3 rounded-2xl rotate-6 cursor-grab active:cursor-grabbing hidden lg:block"
          >
            <p className="font-mono text-[10px] leading-tight flex items-center gap-2">
              <span>🚀</span> <b>Optimization:</b> I once reduced AI inference time by 40%.
            </p>
          </Motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 mb-20">
          {skills.map((skill, index) => (
            <Motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-6 transition-all duration-500 ${skill.borderColor} hover:bg-white/[0.08] hover:-translate-y-2`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl md:rounded-3xl -z-10`} />
              
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 shrink-0">
                  {React.cloneElement(skill.icon, { className: "w-6 h-6 md:w-8 md:h-8 " + skill.icon.props.className.split(' ').filter(c => !c.startsWith('w-') && !c.startsWith('h-')).join(' ') })}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white leading-tight">
                  {skill.category}
                </h3>
              </div>

              <ul className="space-y-2 md:space-y-3">
                {skill.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm md:text-base text-gray-400 group-hover:text-gray-200 transition-colors">
                    <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-sky-400/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </Motion.div>
          ))}
        </div>

        {/* Problems Solved: Index Card UI */}
        <div className="mt-20">
          <div className="flex flex-col items-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 italic font-serif underline decoration-sky-400/30">
              Problems I solved
            </h3>
            <p className="text-gray-500 text-xs md:text-sm uppercase tracking-[0.2em]">The "How" behind the "What"</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                q: "How to handle 1M+ data points without crashing the browser?", 
                a: "Shifted from SVG to Canvas rendering in D3.js and implemented virtualization for data streams.",
                tag: "Optimization",
                color: "bg-[#fef9c3]", // Yellow
                rotate: "-2deg"
              },
              { 
                q: "How to ensure privacy in a real-time video app?", 
                a: "Engineered a custom signaling server with WebRTC and used transient Firebase tokens for session handshakes.",
                tag: "Security",
                color: "bg-[#dcfce7]", // Green
                rotate: "1deg"
              },
              { 
                q: "How to reduce AI inference time for edge devices?", 
                a: "Quantized TensorFlow models and used FastAPI's async pools to handle concurrent prediction requests.",
                tag: "Performance",
                color: "bg-[#C5F0FF]", // Blue
                rotate: "-1.5deg"
              }
            ].map((item, i) => (
              <Motion.div
                key={i}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                whileHover={{ scale: 1.05, zIndex: 50 }}
                style={{ rotate: item.rotate }}
                className={`${item.color} p-6 rounded-sm shadow-xl relative overflow-hidden group/card cursor-grab active:cursor-grabbing border-b-8 border-black/10`}
              >
                {/* Index Card Lines */}
                <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px)', backgroundSize: '100% 1.5rem' }} />
                
                <div className="absolute top-2 right-4 text-[8px] font-bold text-black/40 uppercase tracking-widest group-hover/card:text-black transition-colors">{item.tag}</div>
                <p className="text-gray-900 font-bold mb-3 text-sm md:text-base leading-tight relative z-10 font-serif">
                  <span className="text-sky-600 mr-1 italic">Q:</span> {item.q}
                </p>
                <p className="text-gray-800 text-xs md:text-sm font-medium leading-relaxed relative z-10">
                  <span className="text-emerald-700 font-bold mr-1">A:</span> {item.a}
                </p>
                
                {/* Chaotic but Smart: Small hand-drawn checkmark */}
                <div className="absolute bottom-2 right-2 text-black/10 group-hover/card:text-black/30 transition-colors transform -rotate-12">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
