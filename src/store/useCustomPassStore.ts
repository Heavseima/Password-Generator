import {create} from "zustand"
import {persist} from "zustand/middleware"

interface CustomPass {
    password : string
    lengthNumber : number
    lengthLowercase : number
    lengthUppercase : number
    lengthSymbol : number
    setAllLengths: (lowercase: number, uppercase: number, number: number, symbol: number) => void
    generatePassword : () => void
    isShuffled : boolean
    toggleShuffled : () => void
}

export const useCustomPassStore = create<CustomPass>()(
    persist(
        (set, get)=> ({
            password : "",
            lengthLowercase : 2,
            lengthNumber : 2,
            lengthUppercase : 2,
            lengthSymbol : 2,
            setAllLengths: (lowercase, uppercase, number, symbol) =>
                set({
                    lengthLowercase: lowercase,
                    lengthUppercase: uppercase,
                    lengthNumber: number,
                    lengthSymbol: symbol,
                }),
            isShuffled : true,
            toggleShuffled : () => set({isShuffled: !get().isShuffled}),
            generatePassword : () => {

                const state = get()
                const number = "0123456789"
                const lowercase = "abcdefghijklmnopqrstuvwxyz"
                const uppercase =  "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                const symbol = "!@#$%^&"

                const randomfunc = (lengthofChar : number, strOfLetter: string) : string => {
                    let result = "";
                    for (let i = 0; i < lengthofChar; i++) {
                        result += strOfLetter[Math.floor(Math.random() * strOfLetter.length)];
                    }
                    return result;
                }

                function shuffleString(str: string):string {
                    const charArray = str.split('');
                    for (let i = charArray.length - 1; i > 0; i--) {
                        // Generate a random index from 0 to i
                        const j = Math.floor(Math.random() * (i + 1));

                        // Swap elements at indices i and j
                        [charArray[i], charArray[j]] = [charArray[j], charArray[i]];
                    }
                    return charArray.join('');
                }

                const totalPassword = randomfunc(state.lengthLowercase, lowercase)
                                + randomfunc(state.lengthUppercase, uppercase)
                                + randomfunc(state.lengthNumber, number)
                                + randomfunc(state.lengthSymbol, symbol)

                const password = state.isShuffled? shuffleString(totalPassword) : totalPassword
                set({password})
            }
        }),
        {
            name : "Custom-Password-Storage"
        }
    )
)