import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Preload } from "@react-three/drei";

function Model(props) {
    const group = useRef();
    const { scene } = useGLTF("/model/mushrooms.glb", true);

    // Rotate the model
    useFrame(() => {
        if (group.current) {
            group.current.rotation.y += 0.004;
        }
    });

    return <primitive ref={group} object={scene} {...props} position={[0.2, -0.7, 0]}/>;
}

export default function Mush() {
    return <>
        <Preload all />
        <Model/>
    </>;
}