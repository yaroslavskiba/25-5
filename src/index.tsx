import React, { /*useEffect,*/ useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const App = () => {
  const [session, setSession] = useState(25 * 60);
  const [sleep, setSleep] = useState(5 * 60);
  const [power /*, setPower*/] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      power && session === 0
        ? setSleep((sleep) => (sleep > 0 ? sleep - 1 : 0))
        : setSession((session) => (session > 0 ? session - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [power]);

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
    }

    if (sleep === 0 || (sleep !== 0 && session !== 0)) {
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
            <button onClick={() => setSleep((sleep + 1) * 60)} id="break-increment">
              +
            </button>

            {/* //TODO: исправить */}

            <span id="break-length">{Math.floor(sleep / 60).toString()}</span>
            <button onClick={() => setSleep((sleep - 1) * 60)} id="break-decrement">
              -
            </button>
          </div>
        </div>

        <div className="session-container">
          <span id="session-label">Session Length</span>
          <div className="buttons">
            <button onClick={() => setSession((session + 1) * 60)} id="session-increment">
              +
            </button>

            {/* //TODO: исправить */}

            <span id="session-length">{Math.floor(session / 60).toString()}</span>
            <button onClick={() => setSession((session - 1) * 60)} id="session-decrement">
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
        {/* <button onClick={handleStart}>start</button>
        <button onClick={handleRestart}>restart</button> */}
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
