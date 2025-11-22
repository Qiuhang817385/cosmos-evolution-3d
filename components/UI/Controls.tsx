import React from 'react';
import { CosmicStage, StageInfo } from '../../types';
import { STAGE_DATA } from '../../constants';
import { ChevronRight, ChevronLeft, PlayCircle, PauseCircle } from 'lucide-react';

interface ControlsProps {
  currentStage: CosmicStage;
  onSetStage: (stage: CosmicStage) => void;
  narrative: string;
  isNarrativeLoading: boolean;
}

const STAGE_ORDER = [
  CosmicStage.Singularity,
  CosmicStage.BigBang,
  CosmicStage.DarkAges,
  CosmicStage.GalaxyFormation,
  CosmicStage.StarSystem
];

const Controls: React.FC<ControlsProps> = ({ currentStage, onSetStage, narrative, isNarrativeLoading }) => {
  const currentIndex = STAGE_ORDER.indexOf(currentStage);
  const currentInfo: StageInfo = STAGE_DATA[currentStage];

  const handleNext = () => {
    if (currentIndex < STAGE_ORDER.length - 1) {
      onSetStage(STAGE_ORDER[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSetStage(STAGE_ORDER[currentIndex - 1]);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 w-full p-6 pointer-events-none flex flex-col items-center gap-4 bg-gradient-to-t from-black via-black/80 to-transparent text-white">
      
      {/* Narrative Panel */}
      <div className="pointer-events-auto max-w-2xl w-full bg-slate-900/50 backdrop-blur-md border border-slate-700 p-6 rounded-xl shadow-2xl transition-all duration-500">
        <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
          {currentInfo.title}
        </h1>
        <div className="min-h-[80px] relative">
             {isNarrativeLoading ? (
                 <div className="animate-pulse flex space-x-4">
                     <div className="flex-1 space-y-2 py-1">
                         <div className="h-2 bg-slate-700 rounded"></div>
                         <div className="h-2 bg-slate-700 rounded"></div>
                         <div className="h-2 bg-slate-700 rounded w-5/6"></div>
                     </div>
                 </div>
             ) : (
                <p className="text-slate-200 text-sm md:text-base leading-relaxed font-light tracking-wide">
                    {narrative}
                </p>
             )}
        </div>
      </div>

      {/* Timeline Stepper */}
      <div className="pointer-events-auto flex items-center gap-2 md:gap-4 bg-slate-900/80 backdrop-blur rounded-full p-2 border border-slate-800 shadow-lg">
        <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-2 hover:bg-slate-700 rounded-full disabled:opacity-30 transition-colors"
        >
            <ChevronLeft size={24} />
        </button>

        <div className="flex gap-1 md:gap-2">
            {STAGE_ORDER.map((stage, idx) => (
                <button
                    key={stage}
                    onClick={() => onSetStage(stage)}
                    className={`h-2 w-8 md:w-16 rounded-full transition-all duration-300 ${
                        idx === currentIndex 
                        ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
                        : idx < currentIndex 
                            ? 'bg-slate-500' 
                            : 'bg-slate-800'
                    }`}
                    title={STAGE_DATA[stage].title}
                />
            ))}
        </div>

        <button 
            onClick={handleNext}
            disabled={currentIndex === STAGE_ORDER.length - 1}
            className="p-2 hover:bg-slate-700 rounded-full disabled:opacity-30 transition-colors"
        >
            <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Controls;
