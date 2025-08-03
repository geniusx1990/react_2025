import { downloadItemsAsCSV } from './downloadItemsAsCSV';
import { SelectedItem } from '../store/useSelectionStore';
import { PokemonDetails } from './types';

global.fetch = jest.fn();
global.URL.createObjectURL = jest.fn(() => 'blob:mocked-url');

describe('downloadItemsAsCSV', () => {
  const items: SelectedItem[] = [
    {
      id: '1',
      name: 'Pikachu',
      description: 'Electric mouse',
      detailsUrl: 'https://pokeapi.co/api/v2/pokemon/pikachu',
    },
  ];

  const details: PokemonDetails = {
    name: 'pikachu',
    height: 4,
    weight: 60,
    sprites: {
      front_default: '',
    },
    types: [{ slot: 1, type: { name: 'electric', url: '' } }],
  };

  beforeEach(() => {
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(details),
    });
  });

  it('returns a blob URL string', async () => {
    const url = await downloadItemsAsCSV(items);
    expect(typeof url).toBe('string');
    expect(url).toBe('blob:mocked-url');
  });

  it('calls fetch with correct detailsUrl', async () => {
    await downloadItemsAsCSV(items);
    expect(fetch).toHaveBeenCalledWith(items[0].detailsUrl);
  });
});
