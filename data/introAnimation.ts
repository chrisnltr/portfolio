export const INTRO_SESSION_KEY = "intro_animation_played";

export const ANIMATION_PART1_FRAMES = 151;
export const ANIMATION_PART2_FRAMES = 91;

/** ~30 fps — schnelle, flüssige Wiedergabe */
export const INTRO_FPS = 30;

/** Weißer Bildschirm vor dem ersten Frame */
export const INTRO_WHITE_HOLD_MS = 1000;

/** Abschlussbild nach der Frame-Animation */
export const INTRO_OUTRO_IMAGE = "/chris-removebg.png";

/** Dauer des Abschlussbilds über der Startseite */
export const INTRO_OUTRO_HOLD_MS = 2000;

const padFrame = (index: number) => String(index).padStart(3, "0");

export const introFramePath = (part: 1 | 2, index: number): string => {
  const folder = part === 1 ? "AnimationPart1" : "AnimationPart2";
  return `/${folder}/ezgif-frame-${padFrame(index)}.jpg`;
};

export const getIntroFramePaths = (): string[] => {
  const paths: string[] = [];

  for (let i = 1; i <= ANIMATION_PART1_FRAMES; i++) {
    paths.push(introFramePath(1, i));
  }
  for (let i = 1; i <= ANIMATION_PART2_FRAMES; i++) {
    paths.push(introFramePath(2, i));
  }

  return paths;
};
