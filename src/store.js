import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
// import modelingsReducer from './slices/modelingsSlice';
// import modelingsDetailsReducer from './slices/modelingsDetailsSlice';
import authReducer from './slices/authSlice';
// import bucketReducer from './slices/bucketSlice';
// import applicationReducer from './slices/applicationSlice';

const store = configureStore({
  reducer: {
    // modelings: modelingsReducer,
    // modelingsDetails: modelingsDetailsReducer,
    auth: authReducer,
    // bucket: bucketReducer,
    // applications: applicationReducer,
  },
    middleware: [thunk],
});


export default store;
