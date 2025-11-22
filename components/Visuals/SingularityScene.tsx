import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const SingularityScene: React.FC = () => {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      const time = state.clock.getElapsedTime();
      // Pulsating effect
      const scale = 1 + Math.sin(time * 10) * 0.1;
      sphereRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      <Sphere ref={sphereRef} args={[1, 32, 32]}>
        <meshStandardMaterial 
          emissive="white" 
          emissiveIntensity={10} 
          color="white" 
          toneMapped={false} 
        />
      </Sphere>
      <Sparkles count={50} scale={4} size={2} speed={0} opacity={0.5} color="cyan" />
      <pointLight distance={100} intensity={100} color="white" />
    </group>
  );
};

export default SingularityScene;
