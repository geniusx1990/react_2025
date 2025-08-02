import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import Loader from '../Loader/Loader.tsx';
import { PokemonDetails } from '../../utils/types.ts';
import { useFetchData } from '../../Hooks/useFetchData.ts';
import { fetchPokemonDetails } from '../../utils/api.ts';

export default function DetailView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('details');

  const fetchFn = useCallback(() => {
    if (!id) return Promise.reject(new Error('No ID provided'));
    return fetchPokemonDetails(id);
  }, [id]);

  const { data, isLoading, error } = useFetchData<PokemonDetails>(fetchFn);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        searchParams.delete('details');
        setSearchParams(searchParams);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [searchParams, setSearchParams]);

  if (!id) return null;
  if (isLoading) return <Loader />;
  if (error || !data)
    return <div className="text-center text-red-500">Pokemon not found.</div>;

  return (
    <div className="relative h-full p-4 md:p-6 overflow-y-auto">
      <button
        className="absolute top-2 right-2 text-xl text-red-500 hover:text-red-700"
        onClick={() => {
          searchParams.delete('details');
          setSearchParams(searchParams);
        }}
      >
        ✖
      </button>

      <div className="bg-gray-100 rounded-xl shadow-md p-4 space-y-4 h-full">
        <h2 className="text-2xl font-bold capitalize text-center">
          {data.name}
        </h2>

        <div className="flex justify-center">
          <img
            src={data.sprites.front_default}
            alt={data.name}
            className="w-32 h-32 object-contain"
          />
        </div>

        <div className="space-y-2 text-gray-700">
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
