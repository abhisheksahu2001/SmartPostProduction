import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/auth/userSlice';
import signUpReducer from './features/auth/signupSlice';
import loginReducer from './features/auth/loginSlice';
import planReducer from './features/auth/planSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    plan: planReducer,
    signup: signUpReducer,
    loginStatus: loginReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
