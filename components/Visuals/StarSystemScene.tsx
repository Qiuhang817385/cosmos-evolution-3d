import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Trail } from '@react-three/drei';
import * as THREE from 'three';

// Helper component for a planet
const Planet = ({ 
  radius, 
  distance, 
  speed, 
  color, 
  size,
  hasRing = false
}: { 
  radius: number, 
  distance: number, 
  speed: number, 
  color: string, 
  size: number,
  hasRing?: boolean
}) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
        const t = state.clock.getElapsedTime() * speed;
        ref.current.position.x = Math.cos(t) * distance;
        ref.current.position.z = Math.sin(t) * distance;
        ref.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={ref}>
        <Trail width={0.5} length={20} color={color} attenuation={(t) => t * t}>
            <Sphere args={[size, 32, 32]}>
                <meshStandardMaterial color={color} roughness={0.7} />
            </Sphere>
        </Trail>
        {hasRing && (
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[size * 1.4, size * 2.2, 64]} />
                <meshBasicMaterial color={color} opacity={0.4} transparent side={THREE.DoubleSide} />
            </mesh>
        )}
    </group>
  );
}

const StarSystemScene: React.FC = () => {
  return (
    <group>
      {/* The Sun */}
      <Sphere args={[4, 64, 64]}>
        <meshStandardMaterial 
            emissive="#ffaa00" 
            emissiveIntensity={3} 
            color="#ffaa00" 
            toneMapped={false} 
        />
      </Sphere>
      <pointLight intensity={200} distance={200} color="#ffaa00" />

      {/* Planets */}
      <Planet distance={8} speed={0.8} size={0.4} color="#888888" radius={0.4} /> {/* Mercury-like */}
      <Planet distance={12} speed={0.6} size={0.7} color="#d4af37" radius={0.7} /> {/* Venus-like */}
      <Planet distance={16} speed={0.4} size={0.8} color="#2233ff" radius={0.8} /> {/* Earth-like */}
      <Planet distance={22} speed={0.3} size={0.6} color="#ff4422" radius={0.6} /> {/* Mars-like */}
      
      <Planet distance={35} speed={0.15} size={2.5} color="#dcb386" radius={2.5} /> {/* Jupiter-like */}
      <Planet distance={50} speed={0.1} size={2.0} color="#e3d3a3" radius={2.0} hasRing /> {/* Saturn-like */}

      <ambientLight intensity={0.1} />
    </group>
  );
};

export default StarSystemScene;
