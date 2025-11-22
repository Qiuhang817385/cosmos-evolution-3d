export enum CosmicStage {
  Singularity = 'Singularity',
  BigBang = 'BigBang',
  DarkAges = 'DarkAges',
  GalaxyFormation = 'GalaxyFormation',
  StarSystem = 'StarSystem'
}

export interface StageInfo {
  id: CosmicStage;
  title: string;
  description: string; // Fallback static description
  cameraPos: [number, number, number];
}

export interface StarProps {
  position: [number, number, number];
  size: number;
  color: string;
}
