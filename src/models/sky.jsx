'use client'
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

function Sky({ isRotating }) {
    const skyRef = useRef()
    const skyScene = useGLTF("/assets/3d/sky.glb")

    useFrame((_, delta) => {
        if (isRotating) {
            skyRef.current.rotation.y += 0.45 * delta
        }
    })

    return (
        <mesh ref={skyRef}>
            <primitive object={skyScene.scene} />
        </mesh>
    )
}

export default Sky