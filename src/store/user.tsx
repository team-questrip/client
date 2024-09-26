import { create } from 'zustand';
import { UserInfo } from '../types/user';

const userInfo = localStorage.getItem('userInfo');

const initialState: UserInfo | null = userInfo ? JSON.parse(userInfo) : null;

export const useUserStore = create(() => ({
  user: initialState,
}));
