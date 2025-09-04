import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const sectionIds = ["hero", "about", "projects", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const handleScroll = () => {
      const probeY = window.innerHeight * 0.35; // probe a point below the top
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

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [active]);

  const linkStyle = (id) => ({
    color: "white",
    textDecoration: "none",
    padding: "8px 14px",
    borderRadius: "9999px",
    background: active === id ? "rgba(56, 189, 248, 0.15)" : "transparent",
    border: active === id ? "1px solid rgba(56, 189, 248, 0.35)" : "1px solid transparent",
    transition: "all 200ms ease",
  });

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px 24px",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: "min(1500px, 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          background: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        }}
      >
        <h1 id="logo" style={{ fontSize: "1.25rem", fontWeight: 700 }}>🍁Anika</h1>

        <div style={{ display: "flex", gap: "10px" }}>
          <a href="#hero" style={linkStyle("hero")}>Home</a>
          <a href="#about" style={linkStyle("about")}>About</a>
          <a href="#projects" style={linkStyle("projects")}>Projects</a>
          <a href="#contact" style={linkStyle("contact")}>Contact</a>
        </div>
      </div>
    </nav>
  );
}
