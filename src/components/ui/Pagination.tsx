'use client';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    onPageChange,
}: PaginationProps) => {
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    // Generate page numbers to show
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            // Show all pages if 7 or fewer
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                pages.push('...');
            }

            // Show pages around current
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push('...');
            }

            // Always show last page
            pages.push(totalPages);
        }

        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#3a3a38]">
            {/* Item count */}
            <span className="text-sm text-gray-400">
                Showing {startItem}-{endItem} of {totalItems}
            </span>

            {/* Page navigation */}
            <div className="flex items-center gap-1">
                {/* Previous button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 text-sm rounded bg-[#2a2a28] text-gray-300 
                     hover:bg-[#323230] disabled:opacity-40 disabled:cursor-not-allowed
                     border border-[#3a3a38]"
                >
                    Previous
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1 mx-2">
                    {getPageNumbers().map((page, index) => (
                        page === '...' ? (
                            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">...</span>
                        ) : (
                            <button
                                key={page}
                                onClick={() => onPageChange(page as number)}
                                className={`w-8 h-8 text-sm rounded border transition
                  ${currentPage === page
                                        ? 'bg-[#d97757] border-[#d97757] text-white'
                                        : 'bg-[#2a2a28] border-[#3a3a38] text-gray-300 hover:bg-[#323230]'
                                    }`}
                            >
                                {page}
                            </button>
                        )
                    ))}
                </div>

                {/* Next button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 text-sm rounded bg-[#2a2a28] text-gray-300 
                     hover:bg-[#323230] disabled:opacity-40 disabled:cursor-not-allowed
                     border border-[#3a3a38]"
                >
                    Next
                </button>
            </div>
        </div>
    );
};
