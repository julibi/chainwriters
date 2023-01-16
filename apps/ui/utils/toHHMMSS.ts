const toHHMMSS = (secs: number): string => {
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor(secs / 60) % 60;
  const seconds = secs % 60;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const days = Math.floor(hours / 24);
  if (days > 1) {
    return `${days} days`;
  }
  return `${hours}h ${minutes}m ${formattedSeconds}s`;
};

export default toHHMMSS;
