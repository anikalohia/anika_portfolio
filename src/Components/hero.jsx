import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Model from "./mush";
import { motion } from "framer-motion";

import { Typewriter } from 'react-simple-typewriter'


export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        display: "flex",
        minHeight: "100vh",
        color: "white",
        flexDirection: "row",
      }}
      className="hero-section"
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "80px",
        }}
        className="hero-content"
      >
        <motion.h1
          id="name"
          style={{ fontSize: "7rem", margin: "0" }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          Hi, I'm <span style={{ color: "#38bdf8" }}>Anika</span>
        </motion.h1>
        <h2
          id="head"
          style={{ fontSize: "2rem", margin: "0px 0" }}
          className="hero-subtitle"
        >
          Software Developer | AI Enthusiast
        </h2>
        <p
          id="tag"
          style={{ maxWidth: "500px", opacity: 0.8, fontSize: "1.3rem" }}
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
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: 0,
        }}
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
