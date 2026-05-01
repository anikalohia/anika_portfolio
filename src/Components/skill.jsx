import React from "react";
import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaJava } from "react-icons/fa";
import { SiTensorflow, SiPytorch, SiPostgresql, SiMongodb, SiFastapi } from "react-icons/si";
import { motion } from "framer-motion";

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
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Technical <span className="text-sky-400">Proficiency</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my toolkit and the technologies I use to bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 transition-all duration-500 ${skill.borderColor} hover:bg-white/[0.08] hover:-translate-y-2`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10`} />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold text-white leading-tight">
                  {skill.category}
                </h3>
              </div>

              <ul className="space-y-3">
                {skill.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-400 group-hover:text-gray-200 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-400/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
