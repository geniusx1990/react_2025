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
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`px-3 py-1 rounded border ${
          i === currentPage
            ? 'bg-blue-600 text-white font-bold'
            : 'bg-white text-blue-600 hover:bg-blue-100'
        }`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 mt-4 justify-center">{pages}</div>
  );
}
