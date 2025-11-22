import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cloud, Stars } from '@react-three/drei';
import * as THREE from 'three';

const DarkAgesScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Sparse, dark environment */}
      <color attach="background" args={['#000005']} />
      
      {/* Primordial gas clouds */}
      <Cloud opacity={0.3} speed={0.2} width={30} depth={5} segments={20} color="#201030" position={[0, 0, 0]} />
      <Cloud opacity={0.2} speed={0.2} width={20} depth={10} segments={20} color="#101020" position={[10, -5, -10]} />
      
      {/* Very faint background noise/stars starting to form */}
      <Stars radius={100} depth={50} count={500} factor={2} saturation={0} fade speed={1} />
      
      <ambientLight intensity={0.1} />
    </group>
  );
};

export default DarkAgesScene;
