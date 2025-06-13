import {create} from "zustand"
import { persist } from "zustand/middleware";

type PasswordData = {
    includeNumber: boolean;
    includeSymbol: boolean;
    includeLowercase: boolean;
    includeUppercase: boolean;
    length: number;
    setLength: (length: number) => void;
    toggleNumber: () => void;
    toggleSymbol: () => void;
    toggleUppercase: () => void;
    toggleLowercase: () => void;
    generatePassword: () => void;
    password : string
}

export const usePassStore = create<PasswordData>()(
    persist(
        (set, get) => ({
            includeNumber: true,
            includeSymbol: true,
            includeLowercase: true,
            includeUppercase: true,
            length: 4,
            setLength: (length)=> set({length}),
            toggleNumber: () => set({ includeNumber: !get().includeNumber }),
            toggleSymbol: () => set({ includeSymbol: !get().includeSymbol }),
            toggleLowercase: () => set({ includeLowercase: !get().includeLowercase }),
            toggleUppercase: () => set({ includeUppercase: !get().includeUppercase }),
            password: "",
            generatePassword: () => {
                const state = get();
                const number = "0123456789"
                const lowercase = "abcdefghijklmnopqrstuvwxyz"
                const uppercase =  "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                const symbol = "!@#$%^&"

                let character = ""

                if (state.includeLowercase) character += lowercase
                if (state.includeNumber) character += number
                if (state.includeSymbol) character += symbol
                if (state.includeUppercase) character += uppercase

                let password = ""

                for (let i = 0; i < state.length; i ++) {
                    password += character[Math.floor(Math.random() * character.length)]
                }

                set({ password })
            },
        }),
        {
            name: 'Simple-Password-Storage',
        }
    )
)