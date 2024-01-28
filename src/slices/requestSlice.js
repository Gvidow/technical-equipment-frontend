import { createSlice } from '@reduxjs/toolkit';

const requestSlice = createSlice({
  name: 'request',
  initialState: {
    requests: [],
    minDate: '',
    maxDate: '',
    status: '',
    username: '',
  },
  reducers: {
    getRequestsSuccess: (state, action) => {
      state.requests = action.payload;
    },

    setMinDate: (state, action) => {
      return { ...state, minDate: action.payload };
    },
    setMaxDate: (state, action) => {
      return { ...state, maxDate: action.payload };
    },
    setStatus: (state, action) => {
      return { ...state, status: action.payload };
    },
    setSearchUsername: (state, action) => {
      return { ...state, username: action.payload };
    },
  },
});

export const { getRequestsSuccess, setMinDate, setMaxDate, setStatus, setSearchUsername } = requestSlice.actions;

export default requestSlice.reducer;
