import { configureStore } from '@reduxjs/toolkit';
import timeReducer from '../slices/slices/time';
import controlReducer from '../slices/slices/control';

const store = configureStore({
  reducer: {
    time: timeReducer,
    control: controlReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
