import type { IPokemon } from '../../utils/types.ts';
import CardList from '../CardList/CardList.tsx';
import Skeleton from '../Skeleton/Skeleton.tsx';
import Loader from '../Loader/Loader.tsx';
import ErrorButton from '../ErrorButton/ErrorButton.tsx';

interface Props {
  data: IPokemon[];
  isLoading: boolean;
  error?: string | null;
}

export default function Main({ data, isLoading, error }: Props) {
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
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Results
        </h2>
        {content}
      </section>
      <div className="flex justify-end mt-4">
        <ErrorButton />
      </div>
    </main>
  );
}
