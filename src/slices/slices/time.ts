import { createSlice } from '@reduxjs/toolkit';

export type state = {
  break: number;
  session: number;
  seconds: number;
};

const initialState: state = {
  break: 5,
  session: 25,
  seconds: 0,
};

const controlSlice = createSlice({
  name: 'timeCounter',
  initialState,
  reducers: {
    incrementBreak: (state) => {
      state.break += 1;
    },
    decrementBreak: (state) => {
      state.break -= 1;
    },
    incrementSession: (state) => {
      state.session += 1;
    },
    decrementSession: (state) => {
      state.session -= 1;
    },
    decrementSeconds: (state) => {
      state.seconds -= 1;
    },
  },
});

export const { incrementBreak, decrementBreak, incrementSession, decrementSession, decrementSeconds } =
  controlSlice.actions;

export default controlSlice.reducer;
