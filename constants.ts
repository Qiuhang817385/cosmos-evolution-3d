import { CosmicStage, StageInfo } from './types';

export const STAGE_DATA: Record<CosmicStage, StageInfo> = {
  [CosmicStage.Singularity]: {
    id: CosmicStage.Singularity,
    title: "奇点 (Singularity)",
    description: "宇宙诞生之初。所有的物质、能量、空间和时间都压缩在一个无限致密、无限炽热的点中。物理定律在此失效。",
    cameraPos: [0, 0, 15]
  },
  [CosmicStage.BigBang]: {
    id: CosmicStage.BigBang,
    title: "大爆炸 (The Big Bang)",
    description: "空间急剧膨胀。在极短的时间内，宇宙从微观尺度暴胀到宏观尺度，基本粒子形成，温度开始急剧下降。",
    cameraPos: [0, 0, 50]
  },
  [CosmicStage.DarkAges]: {
    id: CosmicStage.DarkAges,
    title: "宇宙黑暗时代 (Dark Ages)",
    description: "大爆炸余晖散去，第一代恒星尚未诞生。宇宙充满中性氢气云，一片漆黑，唯有重力在悄悄凝聚物质。",
    cameraPos: [20, 20, 20]
  },
  [CosmicStage.GalaxyFormation]: {
    id: CosmicStage.GalaxyFormation,
    title: "星系形成 (Galaxies)",
    description: "引力将气体云坍缩成巨大的旋转圆盘。数十亿颗恒星在其中诞生，银河系的雏形开始显现。",
    cameraPos: [0, 40, 60]
  },
  [CosmicStage.StarSystem]: {
    id: CosmicStage.StarSystem,
    title: "恒星与行星 (Star Systems)",
    description: "在星云深处，原恒星诞生。残余的物质盘聚集成行星，围绕恒星公转，生命诞生的舞台搭建完成。",
    cameraPos: [0, 20, 25]
  }
};

export const ANIMATION_SPEED = 0.01;
