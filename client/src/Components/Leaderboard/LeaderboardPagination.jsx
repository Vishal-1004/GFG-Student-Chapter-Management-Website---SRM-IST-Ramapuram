import { motion, AnimatePresence } from "framer-motion";
import { 
  IoChevronBackOutline, 
  IoChevronForwardOutline, 
  IoGridOutline,
  IoListOutline 
} from "react-icons/io5";

const LeaderboardPagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  onViewChange 
}) => {
  // Determine which pages to show
  const getPageRange = () => {
    const range = [];
    const delta = 1;
    
    // Always show first and last page
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    range.push(1);

    // Determine start and end of middle range
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    // Add ellipsis if needed
    if (start > 2) {
      range.push('...');
    }

    // Add middle range
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Add ellipsis if needed
    if (end < totalPages - 1) {
      range.push('...');
    }

    range.push(totalPages);

    return range;
  };

  const pageRange = getPageRange();

  return (
    <div className="flex flex-col items-center space-y-4 mt-4">
      <div className="flex justify-center items-center space-x-2">
        {/* Previous Button */}
        <motion.button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          whileHover={{ 
            scale: 1.1, 
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.9 }}
          disabled={currentPage === 1}
          className="
            p-3 rounded-full bg-gfgsc-green-200 
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:bg-gfgsc-green-400 transition-all duration-300
          "
        >
          <IoChevronBackOutline className="w-6 h-6 text-gfg-black" />
        </motion.button>

        {/* Page Numbers */}
        <AnimatePresence>
          {pageRange.map((page, index) => {
            if (page === '...') {
              return (
                <span 
                  key={`ellipsis-${index}`} 
                  className="px-2 text-gfg-black opacity-50"
                >
                  ...
                </span>
              );
            }
            
            return (
              <motion.button
                key={page}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onPageChange(page)}
                className={`
                  px-4 py-2 mx-1 rounded-full transition-all duration-300
                  ${currentPage === page
                    ? "bg-gfgsc-green text-white shadow-lg"
                    : "bg-gfgsc-green-200 text-gfg-black hover:bg-gfgsc-green-400"
                  }
                `}
              >
                {page}
              </motion.button>
            );
          })}
        </AnimatePresence>

        {/* Next Button */}
        <motion.button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          whileHover={{ 
            scale: 1.1, 
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.9 }}
          disabled={currentPage === totalPages}
          className="
            p-3 rounded-full bg-gfgsc-green-200 
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:bg-gfgsc-green-400 transition-all duration-300
          "
        >
          <IoChevronForwardOutline className="w-6 h-6 text-gfg-black" />
        </motion.button>
      </div>
    </div>
  );
};

export default LeaderboardPagination;