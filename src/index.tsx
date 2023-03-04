import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const App = () => {
  return (
    <>
      <h1>25 + 5 Clock</h1>

      <div className="break-session">
        <div className="break-container">
          <span id="break-label">Break Length</span>
          <div className="buttons">
            <button onClick={} id="break-increment">
              +
            </button>
            <span id="break-length">{}</span>
            <button onClick={} id="break-decrement">
              -
            </button>
          </div>
        </div>

        <div className="session-container">
          <span id="session-label">Session Length</span>
          <div className="buttons">
            <button onClick={} id="session-increment">
              +
            </button>
            <span id="session-length">{(sessionState / 60).toString()}</span>
            <button onClick={} id="session-decrement">
              +
            </button>
          </div>
        </div>
      </div>

      <div className="session">
        <h2>session</h2>
        <span className="timer">{}</span>
        <span>:</span>
        <span>{}</span>
      </div>

      <div className="control-buttons">
        {/* <button onClick={handleStart}>start</button>
        <button onClick={handlePause}>pause</button> */}
        <button onClick={}>restart</button>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
