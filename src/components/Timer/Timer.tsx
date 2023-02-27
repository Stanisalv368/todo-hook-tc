import React, { useState, useEffect } from "react";
import "./Timer.css";

interface Itimer {
  seconds: number;
  updateTimer: any;
  completed: boolean;
}

const Timer = (props: Itimer) => {
  const [timer, setTimer] = useState(false);
  const [second, setSeconds] = useState(props.seconds);

  const onStart = () => setTimer(true);
  const onStop = () => setTimer(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (props.completed) {
        onStop();
      }
      if (!props.seconds) {
        onStop();
      }
      if (timer) {
        setSeconds(() => second - 1);
      }
    }, 1000);

    props.updateTimer(second);

    return () => clearInterval(interval);
  }, [timer, second, props.completed]);

  const getPadTime = (times: number) => times.toString().padStart(2, "0");

  const minutes = getPadTime(Math.floor(second / 60));
  const seconds = getPadTime(Math.floor(second - Number(minutes) * 60));

  return (
    <span className="timer">
      <button className="icon icon-play" onClick={onStart}></button>
      <button className="icon icon-pause" onClick={onStop}></button>
      <div className="time">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
    </span>
  );
};

export default Timer;
