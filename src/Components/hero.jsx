import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial } from "@react-three/drei";
import Model from "./mush";
import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';

export default function Hero() {
  return (
    <section id="hero" className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden pt-12 md:pt-20">
      {/* Background Decorative Element */}
      <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-sky-500/10 rounded-full blur-[100px] md:blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-indigo-500/10 rounded-full blur-[100px] md:blur-[120px] -z-10 animate-pulse delay-1000" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-8 md:gap-12 items-center z-10">
        <div className="hero-content text-center lg:text-left mt-16 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sky-400 font-medium tracking-widest uppercase mb-3 text-xs md:text-sm">
              Available for new opportunities
            </h2>
            <motion.h1
              id="name"
              className="text-white font-bold leading-tight mb-4 md:mb-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Anika</span>
            </motion.h1>
            
            <h3 id="head" className="text-xl md:text-4xl text-gray-300 font-light mb-6 md:mb-8">
              Software Developer <span className="text-sky-400">|</span> AI Enthusiast
            </h3>

            <div id="tag" className="h-10 md:h-12 text-base md:text-xl text-gray-400 mb-8 md:mb-10">
              <Typewriter
                words={[
                  "Building digital experiences that matter.",
                  "Exploring the intersection of Code and AI.",
                  "Turning complex problems into elegant solutions.",
                ]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <motion.a 
                href="#projects" 
                className="btn-primary text-sm md:text-base flex items-center justify-center gap-2 py-3 px-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Projects
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </motion.a>
              <motion.a 
                href="#contact" 
                className="btn-secondary text-sm md:text-base flex items-center justify-center py-3 px-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        </div>

        <div className="hero-model relative h-[300px] md:h-[600px] w-full">
          <Canvas
            camera={{ position: [0, 1.5, 5], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true }}
          >
            <ambientLight intensity={0.7} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
              <Model />
            </Float>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI / 1.8}
            />
          </Canvas>
          
          {/* Floating badge for mobile/desktop */}
          <motion.div 
            className="absolute bottom-10 right-10 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl hidden md:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <p className="text-xs text-gray-400 uppercase tracking-tighter mb-1">Based in</p>
            <p className="text-sm font-semibold">India 🇮🇳</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
