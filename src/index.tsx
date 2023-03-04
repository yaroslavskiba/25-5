import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import store from './slices/index';
// import { Provider, useDispatch, useSelector } from 'react-redux';

const App = () => {
  return (
    <>
      <h1>25 + 5 Clock</h1>

      <div className='break-session'>

        <div className='break-container'>
          <span id="break-label">Break Length</span>
          <div className='buttons'>
            <button></button>
            <span>{ }</span>
            <button></button>
          </div>
        </div>

        <div className='session-container'>
          <span id="session-label">Session Length</span>
          <div className='buttons'>
            <button></button>
            <span>{ }</span>
            <button></button>
          </div>
        </div>
      </div>

      <div className='session'>
        <h2>session</h2>
        <span className='timer'>{ }</span>
      </div>

      <div className='control-buttons'>
        <button></button>
        <button></button>
        <button></button>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <Provider store={store}>
    <App />
  {/* </Provider>, */}
);
