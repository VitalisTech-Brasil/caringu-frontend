import React from 'react';

const Pagination = ({
  currentPage,
  totalPages,
  itemsLength,
  onPageChange,
  onPrevious,
  onNext,
  maxVisible = 3
}) => {
  if (itemsLength === 0) return null;

  const getVisiblePages = () => {
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    // Ajustar se não temos páginas suficientes no final
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
      <div className="flex items-center justify-center gap-2.5 sm:gap-25 py-2 w-full h-auto">
      
      {/* Seta Esquerda */}
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`w-8 h-8 flex items-center justify-center rounded ${!canGoPrevious
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-gray-700 hover:bg-gray-200 cursor-pointer'
          }`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Números das páginas */}
      <div className="flex items-center gap-2">
        {visiblePages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`w-8 h-8 flex items-center justify-center rounded-full font-medium ${currentPage === pageNumber
              ? 'bg-[var(--laranja)] text-white'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      {/* Seta Direita */}
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`w-8 h-8 flex items-center justify-center rounded ${!canGoNext
          ? 'text-gray-400 cursor-not-allowed'
          : 'text-gray-700 hover:bg-gray-100 cursor-pointer'
          }`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;