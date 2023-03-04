import { createSlice } from '@reduxjs/toolkit';

export type state = {
  break: number;
  session: number;
};

const initialState: state = {
  break: 5,
  session: 25,
};

const timeSlice = createSlice({
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
  },
});

export const { incrementBreak, decrementBreak, incrementSession, decrementSession } = timeSlice.actions;

export default timeSlice.reducer;
