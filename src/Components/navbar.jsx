import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sectionIds = ["hero", "about", "skills", "projects", "contact"];
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      const probeY = window.innerHeight * 0.3;
      let current = active;
      for (const el of sections) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          current = el.id;
          break;
        }
      }
      if (current !== active) setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [active]);

  const navLinks = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex justify-center items-center py-4 px-4 z-[1000] transition-all duration-300 ${
        scrolled ? "py-3" : "py-4 md:py-6"
      }`}
    >
      <div
        className={`flex items-center justify-between px-5 py-2.5 rounded-2xl border transition-all duration-300 ${
          scrolled 
          ? "bg-[#030712]/80 backdrop-blur-xl border-white/10 shadow-2xl w-full max-w-4xl" 
          : "bg-transparent border-transparent w-full max-w-6xl"
        }`}
      >
        <motion.h1 
          id="logo" 
          className="text-xl md:text-2xl font-bold tracking-tighter"
          whileHover={{ scale: 1.05 }}
        >
          Anika<span className="text-sky-400">.</span>
        </motion.h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                active === link.id 
                ? "text-sky-400 bg-sky-400/10" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-4 right-4 bg-[#030712]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl md:hidden flex flex-col gap-4 z-[1001]"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className={`text-center py-4 rounded-2xl text-lg font-semibold transition-all ${
                  active === link.id 
                  ? "bg-sky-400 text-gray-900" 
                  : "text-gray-300 hover:bg-white/5"
                }`}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
