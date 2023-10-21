import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const userSlice = createSlice({
  name: 'userData',
  initialState: {
    id: '',
    pic: '',
    last_login: '',
    email: '',
    phone: '',
    name: '',
    created_at: '',
    plan_id: '',
    user_post_count: 0,
    user_post_schedule_count: 0,
    plan_type: '',
    user_plan_activate_date: '',
    user_plan_expiry_date: '',
    user_plan_status: '',
  },
  reducers: {
    user(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.pic = action.payload.pic;
      state.last_login = action.payload.last_login;
      state.name = action.payload.name;
      state.created_at = action.payload.created_at;
      state.plan_id = action.payload.plan_id;
      state.user_post_count = action.payload.user_post_count;
      state.user_post_schedule_count = action.payload.user_post_schedule_count;
      state.plan_type = action.payload.plan_type;
      state.user_plan_activate_date = action.payload.user_plan_activate_date;
      state.user_plan_expiry_date = action.payload.user_plan_expiry_date;
      state.user_plan_status = action.payload.user_plan_status;
    },
    removeUser(state) {
      state.id = '';
      state.email = '';
      state.phone = '';
      state.pic = '';
      state.last_login = '';
      state.name = '';
      state.created_at = '';
      state.plan_id = '';
      state.user_post_count = 0;
      state.user_post_schedule_count = 0;
      state.plan_type = '';
      state.user_plan_activate_date = '';
      state.user_plan_expiry_date = '';
      state.user_plan_status = '';
    },
  },
});
export const { user, removeUser } = userSlice.actions;
export const getUser = (state: RootState) => state.user;

export default userSlice.reducer;
