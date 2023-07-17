//due to the max time won't be hours so hours is not included
export const secondToFormat = (seconds: number) => {
  if (seconds < 0) return "time out!";
  if (seconds < 60) return `${seconds} s`;
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return `${minutes} m ${seconds} s`;
};
