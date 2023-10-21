import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const signUpSlice = createSlice({
  name: 'Signup',
  initialState: {
    registered: false,
  },
  reducers: {
    register(state, action) {
      state.registered = action.payload.registered;
    },
  },
});
export const { register } = signUpSlice.actions;
export const getRegister = (state: RootState) => state.signup;

export default signUpSlice.reducer;
