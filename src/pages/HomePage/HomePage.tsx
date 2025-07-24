import Header from '../../components/Header/Header.tsx';
import Main from '../../components/Main/Main.tsx';
import { fetchAllPokemon, fetchPokemonPage } from '../../utils/api.ts';
import type { IPokemon } from '../../utils/types.ts';
import { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router';
import { useLocalStorage } from '../../Hooks/useLocalStorage.ts';
import Pagination from '../../components/Pagination/Pagination.tsx';

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [storedSearch, setStoredSearch] = useLocalStorage('searchTerm', '');

  const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const limit = 8;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const offset = (page - 1) * limit;

  const search = searchParams.get('search') ?? storedSearch;

  const totalPages = search ? 1 : Math.ceil(1302 / limit);

  const handleSearch = (term: string) => {
    setStoredSearch(term);
    searchParams.set('search', term);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handleLoadPage = (nextPage: number) => {
    searchParams.set('page', nextPage.toString());
    setSearchParams(searchParams);
  };

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const data = search
          ? await fetchAllPokemon()
          : await fetchPokemonPage(limit, offset);

        const filteredData = search
          ? data.filter((p) =>
              p.name.toLowerCase().includes(search.toLowerCase())
            )
          : data;

        setPokemonList(filteredData);
        setIsLoading(false);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Internal Server Error');
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, [offset, search]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Header searchTerm={search} onSearch={handleSearch} />

      <div className="relative">
        <Main data={pokemonList} isLoading={isLoading} error={error} />

        {searchParams.get('details') && (
          <div
            className={`
      absolute top-0 right-0 h-full w-full md:w-[380px] z-10
      bg-white border-l shadow-lg transition-transform duration-300 ease-in-out
      translate-x-0
    `}
          >
            <Outlet />
          </div>
        )}
      </div>

      {!search && !isLoading && !error && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handleLoadPage}
        />
      )}
    </div>
  );
}
