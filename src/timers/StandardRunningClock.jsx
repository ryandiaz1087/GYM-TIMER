import React, { useState, useEffect } from 'react';
import CountDown from '../shared/CountDown';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  clock: {
    fontFamily: 'orbitron',
  }
});

function StandardRunningClock() {
  const [countDown, setCountDown] = useState(10);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const tenSecondCountDown = () => setCountDown(cntDown => cntDown - 1);

  const stopWatch = () => {
    if (seconds === 59) {
      if (minutes === 59) {
        setHours(hrs => hrs + 1);
        setMinutes(0);
        setSeconds(0);
        return;
      }
      setSeconds(0);
      setMinutes(mins => mins + 1);
    } else {
      setSeconds(secs => secs + 1);
    }
  }

  useEffect(() => {
    let stopWatchInterval = null;

    if (countDown === 0) {
      stopWatchInterval = setInterval(stopWatch, 1000);
    }

    return () => clearInterval(stopWatchInterval);
  }, [seconds, minutes, countDown]);

  return (
    <div>
      <CountDown countDown={countDown} setCountDown={setCountDown} />
      {time}
    </div>
  );
}

export default StandardRunningClock;
