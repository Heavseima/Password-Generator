import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export type ThemeType = {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    hasHydrated: boolean;
    setHashydrated: () => void;
}

export const useSettingStore = create<ThemeType>()(
    persist((set,get) => ({
        theme: 'light',
        hasHydrated: false,
        setHashydrated : () => set({hasHydrated: true}),
        toggleTheme: () => {
            const currentTheme = get().theme;
            set({theme : currentTheme === 'light' ? 'dark' : 'light'});
        }
}), {
    name: 'theme-storage',
    onRehydrateStorage: () => (state) => {state?.setHashydrated()}
}))