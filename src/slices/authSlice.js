import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.draft_id = null;
    },
    saveAuthToLocalStorage: (state) => {
      localStorage.setItem('authState', JSON.stringify(state));
    },
  },
});

export const { loginSuccess, logoutSuccess, saveAuthToLocalStorage } = authSlice.actions;

export const saveAuthMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (
    action.type === loginSuccess.type ||
    action.type === logoutSuccess.type
  ) {
    store.dispatch(saveAuthToLocalStorage());
  }
  return result;
};

export default authSlice.reducer;
