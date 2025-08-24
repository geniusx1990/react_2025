interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxPagesToShow?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxPagesToShow = 5,
}: PaginationProps) {
  const pages = [];

  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  for (let i = startPage; i <= endPage; i++) {
    const isActive = i === currentPage;

    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`px-3 py-1 rounded border transition-colors duration-200
          ${
            isActive
              ? 'bg-blue-600 text-white font-bold border-blue-600'
              : 'bg-white text-blue-600 border-gray-300 hover:bg-blue-100 dark:bg-gray-800 dark:text-blue-400 dark:border-gray-600 dark:hover:bg-gray-700'
          }
        `}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 mt-4 justify-center">{pages}</div>
  );
}
