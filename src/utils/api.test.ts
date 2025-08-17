import { fetchAllPokemon, fetchPokemonPage, fetchPokemonDetails } from './api';
import { URL_API } from './const';
import type { IPokemon, PokemonDetails } from './types';

global.fetch = jest.fn();

const mockResults: IPokemon[] = [
  { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
  { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
];

const mockDetails: PokemonDetails = {
  name: 'pikachu',
  height: 4,
  weight: 60,
  sprites: { front_default: 'pikachu.png' },
  types: [
    {
      slot: 1,
      type: {
        name: 'electric',
        url: 'https://pokeapi.co/api/v2/type/13/',
      },
    },
  ],
};

describe('API utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('fetchAllPokemon', () => {
    it('returns list of Pokémon on success', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ results: mockResults }),
      });

      const result = await fetchAllPokemon();
      expect(fetch).toHaveBeenCalledWith(URL_API);
      expect(result).toEqual(mockResults);
    });

    it('throws if response is not ok', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      (fetch as jest.Mock).mockResolvedValue({ ok: false, status: 500 });

      await expect(fetchAllPokemon()).rejects.toThrow(
        'HTTP error! status: 500'
      );
      consoleSpy.mockRestore();
    });

    it('throws if fetch fails', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      await expect(fetchAllPokemon()).rejects.toThrow('Network error');
    });
  });

  describe('fetchPokemonPage', () => {
    it('returns paginated Pokémon list', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ results: mockResults }),
      });

      const result = await fetchPokemonPage(2, 0);
      expect(fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon?limit=2&offset=0'
      );
      expect(result).toEqual(mockResults);
    });

    it('throws if response is not ok', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      (fetch as jest.Mock).mockResolvedValue({ ok: false, status: 404 });

      await expect(fetchPokemonPage(2, 0)).rejects.toThrow(
        'HTTP error! status: 404'
      );
      consoleSpy.mockRestore();
    });

    it('throws if fetch fails', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

      await expect(fetchPokemonPage(2, 0)).rejects.toThrow('Fetch failed');
    });
  });

  describe('fetchPokemonDetails', () => {
    it('returns Pokémon details by ID', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockDetails,
      });

      const result = await fetchPokemonDetails('pikachu');
      expect(fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/pikachu'
      );
      expect(result).toEqual(mockDetails);
    });

    it('throws if response is not ok', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      (fetch as jest.Mock).mockResolvedValue({ ok: false, status: 404 });

      await expect(fetchPokemonDetails('pikachu')).rejects.toThrow(
        'HTTP error! status: 404'
      );
      consoleSpy.mockRestore();
    });

    it('throws if fetch fails', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('Timeout'));

      await expect(fetchPokemonDetails('pikachu')).rejects.toThrow('Timeout');
    });
  });
});
