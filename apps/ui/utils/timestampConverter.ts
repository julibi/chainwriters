const timestampConverter = (UNIX_timestamp: string) => {
  const a = new Date(Number(UNIX_timestamp) * 1000);
  const year = a.getFullYear();
  const month = a.getMonth();
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  return `${hour}:${min} - ${date}.${month}.${year}`
}

export default timestampConverter;