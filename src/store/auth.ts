import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  access_token: string | undefined;
  setAccessToken: (token: string) => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      access_token: undefined,
      setAccessToken: (access_token) => set({ access_token }),
    }),
    {
      name: 'token',
    }
  )
);
