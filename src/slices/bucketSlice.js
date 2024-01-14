import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bucketItems: [],
  draft_id: null,
  equipmentCount: 0,
  people_per_minute: null,
  time_interval: null,
};

const bucketSlice = createSlice({
  name: 'bucket',
  initialState,
  reducers: {
    setBucketItem: (state, action) => {
      state.bucketItems = action.payload;
      state.equipmentCount = state.bucketItems ? state.bucketItems.length : 0;
    },
    setDraftId: (state, action) => {
      state.draft_id = action.payload;
    },
    setPeoplePerMinute: (state, action) => {
      state.people_per_minute = action.payload;
    },
    setTimeInterval: (state, action) => {
      state.time_interval = action.payload;
    },
    resetBucket: (state) => {
      return { ...initialState };
    },
  },
});

export const { setBucketItem, setDraftId, setPeoplePerMinute, setTimeInterval, resetBucket } = bucketSlice.actions;

export default bucketSlice.reducer;
