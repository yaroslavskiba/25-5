import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const App = () => {
  const [session, setSession] = useState(1500);
  const [sleep, setSleep] = useState(300);
  const [power, setPower] = useState(false);
  const [current, setCurrent] = useState({ sessionCurrent: 0, sleepCurrent: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      if (power) {
        if (session === 0) {
          setSleep((sleep) => (sleep > 0 ? sleep - 1 : 0));
        } else {
          setSession((session) => (session > 0 ? session - 1 : 0));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [power, session, setSleep, setSession]);

  const handleStart = () => {
    setCurrent({ sessionCurrent: session, sleepCurrent: sleep });
    setPower(true);
  };
  const handlePause = () => {
    setPower(false);
  };
  const handleRestart = () => {
    setSleep(300);
    setSession(1500);
  };

  const minutes = (cur: number): string => {
    return Math.floor(cur / 60)
      .toString()
      .padStart(2, '0');
  };

  const seconds = (cur: number): string => {
    return (cur - Math.floor(cur / 60) * 60).toString().padStart(2, '0');
  };

  const display = () => {
    if (session === 0) {
      return (
        <>
          <span className="timer">{minutes(sleep)}</span>
          <span>:</span>
          <span>{seconds(sleep)}</span>
        </>
      );
    } else {
      return (
        <>
          <span className="timer">{minutes(session)}</span>
          <span>:</span>
          <span>{seconds(session)}</span>
        </>
      );
    }
  };

  return (
    <>
      <h1>25 + 5 Clock</h1>

      <div className="break-session">
        <div className="break-container">
          <span id="break-label">Break Length</span>
          <div className="buttons">
            <button onClick={() => setSleep(sleep + 60)} id="break-increment">
              +
            </button>
            <span id="break-length">{power === false ? sleep / 60 : current.sleepCurrent}</span>
            <button onClick={() => (sleep > 1 ? setSleep(sleep - 60) : sleep)} id="break-decrement">
              -
            </button>
          </div>
        </div>

        <div className="session-container">
          <span id="session-label">Session Length</span>
          <div className="buttons">
            <button onClick={() => setSession(session + 60)} id="session-increment">
              +
            </button>
            <span id="session-length">{power === false ? session / 60 : current.sessionCurrent}</span>
            <button onClick={() => (session > 1 ? setSession(session - 60) : session)} id="session-decrement">
              -
            </button>
          </div>
        </div>
      </div>

      <div className="session">
        <h2>session</h2>
        {display()}
      </div>

      <div className="control-buttons">
        {!power ? <button onClick={handleStart}>start</button> : <button onClick={handlePause}>pause</button>}
        <button onClick={handleRestart}>restart</button>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
