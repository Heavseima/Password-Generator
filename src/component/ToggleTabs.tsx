import { useState, useEffect } from "react"
import SimplePassword from "./SimplePassword";
import CustomPassword from "./CustomPassword";

const ToggleTabs = () => {

    const tabs = ["Simple Password", "Custom Password"];

    const getInitialTab = () => {
        const storedTab = localStorage.getItem("activeTab");
        return storedTab || tabs[0];
    }

    const [activeTab, setActiveTab] = useState<string>(getInitialTab);

    useEffect(()=> {
        localStorage.setItem("activeTab", activeTab);
    }, [activeTab])

    const handleTabRender = () => {
        switch (activeTab) {
            case "Simple Password":
                return <SimplePassword />;
            case "Custom Password":
                return <CustomPassword />;
            default:
                return <SimplePassword />;
        }
    }

    return <>
        <div className="px-8 py-5 md:px-11 md:py-8 lg:px-25 lg:py-10 text-gray-800 dark:text-white dark:bg-gray-700 min-h-screen">
            <div className="mb-8 text-center max-w-4xl mx-auto">
                <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Welcome to Our Sigma Password Generator App
                </h1>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    Shave your head and be a part of our Sigma Family now with a good discount within 24hrs of using this App for the First Time!
                </p>
            </div>

            <div className="w-full">
                <div className="flex mb-6 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`
                        flex-1 px-4 py-2.5 text-sm font-medium rounded-md
                        transition-all duration-200 ease-out
                        focus:outline-none focus:ring-2 focus:ring-blue-500/20
                        ${activeTab === tab
                            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }
                        `}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

                {/* Tab Content Container */}
                <div className="
                    bg-white dark:bg-gray-800
                    border border-gray-200 dark:border-gray-700
                    rounded-xl shadow-sm dark:shadow-gray-900/20
                    transition-all duration-300 ease-out
                    px-6 md:px-8 py-6 md:py-8
                    backdrop-blur-sm mb-5 md:mb-8
                ">
                    <div className="transition-opacity duration-200 ease-in-out">
                        {handleTabRender()}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ToggleTabs

