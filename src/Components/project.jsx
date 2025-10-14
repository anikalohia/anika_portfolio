import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";



function RoundedPlane({ texture, rotation, project, onSelect }) {
  const meshRef = useRef();
  const [hovered, setHovered] = React.useState(false);


  const shape = new THREE.Shape();
  const w = 2, h = 2.5, r = 0.25;
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
      position={[Math.sin(rotation) * 3, 0, Math.cos(rotation) * 3]}
      onClick={() => onSelect(project)} 
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
   
    >
      <mesh ref={meshRef} scale={hovered ? 1.01 : 1}>
        <primitive object={geometry} />
        <meshStandardMaterial map={texture} side={THREE.DoubleSide}
       color={hovered ? new THREE.Color("#dddddd") : new THREE.Color("white")} />
      </mesh>
      
    </group>
  );
}

function ProjectCylinder({ projects, onSelect }) {
  const groupRef = useRef();
  const speed = useRef(0.3);
  const targetSpeed = useRef(0.3);

  useFrame((_, delta) => {
    speed.current += (targetSpeed.current - speed.current) * 0.05;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * speed.current;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => (targetSpeed.current = 0.1)}
      onPointerLeave={() => (targetSpeed.current = 0.3)}
    >
      {projects.map((proj, i) => {
        const tex = useTexture(proj.img);
        const angle = (i / projects.length) * Math.PI * 2;
        return (
          <RoundedPlane
            key={i}
            texture={tex}
            rotation={angle}
            project={proj}   
            onSelect={onSelect}
            
          />
        );
      })}
    </group>
  );
}

export default function Project() {
  const [selectedProject, setSelectedProject] = React.useState(null);

  const projects = [
    { img: "/pg1.jpg", url: "https://github.com/anikalohia/Blog-App-.git", title: "Project One- Blog Application", description: "Blog application built with Express.js and Blog API, featuring full CRUD functionality for creating, updating, and deleting posts." },
    { img: "/pg2.jpg", url: "https://yourproject2.com", title: "Project Two", description: "This is my second project. Built with Python and Flask." },
    { img: "/pg3.jpg", url: "https://yourproject3.com", title: "Project Three", description: "This is my third project. Built with Java and Spring Boot." },
    { img: "/pg4.jpg", url: "https://yourproject4.com", title: "Project Four", description: "This is my fourth project. Built with C# and .NET." },
  ];

  return (
    <section id="projects" className="project-section" style={{ minHeight: "100vh", color: "white", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="project-layout" style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", gap: "2rem" }}>
        
        {/* 3D Canvas */}
        <div style={{ width: "55%", height: "700px" }} className="project-canvas">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 40 }}
            dpr={[1, 1.5]}
            gl={{ antialias: false, powerPreference: "low-power" }}
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />
            <ProjectCylinder projects={projects} onSelect={setSelectedProject} />  
            <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI/2} maxPolarAngle={Math.PI/2}/>
            <EffectComposer>
              <Bloom intensity={0.45} kernelSize={2} luminanceThreshold={0.4} luminanceSaturation={0.8} />
            </EffectComposer>
          </Canvas>
        </div>

        {/* Right side info */}
        <div style={{ width: "40%", textAlign: "left" }} className="mx-7 project-info">
          {selectedProject ? (
            <>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }} >{selectedProject.title}</h2>
              <p style={{ fontSize: "1.2rem", color: "lightgray" }}>{selectedProject.description}</p>
              <a href={selectedProject.url} target="_blank" rel="noopener noreferrer" style={{ color: "#61dafb", fontWeight: "bold" }}>
                View Project →
              </a>
            </>
          ) : (
            <>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>My Projects</h2>
              <p style={{ fontSize: "1.2rem", color: "lightgray" }}>Explore my projects by clicking the rotating cards on the left. Each card will take you directly to the live project or repository.</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
