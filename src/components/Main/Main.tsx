import type { IPokemon } from '../../utils/types.ts';
import CardList from '../CardList/CardList.tsx';
import Skeleton from '../Skeleton/Skeleton.tsx';
import Loader from '../Loader/Loader.tsx';
import ErrorButton from '../ErrorButton/ErrorButton.tsx';

interface Props {
  data: IPokemon[];
  isLoading: boolean;
  isRefreshing: boolean;
  error?: string | null;
  onRefresh?: () => void;
}

export default function Main({
  data,
  isLoading,
  error,
  isRefreshing,
  onRefresh,
}: Props) {
  let content;

  if (error) {
    content = (
      <div className="text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900 p-4 rounded text-center transition-colors">
        {error}
      </div>
    );
  } else if (isLoading) {
    content = (
      <div className="flex flex-col items-center gap-4">
        <Skeleton />
        <Loader />
      </div>
    );
  } else if (data.length === 0) {
    content = (
      <div className="text-center text-gray-600 dark:text-gray-300 py-8 transition-colors">
        No results found.
      </div>
    );
  } else {
    content = <CardList data={data} />;
  }

  return (
    <main className="relative bg-red-400 dark:bg-gray-950 rounded-lg p-4 shadow-sm overflow-hidden transition-colors duration-300">
      <section className="bg-white dark:bg-gray-900 p-4 rounded shadow transition-colors duration-300">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Results
          </h2>
          <div className="flex items-center gap-2">
            {isRefreshing ? (
              <span className="text-sm opacity-70">Refreshing…</span>
            ) : null}
            <button
              type="button"
              onClick={onRefresh}
              className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors"
              title="Refresh (invalidate cache)"
            >
              Refresh
            </button>
          </div>
        </div>
        {content}
      </section>
      <div className="flex justify-end mt-4">
        <ErrorButton />
      </div>
    </main>
  );
}
