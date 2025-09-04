import React, { useState } from "react";
import { FaReact, FaNodeJs, FaPython, FaGitAlt } from "react-icons/fa";
import { SiTensorflow } from "react-icons/si";
import { ChevronDown, ChevronUp } from "lucide-react";

const skills = [
  {
    name: "Frontend Development",
    icon: <FaReact className="w-12 h-12 text-cyan-400" />,
    tools: ["React", "JavaScript", "TailwindCSS", "Next.js"],
  },
  {
    name: "Backend Development",
    icon: <FaNodeJs className="w-12 h-12 text-green-400" />,
    tools: ["Node.js", "Express", "PostgreSQL", "FastAPI","MongoDB"],
  },
  {
    name: "Programming",
    icon: <FaPython className="w-12 h-12 text-yellow-400" />,
    tools: ["Python", "C++", "Java"],
  },
  {
    name: "AI & ML",
    icon: <SiTensorflow className="w-12 h-12 text-orange-400" />,
    tools: ["TensorFlow", "PyTorch", "Scikit-learn","Pandas"],
  },
  {
    name: "Other Tools",
    icon: <FaGitAlt className="w-12 h-12 text-red-400" />,
    tools: ["Git", "Jupyter Notebook", "NPM", "Postman"],
  },
];

export default function SkillsSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="skills" className="py-20 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-16 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">
          Skills
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="relative group bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700 
              hover:border-cyan-400 transition duration-500"
            >
              <div className="flex justify-center mb-6">{skill.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{skill.name}</h3>
              <button
                onClick={() => toggleDropdown(index)}
                className="flex items-center justify-center w-full text-cyan-400 hover:text-pink-400 transition"
              >
                {openIndex === index ? (
                  <>
                    <span>Hide Skills</span>
                    <ChevronUp className="ml-2 w-5 h-5" />
                  </>
                ) : (
                  <>
                    <span>Show Skills</span>
                    <ChevronDown className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>

              {openIndex === index && (
                <ul className="mt-4 space-y-2 text-gray-300 text-6">
                  {skill.tools.map((tool, i) => (
                    <li
                      key={i}
                      className="hover:text-pink-400 transition duration-300"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
