export const getScoreForLevel = (level: number) => {
  return 12.5 * Math.pow(level, 2) + 962.5 * level - 975;
};