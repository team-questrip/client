import { create } from 'zustand';
import { UserCurrentPosition } from '../types/current-position';

interface userCurrentPositionState {
  userCurrentPosition: UserCurrentPosition | null;
  updateUserCurrentPosition: (newPosition: UserCurrentPosition) => void;
}

export const useUserCurrentPositionStore = create<userCurrentPositionState>(
  (set) => ({
    userCurrentPosition: null,
    updateUserCurrentPosition: (newPosition: UserCurrentPosition) =>
      set({ userCurrentPosition: newPosition }),
  })
);
