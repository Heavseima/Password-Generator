import {useSettingStore} from "../store/useSettingStore";
import {useEffect} from "react";

const Header = () => {
    const {theme, toggleTheme} = useSettingStore();

    useEffect(() => {

        if (theme === 'light') {
            document.documentElement.classList.remove("dark");
        } else {
            document.documentElement.classList.add("dark");
        }

    }, [theme]);

    return (
        <header>
            <nav className="flex w-full justify-between px-8 py-6 md:px-11 lg:px-25 lg:py-8 items-center text-gray-800 bg-white dark:bg-gray-800 dark:text-white shadow-md">
                <div className="flex gap-3 items-center">
                    <div>
                        <img className="min-w-10 h-10 rounded-full border-2 border-white shadow-md" src="/logo.jpg" alt="logo" />
                    </div>
                    <h2 className="font-bold text:sm md:text-base lg:text-lg">Sigma Password Generator</h2>
                </div>
                <div>
                    <button
                        onClick={toggleTheme}
                        className="pr-3 pl-4 py-1.5 text-xs md:text-base min-w-19 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                    >
                        {theme === 'light' ? 'Dark 🌙' : 'Light ☀️'}
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Header;