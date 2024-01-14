import { createSlice } from '@reduxjs/toolkit';

const equipmentDetailSlice = createSlice({
  name: 'equipmentDetail',
  initialState: {
    details: {},
  },
  reducers: {
    getEquipmentDetailSlice: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const { getEquipmentDetailSlice } = equipmentDetailSlice.actions;
export default equipmentDetailSlice.reducer;
