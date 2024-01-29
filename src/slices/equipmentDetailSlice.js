import { createSlice } from '@reduxjs/toolkit';

const equipmentDetailSlice = createSlice({
  name: 'equipmentDetail',
  initialState: {
    details: {},
  },
  reducers: {
    setEquipmentDetailSlice: (state, action) => {
      state.details = action.payload;
    },
    setEquipmentDetailField: (state, action) => {
      const { fieldName, fieldValue } = action.payload;
      state.details[fieldName] = fieldValue;
    },
    toInitState: (state) => {
      state.details = {};
      state.details.equipment_image = null;
      state.details.picture = null;
      state.details.title = '',
      state.details.description = '',
      state.details.load = null;
    }
  },
});

export const { setEquipmentDetailSlice, toInitState, setEquipmentDetailField } = equipmentDetailSlice.actions;
export default equipmentDetailSlice.reducer;
