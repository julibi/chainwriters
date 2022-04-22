import React, { useEffect, useState } from "react";
import toHHMMSS from "../utils/toHHMMSS";

const Countdown = ({ end }: { end: number }) => {
  // get current time
  const [time, setTime] = useState(() => Math.floor(Date.now() / 1000));

  useEffect((): (() => void) | void => {
    // we only need to tick if rewards haven't ended yet
    if (time <= end) {
      const timeout = setTimeout(
        () => setTime(Math.floor(Date.now() / 1000)),
        1000
      );
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [time, end]);

  const timeUntilEnd = end - time;

  return (
    <>{toHHMMSS(timeUntilEnd)}</>
  );
}

export default Countdown;
