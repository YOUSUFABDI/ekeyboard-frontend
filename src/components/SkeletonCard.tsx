const SkeletonCard = () => (
    <div className="animate-pulse w-full bg-gray-200 dark:bg-gray-700 rounded border border-white-light dark:border-[#1b2e4b]">
        <div className="h-[215px] bg-gray-300 dark:bg-gray-600 rounded-tl rounded-tr"></div>
        <div className="p-6">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
            <div className="flex items-center justify-between mt-6">
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="w-14 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
        </div>
    </div>
)
export default SkeletonCard
