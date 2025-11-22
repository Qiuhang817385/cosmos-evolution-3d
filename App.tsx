import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { CosmicStage, StageInfo } from './types';
import { STAGE_DATA } from './constants';
import { fetchNarrative } from './services/geminiService';

// Import Stages
import SingularityScene from './components/Visuals/SingularityScene';
import BigBangScene from './components/Visuals/BigBangScene';
import DarkAgesScene from './components/Visuals/DarkAgesScene';
import GalaxyScene from './components/Visuals/GalaxyScene';
import StarSystemScene from './components/Visuals/StarSystemScene';

// UI
import Controls from './components/UI/Controls';

const StageRenderer = ({ stage }: { stage: CosmicStage }) => {
  switch (stage) {
    case CosmicStage.Singularity:
      return <SingularityScene />;
    case CosmicStage.BigBang:
      return <BigBangScene />;
    case CosmicStage.DarkAges:
      return <DarkAgesScene />;
    case CosmicStage.GalaxyFormation:
      return <GalaxyScene />;
    case CosmicStage.StarSystem:
      return <StarSystemScene />;
    default:
      return null;
  }
};

// Camera Controller to smoothly move between stages
const CameraController = ({ position }: { position: [number, number, number] }) => {
    // In a real app, we might use 'drei/CameraControls' or 'react-spring' to animate this.
    // For simplicity in this response, we pass the position directly to PerspectiveCamera
    // or let OrbitControls handle interaction. 
    // We will rely on the `makeDefault` camera updating its position when props change if using standard approach,
    // but usually a manual hook is better for smooth transitions.
    // Here, we just set initial defaults for simplicity of the generated code.
    return (
        <PerspectiveCamera makeDefault position={position} fov={60} />
    );
};

const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<CosmicStage>(CosmicStage.Singularity);
  const [narrative, setNarrative] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentData = STAGE_DATA[currentStage];

  // Effect to fetch narrative when stage changes
  useEffect(() => {
    const loadNarrative = async () => {
      setIsLoading(true);
      // Optimistic update with static data first
      setNarrative(currentData.description);
      
      // Then try to fetch AI enhancement
      const aiText = await fetchNarrative(currentStage, currentData);
      setNarrative(aiText);
      setIsLoading(false);
    };
    loadNarrative();
  }, [currentStage, currentData]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      
      <Canvas gl={{ antialias: false }} dpr={[1, 2]}>
        <color attach="background" args={['#000000']} />
        
        {/* Controls to allow user to look around */}
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          maxDistance={200} 
          minDistance={2}
          autoRotate={currentStage === CosmicStage.GalaxyFormation}
          autoRotateSpeed={0.5}
        />

        <CameraController position={currentData.cameraPos} />

        <Suspense fallback={null}>
           <StageRenderer stage={currentStage} />
           
           {/* Background Stars - Always present but faint unless in Dark Ages */}
           {currentStage !== CosmicStage.DarkAges && (
             <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
           )}
        </Suspense>

        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={0.5} radius={0.4} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>

      <Controls 
        currentStage={currentStage} 
        onSetStage={setCurrentStage} 
        narrative={narrative}
        isNarrativeLoading={isLoading}
      />
    </div>
  );
};

export default App;
