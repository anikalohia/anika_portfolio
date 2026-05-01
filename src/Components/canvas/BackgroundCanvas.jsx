import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float } from '@react-three/drei'
import * as THREE from 'three'

function Particles({ count = 100 }) {
  const mesh = useRef()
  const light = useRef()

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      particle.mx += (state.mouse.x * 1000 - particle.mx) * 0.01
      particle.my += (state.mouse.y * 1000 - particle.my) * 0.01
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      dummy.scale.set(s, s, s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <>
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={1} />
      </instancedMesh>
    </>
  )
}

function Aurora() {
  const mesh = useRef()
  const blobs = useMemo(() => {
    return [
      { color: "#6366f1", position: [-20, 10, -10], scale: 15, speed: 0.2 },
      { color: "#a855f7", position: [20, -10, -15], scale: 20, speed: 0.15 },
      { color: "#38bdf8", position: [0, 20, -20], scale: 25, speed: 0.1 }
    ]
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    mesh.current.children.forEach((child, i) => {
      const blob = blobs[i]
      child.position.x = blob.position[0] + Math.sin(time * blob.speed) * 10
      child.position.y = blob.position[1] + Math.cos(time * blob.speed) * 5
    })
  })

  return (
    <group ref={mesh}>
      {blobs.map((blob, i) => (
        <mesh key={i} position={blob.position} scale={blob.scale}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color={blob.color} transparent opacity={0.15} />
        </mesh>
      ))}
    </group>
  )
}

export default function BackgroundCanvas() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 50], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[20, 20, 20]} intensity={1.5} color="#6366f1" />
        <pointLight position={[-20, -20, -20]} intensity={1} color="#a855f7" />
        <Stars radius={150} depth={100} count={3000} factor={4} saturation={0} fade speed={0.5} />
        <Aurora />
        <Particles count={80} />
      </Canvas>
    </div>
  )
}
