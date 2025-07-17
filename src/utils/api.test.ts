import { fetchAllPokemon } from './api';
import { URL_API } from './const';

global.fetch = jest.fn();

describe('fetchAllPokemon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns list of pokemon on successful response', async () => {
    const mockResults = [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    ];

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ results: mockResults }),
    });

    const result = await fetchAllPokemon();
    expect(fetch).toHaveBeenCalledWith(URL_API);
    expect(result).toEqual(mockResults);
  });

  it('throws an error when response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(fetchAllPokemon()).rejects.toThrow(
      'Server error (500): Internal Server Error'
    );
  });

  it('throws an error when fetch itself rejects', async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(fetchAllPokemon()).rejects.toThrow('Network error');
  });
});
