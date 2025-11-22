import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GalaxyScene: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Galaxy parameters
  const parameters = {
    count: 8000,
    size: 0.15,
    radius: 30,
    branches: 4,
    spin: 1,
    randomness: 0.5,
    randomnessPower: 3,
    insideColor: '#ff6030',
    outsideColor: '#1b3984'
  };

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);
    
    const colorInside = new THREE.Color(parameters.insideColor);
    const colorOutside = new THREE.Color(parameters.outsideColor);

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;

      // Radius
      const radius = Math.random() * parameters.radius;
      
      // Spin angle
      const spinAngle = radius * parameters.spin;
      
      // Branch angle
      const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;

      const x = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
      const y = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
      const z = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + x;
      positions[i3 + 1] = y * 0.5; // Flatten the galaxy
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + z;

      // Color mixing
      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / parameters.radius);
      
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
            <bufferAttribute
                attach="attributes-position"
                count={parameters.count}
                array={positions}
                itemSize={3}
            />
            <bufferAttribute
                attach="attributes-color"
                count={parameters.count}
                array={colors}
                itemSize={3}
            />
        </bufferGeometry>
        <pointsMaterial
            size={parameters.size}
            sizeAttenuation={true}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            vertexColors={true}
        />
      </points>
      {/* Core Glow */}
      <pointLight position={[0, 0, 0]} intensity={5} color="#ffaa00" distance={15} />
    </group>
  );
};

export default GalaxyScene;
