import { create } from 'zustand';
import { UserInfo } from '../types/user';

interface UserState {
  user: UserInfo | null;
  setUser: (userInfo: UserInfo | null) => void;
}

const userInfo = localStorage.getItem('userInfo');

const initialState: UserInfo | null = userInfo ? JSON.parse(userInfo) : null;

export const useUserStore = create<UserState>((set) => ({
  user: initialState,
  setUser: (userInfo: UserInfo | null) => set({ user: userInfo }),
}));
