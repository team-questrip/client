import { configureStore } from '@reduxjs/toolkit';
import addressDataReducer from './addressData';

const store = configureStore({
  reducer: {
    addressData: addressDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
