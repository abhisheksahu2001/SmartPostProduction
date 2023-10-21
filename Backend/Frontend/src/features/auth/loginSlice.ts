import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const loginSlice = createSlice({
  name: 'loginStatus',
  initialState: {
    session: '',
    isLoggedIn: false,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.session = action.payload.session;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.session = '';
    },
  },
});
export const { login, logout } = loginSlice.actions;
export const getLoggedUser = (state: RootState) => state.loginStatus;

export default loginSlice.reducer;
