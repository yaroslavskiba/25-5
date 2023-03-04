import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from './slices/index';
import { Provider, /* useDispatch,*/ useSelector } from 'react-redux';
import { RootState } from './slices/index';

const App = () => {
  // const dispatch = useDispatch();
  const breakState = useSelector((state: RootState) => state.time.break);
  const sessionState = useSelector((state: RootState) => state.time.session);
  const secondsState = useSelector((state: RootState) => state.time.seconds);

  // const startState = useSelector((state: RootState) => state.control.start);
  // const pauseState = useSelector((state: RootState) => state.control.pause);

  return (
    <>
      <h1>25 + 5 Clock</h1>

      <div className="break-session">
        <div className="break-container">
          <span id="break-label">Break Length</span>
          <div className="buttons">
            <button id="break-increment"></button>
            <span id="break-length">{breakState.toString()}</span>
            <button id="break-decrement"></button>
          </div>
        </div>

        <div className="session-container">
          <span id="session-label">Session Length</span>
          <div className="buttons">
            <button id="session-increment"></button>
            <span id="session-length">{sessionState.toString()}</span>
            <button id="session-decrement"></button>
          </div>
        </div>
      </div>

      <div className="session">
        <h2>session</h2>
        <span className="timer">{sessionState}</span>
        <span>:</span>
        <span>{secondsState.toString().padStart(2, '0')}</span>
      </div>

      <div className="control-buttons">
        <button>start</button>
        <button>pause</button>
        <button>restart</button>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
