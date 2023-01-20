const toHHMMSS = (secs: number): string => {
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor(secs / 60) % 60;
  const seconds = secs % 60;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const days = Math.floor(hours / 24);

  if (days > 0) {
    const remainder = hours % 24;
    return `${days} day${days > 1 ? 's' : ''}` + ` ${remainder}h`;
  }
  return `${hours}h ${minutes}m ${formattedSeconds}s`;
};

export default toHHMMSS;
