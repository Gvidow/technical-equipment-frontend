import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import equipmentReducer from './slices/equipmentSlice';
import equipmentDetailReducer from './slices/equipmentDetailSlice';
import authReducer, { saveAuthMiddleware } from './slices/authSlice';
import bucketReducer from './slices/bucketSlice';
import requestReducer from './slices/requestSlice';

const preloadedAuthState = JSON.parse(localStorage.getItem('authState')) || {};

const store = configureStore({
  reducer: {
    equipment: equipmentReducer,
    equipmentDetail: equipmentDetailReducer,
    auth: authReducer,
    bucket: bucketReducer,
    request: requestReducer,
  },
  middleware: [thunk, saveAuthMiddleware],
  preloadedState: {
    auth: preloadedAuthState,
  },
});

export default store;
