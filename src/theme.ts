import { create } from "zustand";
import { persist } from "zustand/middleware";

export const lightTheme = {
  background: '#FFF',
  text: '#000',
  blue: '#0A84FF',
  yellow: '#ffd60a',
  purple: '#BF5AF2',
  cyan: '#64D2FF',
};

export const darkTheme = {
  background: '#000',
  text: '#FFF',
  blue: '#0A84FF',
  yellow: '#ffd60a',
  purple: '#BF5AF2',
  cyan: '#64D2FF',
};

interface ThemeState {
  theme: typeof lightTheme | typeof darkTheme;
  toggleTheme: () => void;
}

const getInitialTheme = (): typeof lightTheme | typeof darkTheme => {
  const storedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
  return (storedTheme === "dark" || storedTheme == null) ? lightTheme : darkTheme;
};

const useTheme= create<ThemeState>()(
  persist(
    (set) => ({
      theme: getInitialTheme(),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === lightTheme ? darkTheme : lightTheme,
        })),
    }),
    {
      name: "theme-preference",
    }
  )
);

export default useTheme;