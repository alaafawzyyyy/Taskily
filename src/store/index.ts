import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userslices';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
