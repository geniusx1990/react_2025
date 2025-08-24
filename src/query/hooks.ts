import {
  useQuery,
  useQueryClient,
  queryOptions,
  keepPreviousData,
} from '@tanstack/react-query';
import {
  fetchAllPokemon,
  fetchPokemonPage,
  fetchPokemonDetails,
} from '@/utils/api';
import type { IPokemon, PokemonDetails } from '@/utils/types';

export function usePokemonPageQuery(limit: number, offset: number) {
  return useQuery<IPokemon[]>({
    queryKey: ['pokemon', 'page', { limit, offset }],
    queryFn: () => fetchPokemonPage(limit, offset),
    placeholderData: keepPreviousData,
  });
}

export function usePokemonSearchQuery(term: string) {
  return useQuery<IPokemon[]>({
    queryKey: ['pokemon', 'search', term],
    queryFn: async () => {
      const all = await fetchAllPokemon();
      const t = term.toLowerCase();
      return all.filter((p) => p.name.toLowerCase().includes(t));
    },
    enabled: !!term,
    placeholderData: keepPreviousData,
  });
}

export function usePokemonDetailsQuery(id: string) {
  return useQuery<PokemonDetails>({
    queryKey: ['pokemon', 'details', id],
    queryFn: () => fetchPokemonDetails(id),
    enabled: !!id,
  });
}

export function usePrefetchPokemonDetails() {
  const qc = useQueryClient();
  return (id: string) =>
    qc.ensureQueryData(
      queryOptions({
        queryKey: ['pokemon', 'details', id],
        queryFn: () => fetchPokemonDetails(id),
      })
    );
}
