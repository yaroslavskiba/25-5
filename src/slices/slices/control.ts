import { createSlice } from '@reduxjs/toolkit';

type controlType = {
  start: boolean;
  pause: boolean;
};

const initialState: controlType = {
  start: false,
  pause: false,
};

const timeSlice = createSlice({
  name: 'Control',
  initialState,
  reducers: {
    startOn: (state) => {
      state.start = true;
    },
    startOf: (state) => {
      state.start = false;
    },
    pauseOn: (state) => {
      state.pause = true;
    },
    pauseOf: (state) => {
      state.pause = false;
    },
  },
});

export const { startOn, startOf, pauseOn, pauseOf } = timeSlice.actions;

export default timeSlice.reducer;
