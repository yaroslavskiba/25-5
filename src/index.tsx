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
    if (session === 0 && sleep === 0) {
      setSleep(300);
      setSession(1500);
      setCurrent({ sessionCurrent: 0, sleepCurrent: 0 });
    } else {
      handlePause();
      setSleep(300);
      setSession(1500);
      setCurrent({ sessionCurrent: 0, sleepCurrent: 0 });
    }
  };

  const minutes = (cur: number): string => {
    return Math.floor(cur / 60)
      .toString()
      .padStart(2, '0');
  };

  const seconds = (cur: number): string => {
    return (cur - Math.floor(cur / 60) * 60).toString().padStart(2, '0');
  };

  return (
    <>
      <h1>25 + 5 Clock</h1>

      <div className="break-session">
        <div className="break-container">
          <span id="break-label">Break Length</span>
          <div className="buttons">
            {!power && (
              <button onClick={() => setSleep(sleep + 60)} id="break-increment">
                +
              </button>
            )}
            <span id="break-length">
              {power === false ? Math.floor(sleep / 60) : Math.floor(current.sleepCurrent / 60)}
            </span>
            {!power && (
              <button onClick={() => (sleep >= 0 ? setSleep(sleep - 60) : setSleep(sleep))} id="break-decrement">
                -
              </button>
            )}
          </div>
        </div>

        <div className="session-container">
          <span id="session-label">Session Length</span>
          <div className="buttons">
            {!power && (
              <button onClick={() => setSession(session + 60)} id="session-increment">
                +
              </button>
            )}
            <span id="session-length">
              {power === false ? Math.floor(session / 60) : Math.floor(current.sessionCurrent / 60)}
            </span>
            {!power && (
              <button
                onClick={() => (session >= 0 ? setSession(session - 60) : setSession(session))}
                id="session-decrement"
              >
                -
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="session">
        <h2 id="timer-label">session</h2>
        {session === 0 ? (
          <>
            <span id="time-left" className="timer">
              {minutes(sleep)}:{seconds(sleep)}
            </span>
          </>
        ) : (
          <>
            <span id="time-left" className="timer">
              {minutes(session)}:{seconds(session)}
            </span>
          </>
        )}
      </div>

      <div className="control-buttons">
        {!power ? (
          <button id="start_stop" onClick={handleStart}>
            start
          </button>
        ) : (
          <button onClick={handlePause}>pause</button>
        )}
        <button id="reset" onClick={handleRestart}>
          restart
        </button>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
