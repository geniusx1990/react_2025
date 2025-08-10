import { fireEvent, render, screen } from '@testing-library/react';
import Card from './Card';
import type { IPokemon } from '../../utils/types';
import { MemoryRouter } from 'react-router';
import * as ReactRouter from 'react-router';
import { useSelectionStore } from '../../store/useSelectionStore.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

jest.mock('../../store/useSelectionStore.ts', () => ({
  useSelectionStore: jest.fn(),
}));

jest.mock('../../query/hooks.ts', () => {
  const mockPrefetch = jest.fn(() => Promise.resolve());
  return {
    usePrefetchPokemonDetails: () => mockPrefetch,
  };
});

const mockedStore = useSelectionStore as unknown as jest.MockedFunction<
  typeof useSelectionStore
>;

const setSearchParams = jest.fn();
jest
  .spyOn(ReactRouter, 'useSearchParams')
  .mockReturnValue([new URLSearchParams(), setSearchParams]);

function renderWithProviders(ui: React.ReactElement) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  );
}

describe('Card component', () => {
  const mockPokemon: IPokemon = {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders pokemon name and image', () => {
    mockedStore.mockReturnValue({ selected: {}, toggleItem: jest.fn() });

    renderWithProviders(<Card poke={mockPokemon} />);

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /pikachu/i })).toHaveAttribute(
      'src',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
    );
  });

  test('handles missing props gracefully', () => {
    mockedStore.mockReturnValue({ selected: {}, toggleItem: jest.fn() });

    const brokenData = { name: 'unknown', url: '' } as IPokemon;
    renderWithProviders(<Card poke={brokenData} />);

    expect(screen.getByText(/unknown/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      expect.stringContaining('/pokemon/undefined.png')
    );
  });

  test('does not crash when name is undefined', () => {
    mockedStore.mockReturnValue({ selected: {}, toggleItem: jest.fn() });

    const brokenData = {
      name: undefined,
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
    } as unknown as IPokemon;

    renderWithProviders(<Card poke={brokenData} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  test('calls setSearchParams when card is clicked', () => {
    mockedStore.mockReturnValue({ selected: {}, toggleItem: jest.fn() });

    renderWithProviders(<Card poke={mockPokemon} />);

    const card = screen.getByRole('img').closest('div');
    expect(card).not.toBeNull();
    if (card) fireEvent.click(card);

    expect(setSearchParams).toHaveBeenCalledWith(expect.any(URLSearchParams));
  });

  test('calls toggleItem when checkbox is clicked', () => {
    const toggleItemMock = jest.fn();
    mockedStore.mockReturnValue({ selected: {}, toggleItem: toggleItemMock });

    renderWithProviders(<Card poke={mockPokemon} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(toggleItemMock).toHaveBeenCalledWith({
      id: '25',
      name: 'pikachu',
      description: 'Pokemon pikachu',
      detailsUrl: 'https://pokeapi.co/api/v2/pokemon/25/',
    });
  });

  test('checkbox is checked if item is selected', () => {
    mockedStore.mockReturnValue({
      selected: {
        '25': {
          id: '25',
          name: 'pikachu',
          description: 'Pokemon pikachu',
          detailsUrl: 'https://pokeapi.co/api/v2/pokemon/25/',
        },
      },
      toggleItem: jest.fn(),
    });

    renderWithProviders(<Card poke={mockPokemon} />);

    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});
