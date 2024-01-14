import { createSlice } from '@reduxjs/toolkit';

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState: {
    searchEquipmentTitle: '',
    equipments: [],
    loading: false,
    minPrice: 0,
    maxPrice: 99000,
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
    setMinPrice: (state, action) => {
      return { ...state, minPrice: action.payload };
    },
    setMaxPrice: (state, action) => {
      return { ...state, maxPrice: action.payload };
    },
  },
});

export const {
  setSearchEquipmentTitle,
  setEquipments,
  setLoading,
  setMinPrice,
  setMaxPrice,
} = equipmentSlice.actions;

export default equipmentSlice.reducer;
