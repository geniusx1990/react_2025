import { URL_API } from './const.ts';
import type { IPokemon, PokemonDetails } from './types.ts';

export const fetchAllPokemon = async (): Promise<IPokemon[]> => {
  try {
    const response = await fetch(URL_API);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('An error occurred during data fetching:', error);
    throw error;
  }
};

export const fetchPokemonPage = async (
  limit: number,
  offset: number
): Promise<IPokemon[]> => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('An error occurred during data fetching:', error);
    throw error;
  }
};

export const fetchPokemonDetails = async (
  id: string
): Promise<PokemonDetails> => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch Pokemon details for ID ${id}:`, error);
    throw error;
  }
};
