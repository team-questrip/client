import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: '',
  latitude: 0,
  longitude: 0,
};

const addressDataSlice = createSlice({
  name: 'addressData',
  initialState,
  reducers: {
    setAddressData: (state, action) => {
      state.address = action.payload.address;
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

export const { setAddressData } = addressDataSlice.actions;

export default addressDataSlice.reducer;
