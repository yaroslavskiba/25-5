import { createSlice } from '@reduxjs/toolkit';

export type state = {
  break: number;
  session: number;
};

const initialState: state = {
  break: 5 * 60,
  session: 25 * 60,
};

const controlSlice = createSlice({
  name: 'timeCounter',
  initialState,
  reducers: {
    incrementBreak: (state) => {
      state.break += 60;
    },
    decrementBreak: (state) => {
      state.break -= 60;
    },
    incrementSession: (state) => {
      state.session += 60;
    },
  },
});

export const { incrementBreak, decrementBreak, incrementSession } = controlSlice.actions;

export default controlSlice.reducer;
