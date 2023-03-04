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

  return (
    <>
      <h1>25 + 5 Clock</h1>

      <div className="break-session">
        <div className="break-container">
          <span id="break-label">Break Length</span>
          <div className="buttons">
            <button></button>
            <span>{breakState}</span>
            <button></button>
          </div>
        </div>

        <div className="session-container">
          <span id="session-label">Session Length</span>
          <div className="buttons">
            <button></button>
            <span>{sessionState}</span>
            <button></button>
          </div>
        </div>
      </div>

      <div className="session">
        <h2>session</h2>
        <span className="timer">{sessionState}</span>
      </div>

      <div className="control-buttons">
        <button></button>
        <button></button>
        <button></button>
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
