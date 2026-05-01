import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture, Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

function RoundedPlane({ texture, rotation, project, onSelect, isSelected }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const shape = new THREE.Shape();
  const w = 2, h = 2.8, r = 0.2;
  shape.moveTo(-w / 2 + r, -h / 2);
  shape.lineTo(w / 2 - r, -h / 2);
  shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  shape.lineTo(w / 2, h / 2 - r);
  shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  shape.lineTo(-w / 2 + r, h / 2);
  shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  shape.lineTo(-w / 2, -h / 2 + r);
  shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);

  const geometry = new THREE.ShapeGeometry(shape);

  return (
    <group
      rotation={[0, rotation, 0]}
      position={[Math.sin(rotation) * 4, 0, Math.cos(rotation) * 4]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(project);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh ref={meshRef} scale={hovered || isSelected ? 1.05 : 1}>
        <primitive object={geometry} />
        <meshStandardMaterial 
          map={texture} 
          side={THREE.DoubleSide}
          emissive={isSelected ? new THREE.Color("#38bdf8") : new THREE.Color("black")}
          emissiveIntensity={isSelected ? 0.2 : 0}
        />
      </mesh>
      
      {(hovered || isSelected) && (
        <Html position={[0, 1.8, 0]} center distanceFactor={10}>
          <div className="bg-sky-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-xl">
            {project.title}
          </div>
        </Html>
      )}
    </group>
  );
}

function ProjectCylinder({ projects, onSelect, selectedProject }) {
  const groupRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  
  const textures = useTexture(projects.map((proj) => proj.img));

  useFrame((state, delta) => {
    if (!isHovered && !selectedProject) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {projects.map((proj, i) => {
        const angle = (i / projects.length) * Math.PI * 2;
        return (
          <RoundedPlane
            key={i}
            texture={textures[i]}
            rotation={angle}
            project={proj}   
            onSelect={onSelect}
            isSelected={selectedProject?.title === proj.title}
          />
        );
      })}
    </group>
  );
}

export default function Project() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    { 
      img: "/pg1.jpg", 
      url: "https://github.com/anikalohia/Blog-App-.git", 
      title: "Blog Application", 
      tags: ["React", "Express", "Node.js"],
      description: "A full-stack blog application with rich text editing, user authentication, and responsive design." 
    },
    { 
      img: "/pg2.jpg", 
      url: "https://yourproject2.com", 
      title: "AI Vision", 
      tags: ["Python", "TensorFlow", "FastAPI"],
      description: "Real-time object detection and classification system leveraging deep learning models." 
    },
    { 
      img: "/pg3.jpg", 
      url: "https://yourproject3.com", 
      title: "Data Pulse", 
      tags: ["Next.js", "D3.js", "PostgreSQL"],
      description: "Interactive data visualization dashboard for analyzing complex market trends and patterns." 
    },
    { 
      img: "/pg4.jpg", 
      url: "https://yourproject4.com", 
      title: "Sky Connect", 
      tags: ["React Native", "Firebase", "WebRTC"],
      description: "Cross-platform communication app focusing on privacy and real-time collaboration." 
    },
  ];

  return (
    <section id="projects" className="min-h-screen py-24 flex flex-col items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Featured <span className="text-sky-400">Works</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base">Click and drag to explore the 3D gallery. Tap a card to see details.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <div className="w-full lg:w-3/5 h-[300px] md:h-[600px] relative cursor-grab active:cursor-grabbing">
            <Canvas
              camera={{ position: [0, 0, 10], fov: 40 }}
              dpr={[1, 2]}
            >
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <ProjectCylinder 
                  projects={projects} 
                  onSelect={setSelectedProject} 
                  selectedProject={selectedProject}
                />  
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false} 
                  minPolarAngle={Math.PI/2.2} 
                  maxPolarAngle={Math.PI/1.8}
                />
                <EffectComposer>
                  <Bloom intensity={0.5} luminanceThreshold={0.5} />
                </EffectComposer>
              </Suspense>
            </Canvas>
          </div>

          <div className="w-full lg:w-2/5 min-h-[250px] md:min-h-[300px] flex items-center">
            <AnimatePresence mode="wait">
              {selectedProject ? (
                <motion.div
                  key={selectedProject.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl md:rounded-[32px] p-6 md:p-10 shadow-2xl w-full"
                >
                  <div className="flex gap-2 mb-3 md:mb-4">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-2 md:px-3 py-1 bg-sky-400/10 text-sky-400 rounded-full text-[10px] md:text-xs font-mono uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">{selectedProject.title}</h3>
                  <p className="text-gray-400 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                    {selectedProject.description}
                  </p>
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    <a 
                      href={selectedProject.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary text-sm md:text-base flex items-center gap-2 py-2.5 px-5"
                    >
                      View Project
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                    <button 
                      onClick={() => setSelectedProject(null)}
                      className="btn-secondary text-sm md:text-base py-2.5 px-5"
                    >
                      Back
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center lg:text-left px-4 w-full"
                >
                  <div className="mb-4 md:mb-6 inline-flex p-3 md:p-4 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-8 md:h-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4 text-white">Select a Project</h3>
                  <p className="text-gray-400 text-sm md:text-lg">
                    Interact with the 3D gallery to learn more.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
