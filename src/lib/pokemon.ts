export type IPokemon = { name: string; url: string };

const BASE = 'https://pokeapi.co/api/v2';

export async function fetchPokemonPage(limit: number, offset: number) {
  const res = await fetch(`${BASE}/pokemon?limit=${limit}&offset=${offset}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to load page');
  const data = await res.json();
  return data.results as IPokemon[];
}

export async function fetchPokemonDetails(id: string) {
  const res = await fetch(`${BASE}/pokemon/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Not found');
  return res.json();
}
