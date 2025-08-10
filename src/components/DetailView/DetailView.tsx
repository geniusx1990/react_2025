import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { usePokemonDetailsQuery } from '../../query/hooks.ts';
import Loader from '../Loader/Loader.tsx';

export default function DetailView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawId = searchParams.get('details');
  const id = rawId ?? '';

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const next = new URLSearchParams(searchParams);
        next.delete('details');
        setSearchParams(next);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [searchParams, setSearchParams]);

  const { data, isPending, isFetching, error, refetch } =
    usePokemonDetailsQuery(id);

  if (!id) return null;

  if (isPending) return <Loader />;

  if (error || !data) {
    return (
      <div className="text-center text-red-500 dark:text-red-400 p-4">
        Pokemon not found.
        <button className="ml-2 underline" onClick={() => refetch()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="relative h-full p-4 md:p-6 overflow-y-auto transition-colors">
      <button
        className="absolute top-2 right-2 text-xl text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
        onClick={() => {
          const next = new URLSearchParams(searchParams);
          next.delete('details');
          setSearchParams(next);
        }}
      >
        ✖
      </button>

      <div className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-xl shadow-md p-4 space-y-4 h-full transition-colors">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold capitalize">{data.name}</h2>
          {isFetching ? (
            <span className="text-sm opacity-70">Refreshing…</span>
          ) : null}
        </div>

        <div className="flex justify-center">
          <img
            src={data.sprites.front_default}
            alt={data.name}
            className="w-32 h-32 object-contain"
          />
        </div>

        <div className="space-y-2 text-gray-700 dark:text-gray-300">
          <p>
            <strong>Height:</strong> {data.height}
          </p>
          <p>
            <strong>Weight:</strong> {data.weight}
          </p>
          <p>
            <strong>Types:</strong>{' '}
            {data.types.map((t) => t.type.name).join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
}
