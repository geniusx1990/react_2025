'use client';

import SearchComponent from '@/components/pokemons/SearchComponent/SearchComponent';
import Main from '@/components/pokemons/Main/Main';
import Pagination from '@/components/pokemons/Pagination/Pagination';
import Flyout from '@/components/pokemons/Flyout/Flyout';
import DetailView from '@/components/pokemons/DetailView/DetailView';
import { useRouter, usePathname, Link } from '@/i18n/navigation';
import { usePokemonPageQuery, usePokemonSearchQuery } from '@/query/hooks';
import EntriesGrid from '@/components/EntriesGrid/EntriesGrid';

type IPokemon = { name: string; url: string };

export default function HomeClient({
  initialPage,
  limit,
  page,
  searchTerm,
  detailsId,
}: {
  initialPage: IPokemon[] | null;
  limit: number;
  page: number;
  searchTerm: string;
  detailsId: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const pageQuery = usePokemonPageQuery(limit, (page - 1) * limit);
  const searchQuery = usePokemonSearchQuery(searchTerm);

  const isSearching = !!searchTerm;
  const data = isSearching
    ? (searchQuery.data ?? [])
    : (pageQuery.data ?? initialPage ?? []);

  const isLoading = isSearching
    ? searchQuery.isPending || searchQuery.isFetching
    : (pageQuery.isPending && !initialPage) || pageQuery.isFetching;

  const error = (
    isSearching ? searchQuery.error : pageQuery.error
  ) as Error | null;

  const setQuery = (q: Record<string, string | undefined>) => {
    const p = new URLSearchParams(
      typeof window !== 'undefined' ? window.location.search : ''
    );
    Object.entries(q).forEach(([k, v]) => (v ? p.set(k, v) : p.delete(k)));
    router.replace(`${pathname}?${p.toString()}`);
  };

  const totalPages = !isSearching ? Math.ceil(1302 / limit) : 1;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <SearchComponent
        searchTerm={searchTerm}
        onSearch={(term) => {
          setQuery({
            search: term || undefined,
            page: '1',
            details: undefined,
          });
        }}
      />

      <div className="relative">
        <EntriesGrid />
        <Main
          data={data}
          isLoading={isLoading}
          error={error ? error.message : null}
          isRefreshing={
            isSearching ? searchQuery.isFetching : pageQuery.isFetching
          }
          onRefresh={() => {
            if (isSearching) searchQuery.refetch();
            else pageQuery.refetch();
          }}
        />

        {detailsId && (
          <div
            className="absolute top-0 right-0 h-full w-full md:w-[380px] z-10
                       bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700
                       shadow-lg transition-transform duration-300 ease-in-out translate-x-0"
          >
            <Link
              href={{
                pathname,
                query: { search: searchTerm || undefined, page: String(page) },
              }}
              className="absolute top-2 right-2 text-xl text-red-500 dark:text-red-400"
              aria-label="Close details"
            >
              ✖
            </Link>

            <DetailView />
          </div>
        )}
      </div>

      {!isSearching && !isLoading && !error && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(next) => setQuery({ page: String(next) })}
        />
      )}

      <Flyout />
    </div>
  );
}
