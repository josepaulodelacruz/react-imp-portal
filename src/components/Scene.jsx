import { shaderMaterial, useGLTF, useTexture, Center, OrbitControls, Sparkles } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import portalVertexShader from '../shaders/vertex'
import portalFragmentShader from '../shaders/fragment'
import * as THREE from 'three'

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('white'),
    uColorEnd: new THREE.Color('lightBlue'),
  },
  portalVertexShader,
  portalFragmentShader,
);

extend({ PortalMaterial })

export default function Scene () {
  const { nodes, } = useGLTF('portal.glb')
  const bakedTexture = useTexture('baked.jpg')
  const ref = useRef()
  bakedTexture.flipY = false

  useFrame((state,delta) => {
    ref.current.uTime += delta;
  })

  return (
    <>
      <color args={['#201919']} attach="background"/>
      <OrbitControls makeDefault/>
      <Center>
        <mesh geometry={nodes.baked.geometry} >
          <meshBasicMaterial map={bakedTexture}/>
        </mesh>

        <mesh
          position={nodes.poleLightA.position}
          geometry={nodes.poleLightA.geometry}>
          <meshBasicMaterial color="#ffffe5"/>
        </mesh>
        <mesh
          position={nodes.poleLightB.position}
          geometry={nodes.poleLightB.geometry}>
          <meshBasicMaterial color="#ffffe5"/>
        </mesh>

        <mesh
          geometry={nodes.Circle.geometry}
          position={nodes.Circle.position}
          rotation={nodes.Circle.rotation}
        >
          <portalMaterial ref={ref} />

        </mesh>

        <Sparkles
          size={6}
          scale={[4,2,4]}
          position-y={1}
          speed={0.2}
          count={40}
        />

      </Center>
    </>
  )

}