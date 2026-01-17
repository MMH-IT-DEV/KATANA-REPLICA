export const LoadingSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
    const sizes = {
        sm: 'w-4 h-4 border',
        md: 'w-8 h-8 border-2',
        lg: 'w-12 h-12 border-3',
    };

    return (
        <div className={`${sizes[size]} border-[#d97757] border-t-transparent rounded-full animate-spin`} />
    );
};

export const PageLoader = () => (
    <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
    </div>
);

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
    <div className="space-y-2 p-4">
        {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="h-12 bg-gray-800/50 rounded animate-pulse" />
        ))}
    </div>
);
