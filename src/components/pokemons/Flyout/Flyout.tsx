'use client';
import { useSelectionStore } from '@/store/useSelectionStore';

export default function Flyout() {
  const { getSelectedArray, getSelectedCount, unselectAll } =
    useSelectionStore();
  const count = getSelectedCount();
  const items = getSelectedArray();
  if (count === 0) return null;

  const handleDownload = async () => {
    const res = await fetch('/api/csv', {
      method: 'POST',
      body: JSON.stringify(items),
      headers: { 'Content-Type': 'application/json' },
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${items.length}_items.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-white dark:bg-gray-900 border-t p-4 flex items-center justify-between shadow-md">
      <span>{`${count} item${count > 1 ? 's' : ''} selected`}</span>
      <div className="flex gap-4">
        <button
          onClick={unselectAll}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded"
        >
          Unselect all
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Download
        </button>
      </div>
    </div>
  );
}
