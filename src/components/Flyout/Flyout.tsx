import { useRef } from 'react';
import { useSelectionStore } from '../../store/useSelectionStore';
import { downloadItemsAsCSV } from '../../utils/downloadItemsAsCSV';

export default function Flyout() {
  const { getSelectedArray, getSelectedCount, unselectAll } =
    useSelectionStore();

  const count = getSelectedCount();
  const items = getSelectedArray();
  const linkRef = useRef<HTMLAnchorElement>(null);

  if (count === 0) return null;

  const handleDownload = async () => {
    const url = await downloadItemsAsCSV(items);

    if (linkRef.current) {
      linkRef.current.href = url;
      linkRef.current.download = `${items.length}_items.csv`;
      linkRef.current.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-white dark:bg-gray-900 border-t p-4 flex items-center justify-between shadow-md">
      <span className="text-gray-800 dark:text-gray-200">
        {`${count} item${count > 1 ? 's' : ''} selected`}
      </span>
      <div className="flex gap-4">
        <button
          onClick={unselectAll}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Unselect all
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download
        </button>
      </div>
    </div>
  );
}
