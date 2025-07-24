import { URL_API } from './const.ts';
import type { IPokemon } from './types.ts';

export const fetchAllPokemon = async (): Promise<IPokemon[]> => {
  const response = await fetch(URL_API);

  if (!response.ok) {
    throw new Error(
      `Server error (${response.status}): ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.results;
};

export async function fetchPokemonPage(
  limit: number,
  offset: number
): Promise<IPokemon[]> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const data = await res.json();
  return data.results;
}
