import React, { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture, Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { motion as Motion, AnimatePresence } from "framer-motion";

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
          <div className="flex flex-col items-center gap-2 pointer-events-none">
            <div className="bg-sky-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-xl">
              {project.title}
            </div>
            {hovered && !isSelected && (
              <Motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/80 backdrop-blur-md text-white/80 px-4 py-2 rounded-2xl text-[10px] text-center max-w-[150px] border border-white/10"
              >
                <span className="text-sky-400 font-bold block mb-1">Impact</span>
                {project.impact}
              </Motion.div>
            )}
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
  const [showStory, setShowStory] = useState(false);

  // Close modal logic
  const closeModal = () => {
    setShowStory(false);
    setSelectedProject(null);
  };

  // Scroll lock & Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };

    if (showStory) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [showStory]);

  const projects = [
    { 
      img: "/pg1.jpg", 
      url: "https://github.com/anikalohia/Draft_Fusion", 
      title: "DraftFusion", 
      tags: ["Nextjs", "Express", "Node.js","Zustand","Websockets"],
      impact: "Allows different users to collaborate and edit document in real time",
      description: "Draft Fusion is a high-performance, real-time collaborative document and code editor.",
      story: "While studying about websockets, an idea got stuck in my brain- A real time document editor.Draft Fusion is a collaborative editor with smooth text-editing,multi-user cursors & undo-redo history"
    },
    { 
      img: "/pg2.jpg", 
      url: "https://github.com/anikalohia/Gesture-control-system", 
      title: "Gesture control system", 
      tags: ["Python", "OpenCV", "MediaPipe"],
      impact: "Control your entire workspace with hand gestures—no touch required.",
      description: "A gesture-based interface for touchless computer interaction using computer vision.",
      story: "Gesture control system was born from a simple question: Can we interact with our digital world without touching it? By combining MediaPipe's skeletal tracking with custom mapping algorithms, I built a system that translates finger pinches into clicks and palm movements into smooth swipes. It's about making tech accessible and futuristic.",
      demo: true
    },
    { 
      img: "/pg3.jpg", 
      url: "https://github.com/anikalohia/Face_Mask_Detector", 
      title: "Face Mask Detector", 
      tags: ["Python", "Keras","Tensorflow","Flask"],
      impact: "Detects masked and unmasked faces",
      description: "A real-time mask detection system that alerts users when they are not wearing a mask in public spaces especially in Hospitals.",
      story: "I was always curious about the applications of deep learning in the real world, which led me to create this project. I trained a dataset from kaggle of masked and unmasked faces to achieve high accuracy."
    },
    { 
      img: "/pg4.jpg", 
      url: "https://github.com/anikalohia/CheckBox_Frontend", 
      title: "CheckBox", 
      tags: ["ReactJs", "JWT", "MongoDB"],
      impact: "Allows users to manage their task.",
      description: "Cross-platform communication app focusing on privacy and real-time collaboration.",
      story: "In a world of data breaches, Sky Connect prioritizes user privacy. I implemented a custom WebRTC signaling server and used Firebase for real-time state management, ensuring that data never stays on a server longer than necessary."
    },
  ];

  return (
    <section id="projects" className="min-h-screen py-24 flex flex-col items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 md:mb-12">
          <Motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Things I’ve <span className="text-sky-400">built</span>
          </Motion.h2>
          <p className="text-gray-400 text-sm md:text-base">Explore the stories behind my creations. Click a card to read about the technical hurdles and the results.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <div className="w-full lg:w-3/5 h-[300px] md:h-[600px] relative cursor-grab active:cursor-grabbing">
            {/* Chaotic but Smart: Tech Thought */}
            <Motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 bg-sky-500/10 backdrop-blur-md border border-sky-400/20 text-sky-400 p-2 rounded-xl text-[8px] font-mono z-20 hidden md:block"
            >
              // GL optimization: 60FPS maintained
            </Motion.div>

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
                <Motion.div
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
                  <p className="text-gray-400 text-base md:text-lg mb-4 md:mb-6 leading-relaxed">
                    {selectedProject.description}
                  </p>
                  
                  <div className="p-4 bg-sky-400/5 border border-sky-400/10 rounded-2xl mb-6 md:mb-8">
                    <p className="text-sky-400 text-sm font-semibold mb-1 uppercase tracking-wider">Impact</p>
                    <p className="text-white font-medium">{selectedProject.impact}</p>
                  </div>

                  <div className="flex flex-wrap gap-3 md:gap-4">
                    <button 
                      onClick={() => setShowStory(true)}
                      className="btn-primary text-sm md:text-base flex items-center gap-2 py-2.5 px-5"
                    >
                      Read Full Story
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    </button>
                    <a 
                      href={selectedProject.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-secondary text-sm md:text-base flex items-center gap-2 py-2.5 px-5"
                    >
                      GitHub
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                    <button 
                      onClick={() => setSelectedProject(null)}
                      className="text-gray-500 hover:text-white transition-colors text-sm font-medium px-2"
                    >
                      Close
                    </button>
                  </div>
                </Motion.div>
              ) : (
                <Motion.div
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
                </Motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Full Screen Story Modal */}
      <AnimatePresence>
        {showStory && selectedProject && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[5000] bg-black/95 backdrop-blur-2xl p-6 md:p-12 overflow-y-auto cursor-zoom-out"
          >
            {/* Explicit Close Button with Ultra-High Z-Index */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
              className="fixed top-6 right-6 md:top-10 md:right-10 text-white hover:text-sky-400 transition-all p-4 bg-white/10 hover:bg-white/20 rounded-full z-[6000] backdrop-blur-3xl border border-white/20 shadow-2xl group"
              aria-label="Close modal"
            >
              <svg className="group-hover:rotate-90 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div 
              className="container mx-auto max-w-4xl pt-12 cursor-default pb-24"
              onClick={(e) => e.stopPropagation()}
            >
              <Motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex gap-3 mb-6">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 bg-sky-400/10 text-sky-400 rounded-full text-xs font-mono uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-4xl md:text-7xl font-bold text-white mb-8">{selectedProject.title}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="md:col-span-2 space-y-8">
                    <div>
                      <h4 className="text-sky-400 font-bold uppercase tracking-widest text-sm mb-4">The Mission</h4>
                      <p className="text-xl md:text-2xl text-gray-300 leading-relaxed italic">
                        "{selectedProject.description}"
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sky-400 font-bold uppercase tracking-widest text-sm mb-4">The Story</h4>
                      <p className="text-lg text-gray-400 leading-relaxed mb-8">
                        {selectedProject.story}
                      </p>

                      {/* Interactive Demo for Draft Fusion */}
                      {selectedProject.demo && (
                        <div className="mt-12 p-1 bg-gradient-to-br from-sky-500/20 to-indigo-500/20 rounded-[32px] border border-white/10">
                          <div className="bg-[#030712] rounded-[30px] p-8 md:p-12 overflow-hidden relative">
                            <div className="flex justify-between items-center mb-8">
                              <h5 className="text-white font-bold text-xl flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                Interactive Simulation
                              </h5>
                              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
                                Gesture Mode: Active
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                              {/* Virtual Screen */}
                              <div className="aspect-video bg-white/5 border border-white/10 rounded-2xl p-4 relative group/screen overflow-hidden">
                                <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover/screen:opacity-100 transition-opacity" />
                                
                                {/* Simulated Content */}
                                <div className="space-y-3">
                                  <div className="h-4 w-3/4 bg-white/10 rounded-full" />
                                  <div className="h-4 w-1/2 bg-white/10 rounded-full" />
                                  <div className="h-24 w-full bg-white/5 rounded-xl border border-white/5 flex items-center justify-center relative">
                                    <Motion.div 
                                      animate={{ 
                                        x: [0, 20, -20, 0],
                                        y: [0, -10, 10, 0]
                                      }}
                                      transition={{ duration: 4, repeat: Infinity }}
                                      className="text-sky-400/50 text-[10px] font-mono"
                                    >
                                      [ Cursor Following Hand ]
                                    </Motion.div>
                                    
                                    {/* Simulated Hand Cursor */}
                                    <Motion.div 
                                      drag
                                      dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                                      className="absolute z-30 cursor-grab active:cursor-grabbing"
                                    >
                                      <span className="text-3xl filter drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">🖐️</span>
                                    </Motion.div>
                                  </div>
                                </div>

                                <div className="mt-4 flex gap-2">
                                  <div className="h-8 w-8 rounded-lg bg-sky-500/20 border border-sky-500/30" />
                                  <div className="h-8 w-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30" />
                                </div>
                              </div>

                              {/* Interactive Controls */}
                              <div className="space-y-6">
                                <p className="text-gray-400 text-sm leading-relaxed">
                                  Try dragging the hand above to see how the system tracks movement in real-time.
                                </p>
                                
                                <div className="space-y-4">
                                  <button 
                                    className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-2xl text-left hover:border-sky-400/50 transition-all group"
                                    onClick={() => {
                                      const msg = document.getElementById('demo-msg');
                                      msg.innerText = "Simulating Pinch: Click Registered ✓";
                                      setTimeout(() => msg.innerText = "Waiting for gesture...", 2000);
                                    }}
                                  >
                                    <span className="block text-sky-400 font-bold text-xs uppercase mb-1">Gesture 01</span>
                                    <span className="text-white font-medium">Pinch to Click</span>
                                  </button>

                                  <button 
                                    className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-2xl text-left hover:border-indigo-400/50 transition-all group"
                                    onClick={() => {
                                      const msg = document.getElementById('demo-msg');
                                      msg.innerText = "Simulating Swipe: Scrolling Workspace...";
                                      setTimeout(() => msg.innerText = "Waiting for gesture...", 2000);
                                    }}
                                  >
                                    <span className="block text-indigo-400 font-bold text-xs uppercase mb-1">Gesture 02</span>
                                    <span className="text-white font-medium">Swipe to Scroll</span>
                                  </button>
                                </div>

                                <div className="pt-4 border-t border-white/5">
                                  <p id="demo-msg" className="text-[10px] font-mono text-emerald-400 text-center uppercase tracking-widest">
                                    Waiting for gesture...
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                      <h4 className="text-sky-400 font-bold uppercase tracking-widest text-sm mb-4">Key Result</h4>
                      <p className="text-2xl font-bold text-white leading-tight">
                        {selectedProject.impact}
                      </p>
                    </div>
                    
                    <a 
                      href={selectedProject.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full btn-primary py-4 text-center text-lg block"
                    >
                      View Live Project
                    </a>

                    {/* Secondary Close Button at the bottom for accessibility */}
                    <button 
                      onClick={closeModal}
                      className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-all text-center"
                    >
                      Close Story & Go Back
                    </button>
                  </div>
                </div>
              </Motion.div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </section>

);
}
