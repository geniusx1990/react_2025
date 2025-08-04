import SearchComponent from '../../components/SearchComponent/SearchComponent.tsx';
import Main from '../../components/Main/Main.tsx';
import { fetchAllPokemon, fetchPokemonPage } from '../../utils/api.ts';
import type { IPokemon } from '../../utils/types.ts';
import { useCallback } from 'react';
import { Outlet, useSearchParams } from 'react-router';
import { useLocalStorage } from '../../Hooks/useLocalStorage.ts';
import Pagination from '../../components/Pagination/Pagination.tsx';
import { useFetchData } from '../../Hooks/useFetchData.ts';
import Flyout from '../../components/Flyout/Flyout.tsx';

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [storedSearch, setStoredSearch] = useLocalStorage('searchTerm', '');

  const limit = 8;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const offset = (page - 1) * limit;

  const search = searchParams.get('search') ?? storedSearch;

  const totalPages = search ? 1 : Math.ceil(1302 / limit);

  const fetcher = useCallback(() => {
    return search
      ? fetchAllPokemon().then((data) =>
          data.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
          )
        )
      : fetchPokemonPage(limit, offset);
  }, [search, limit, offset]);

  const {
    data: pokemonList,
    isLoading,
    error,
  } = useFetchData<IPokemon[]>(fetcher);

  const handleSearch = (term: string) => {
    setStoredSearch(term);
    setSearchParams((current) => {
      const params = new URLSearchParams(current);
      if (term) {
        params.set('search', term);
      } else {
        params.delete('search');
      }
      params.set('page', '1');
      return params;
    });
  };

  const handleLoadPage = (nextPage: number) => {
    setSearchParams((current) => {
      const params = new URLSearchParams(current);
      params.set('page', nextPage.toString());
      return params;
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <SearchComponent searchTerm={search} onSearch={handleSearch} />

      <div className="relative">
        <Main data={pokemonList ?? []} isLoading={isLoading} error={error} />

        {searchParams.get('details') && (
          <div
            className={`
      absolute top-0 right-0 h-full w-full md:w-[380px] z-10
      bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700
      shadow-lg transition-transform duration-300 ease-in-out
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

      <Flyout />
    </div>
  );
}
