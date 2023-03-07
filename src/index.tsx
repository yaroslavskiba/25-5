/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const stateTimePower = {
  session: 1500,
  sleep: 300,
  power: false,
};

const App = () => {
  const [state, setState] = useState(stateTimePower);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [timeLeft, setTimeLeft] = useState(state.session);
  const [intervalT, setIntervalT] = useState<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const beep = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (timeLeft < 0) {
      clearInterval(intervalT!);
      setIntervalT(null);
      beep.current?.play();
      setTimeout(() => {
        beep.current?.pause();
      }, 1000);
      if (timerLabel === 'Session') {
        setTimerLabel('Break');
        setTimeLeft(state.sleep);
        startCountdown();
      } else {
        setTimerLabel('Session');
        setTimeLeft(state.session);
        startCountdown();
      }
    }
  }, [timeLeft, intervalT, state.sleep, state.session, timerLabel]);

  const handleStartStop = () => {
    if (!state.power) {
      setState({ ...state, power: true });
      startCountdown();
    } else {
      setIsPaused(!isPaused);
      if (isPaused) {
        startCountdown();
      } else {
        clearInterval(intervalT!);
      }
    }
  };

  const handleResetClick = () => {
    clearInterval(intervalT!);
    setIntervalT(null);
    beep.current?.pause();
    if (beep.current) {
      beep.current.currentTime = 0;
    }
    setIsPaused(false);
    setTimerLabel('Session');
    setState(stateTimePower);
    setTimeLeft(stateTimePower.session);
  };

  const handleSessionIncrement = () => {
    if (state.session < 3600) {
      setState({ ...state, session: state.session + 60 });
      setTimeLeft(state.session + 60);
    }
  };

  const handleSessionDecrement = () => {
    if (state.session > 60) {
      setState({ ...state, session: state.session - 60 });
      setTimeLeft(state.session - 60);
    }
  };

  const handleBreakIncrement = () => {
    if (state.sleep < 3600) {
      setState({ ...state, sleep: state.sleep + 60 });
    }
  };

  const handleBreakDecrement = () => {
    if (state.sleep > 60) {
      setState({ ...state, sleep: state.sleep - 60 });
    }
  };

  const startCountdown = () => {
    const id = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    setIntervalT(id);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
  };

  return (
    <div className="App">
      <div className="pomodoro">
        <div className="length-control">
          <div id="break-label" className="label">
            Break Length
          </div>
          <div className="controls">
            <button id="break-increment" onClick={handleBreakIncrement} disabled={state.power}>
              +
            </button>
            <span id="break-length" className="length">
              {state.sleep / 60}
            </span>
            <button id="break-decrement" onClick={handleBreakDecrement} disabled={state.power}>
              -
            </button>
          </div>
        </div>
        <div className="length-control">
          <div id="session-label" className="label">
            Session Length
          </div>
          <div className="controls">
            <button id="session-increment" onClick={handleSessionIncrement} disabled={state.power}>
              +
            </button>
            <span id="session-length" className="length">
              {state.session / 60}
            </span>
            <button id="session-decrement" onClick={handleSessionDecrement} disabled={state.power}>
              -
            </button>
          </div>
        </div>
        <div id="timer-label">{timerLabel}</div>
        <div id="time-left">{formatTime(timeLeft)}</div>
        <div className="timer-control">
          <button id="start_stop" onClick={handleStartStop}>
            {!state.power ? 'Start' : isPaused ? 'Resume' : 'Pause'}
          </button>
          <button id="reset" onClick={handleResetClick}>
            Reset
          </button>
        </div>
        <audio
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          ref={beep}
        />
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
