interface HeaderProp {
    title : string
    subtitle : string 
}

const TabsHeader = ({title, subtitle}  : HeaderProp ) => {
    return <>
        {/* Header */}
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
                {subtitle}
            </p>
        </div>
    </>
}

export default TabsHeader