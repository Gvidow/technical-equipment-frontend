import { createSlice } from '@reduxjs/toolkit';

const requestSlice = createSlice({
  name: 'request',
  initialState: {
    requests: [],
  },
  reducers: {
    getRequestsSuccess: (state, action) => {
      state.requests = action.payload;
    },
  },
});

export const { getRequestsSuccess } = requestSlice.actions;

export default requestSlice.reducer;
