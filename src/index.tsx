import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const App = () => {
  const [session, setSession] = useState(1500);
  const [sleep, setSleep] = useState(300);
  const [power, setPower] = useState(false);
  console.log(session);
  //TODO: Добавить текущее состояние

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
    setPower(true);
  };
  const handlePause = () => {
    // TODO: При нажатии на паузу - заносить в состояние
    setPower(false);
  };
  const handleRestart = () => {
    if (session === 1500 && sleep === 300) {
      return;
    }
    handlePause();
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

  const handleIncrease = (state: string): void => {
    if (power) return;
    switch (state) {
      case 'break':
        if (sleep < 3600) {
          setSleep(sleep + 60);
        }
        break;
      case 'session':
        if (session < 3600) {
          setSession(session + 60);
        }
        break;
    }
  };

  const handleDecrease = (state: string): void => {
    if (power) return;
    switch (state) {
      case 'break':
        if (sleep > 60) {
          setSleep(sleep - 60);
        }
        break;
      case 'session':
        if (session > 60) {
          setSession(session - 60);
        }
        break;
    }
  };

  return (
    <>
      <h1>25 + 5 Clock</h1>

      <div className="break-session">
        <div className="break-container">
          <span id="break-label">Break Length</span>
          <div className="buttons">
            {!power && (
              <button onClick={() => handleIncrease('break')} id="break-increment">
                +
              </button>
            )}

            {/* //TODO: Записать текущее состояние сюда */}

            <span id="break-length">{Math.floor(sleep / 60)}</span>
            {!power && (
              <button onClick={() => handleDecrease('break')} id="break-decrement">
                -
              </button>
            )}
          </div>
        </div>

        <div className="session-container">
          <span id="session-label">Session Length</span>
          <div className="buttons">
            {!power && (
              <button onClick={() => handleIncrease('session')} id="session-increment">
                +
              </button>
            )}

            {/* //TODO: Записать текущее состояние сюда */}

            <span id="session-length">{Math.floor(session / 60)}</span>
            {!power && (
              <button onClick={() => handleDecrease('session')} id="session-decrement">
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
