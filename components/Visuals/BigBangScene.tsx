import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BigBangScene: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 4000;

  const [positions, speeds, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const colorObj = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Initial positions clustered in center
      pos[i * 3] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;

      // Velocities outward
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const speed = 10 + Math.random() * 50; // High speed

      spd[i * 3] = speed * Math.sin(phi) * Math.cos(theta);
      spd[i * 3 + 1] = speed * Math.sin(phi) * Math.sin(theta);
      spd[i * 3 + 2] = speed * Math.cos(phi);

      // Start white/yellow hot
      colorObj.setHSL(0.1 + Math.random() * 0.1, 1, 0.9);
      cols[i * 3] = colorObj.r;
      cols[i * 3 + 1] = colorObj.g;
      cols[i * 3 + 2] = colorObj.b;
    }
    return [pos, spd, cols];
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      const geometry = pointsRef.current.geometry;
      const positionAttribute = geometry.getAttribute('position');
      
      // Update positions manually
      for (let i = 0; i < count; i++) {
        // Slow down over time (friction/gravity simulation)
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        positionAttribute.setXYZ(
            i,
            positionAttribute.getX(i) + speeds[ix] * delta * 0.5,
            positionAttribute.getY(i) + speeds[iy] * delta * 0.5,
            positionAttribute.getZ(i) + speeds[iz] * delta * 0.5
        );
      }
      positionAttribute.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
            attach="attributes-color"
            count={count}
            array={colors}
            itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.5}
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default BigBangScene;
