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
