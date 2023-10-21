import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const PlanSlice = createSlice({
  name: 'Plan',
  initialState: {
    id: '',
    type: '',
    details: '',
    post_limit: 0,
    post_schedule_limit: 0,
  },
  reducers: {
    Plan(state, action) {
      state.id = action.payload.id;
      state.type = action.payload.type;
      state.details = action.payload.details;
      state.post_limit = action.payload.post_limit;
      state.post_schedule_limit = action.payload.post_schedule_limit;
    },
  },
});
export const { Plan } = PlanSlice.actions;
export const getPlan = (state: RootState) => state.plan;

export default PlanSlice.reducer;
