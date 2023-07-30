//due to the max time won't be hours so hours is not included
//due to network latency. Only roughly calculate the time left ( use new Date().getTime() would lead to client-side variability problem)
export const secondToFormat = (seconds: number) => {
  if (seconds < 0) return "time out!";
  if (seconds < 60) return "less than 1 minute";
  if (seconds < 120) return "less than 2 minute left";
  // let minutes = Math.floor(seconds / 60);
  // seconds = seconds % 60;
  // return `${minutes} m ${seconds} s`;
  return "More than 2 minute left";
};
