import { createSlice } from '@reduxjs/toolkit';

type User = {
  user_metadata: {
    name: string;
    job_title?: string;
  };
};

type UserState = {
  user: User | null;
};

const initialState:UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
