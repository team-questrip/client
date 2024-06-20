import { configureStore } from '@reduxjs/toolkit';
import addressDataReducer from './addressData';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    addressData: addressDataReducer,
    user: userReducer,
  },
});

// user 사용시 : const user = useSelector(selectUser);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
