import { configureStore } from '@reduxjs/toolkit';
import timeReducer from '../slices/slices/time';

const store = configureStore({
  reducer: {
    time: timeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
