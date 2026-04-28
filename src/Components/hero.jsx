import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./mush";
import { motion as Motion } from "framer-motion";

import { Typewriter } from 'react-simple-typewriter'


export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-section"
    >
      <div
        className="hero-content"
      >
        <Motion.h1
          id="name"
          style={{ fontSize: "7rem", margin: "0" }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          Hi, I'm <span style={{ color: "#38bdf8" }}>Anika</span>
        </Motion.h1>
        <h2
          id="head"
          className="hero-subtitle"
        >
          Software Developer | AI Enthusiast
        </h2>
        <p
          id="tag"
          className="hero-tag"
        >
          <Typewriter
            words={[
              "Welcome to my website!",
              "Turning Ideas into Interactive Solutions",
              "Enjoy your stay ✨",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={1900}
          />
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="btn-primary">
            View Projects
          </a>
          <a href="#contact" className="btn-secondary">
            Contact Me
          </a>
        </div>
      </div>

      <div
        className="hero-model"
      >
        <Canvas
          camera={{ position: [0, 1.5, 5], fov: 55 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, powerPreference: "low-power" }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <Model />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>
    </section>
  );
}
