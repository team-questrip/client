import { createSlice } from '@reduxjs/toolkit';
import { UserInfo } from '../types/user';
import { RootState } from './store';

const userInfo = localStorage.getItem('userInfo');

const initialState: UserInfo | null = userInfo ? JSON.parse(userInfo) : null;

const postSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const selectUser = (state: RootState) => state.user;

export default postSlice.reducer;
