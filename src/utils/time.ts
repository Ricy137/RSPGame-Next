//due to the max time won't be hours so hours is not included
export const secondToFormat = (milleSeconds: number) => {
  let seconds = Math.floor(milleSeconds / 1000);
  if (seconds < 60) return `${seconds} s`;
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return `${minutes} m ${seconds} s`;
};
