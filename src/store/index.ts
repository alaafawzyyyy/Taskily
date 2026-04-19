import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userslices';

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
