import { createSlice } from '@reduxjs/toolkit';

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState: {
    searchEquipmentTitle: '',
    equipments: [],
    loading: false,
    searchAfterDate: '',
  },
  reducers: {
    setSearchEquipmentTitle: (state, action) => {
      return { ...state, searchEquipmentTitle: action.payload };
    },
    setEquipments: (state, action) => {
      return { ...state, equipments: action.payload };
    },
    setLoading: (state, action) => {
      return { ...state, loading: action.payload };
    },
    setSearchAfterDate: (state, action) => {
      return { ...state, searchAfterDate: action.payload };
    }
  },
});

export const {
  setSearchEquipmentTitle,
  setEquipments,
  setLoading,
  setSearchAfterDate,
} = equipmentSlice.actions;

export default equipmentSlice.reducer;
