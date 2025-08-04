import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import DetailView from './DetailView';
import { act } from 'react';
import { PokemonDetails } from '../../utils/types.ts';

global.fetch = jest.fn();
const mockPokemon: PokemonDetails = {
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

function mockFetchSuccess(data: PokemonDetails) {
  (fetch as jest.Mock).mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => data,
  });
}

function mockFetchError(message = 'Network error') {
  (fetch as jest.Mock).mockRejectedValue(new Error(message));
}

describe('DetailView', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('shows loader while fetching', () => {
    (fetch as jest.Mock).mockReturnValue(new Promise(() => {}));

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <DetailView />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('shows error message if fetch fails', async () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    mockFetchError();

    render(
      <MemoryRouter initialEntries={['/?details=10000']}>
        <DetailView />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Pokemon not found/i)).toBeInTheDocument()
    );

    consoleSpy.mockRestore();
  });

  test('renders pokemon details on successful fetch', async () => {
    mockFetchSuccess(mockPokemon);

    render(
      <MemoryRouter initialEntries={['/?details=pikachu']}>
        <DetailView />
      </MemoryRouter>
    );

    expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/Height:/)).toBeInTheDocument();
    expect(screen.getByAltText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/electric/)).toBeInTheDocument();
  });

  test('removes pokemon details on Escape key press', async () => {
    mockFetchSuccess(mockPokemon);

    render(
      <MemoryRouter initialEntries={['/?details=pikachu']}>
        <DetailView />
      </MemoryRouter>
    );

    expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();

    await act(async () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });

    await waitFor(() =>
      expect(screen.queryByText(/pikachu/i)).not.toBeInTheDocument()
    );
  });

  test('removes pokemon details when close button is clicked', async () => {
    mockFetchSuccess(mockPokemon);

    render(
      <MemoryRouter initialEntries={['/?details=pikachu']}>
        <DetailView />
      </MemoryRouter>
    );

    expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: '✖' });
    fireEvent.click(closeBtn);

    await waitFor(() =>
      expect(screen.queryByText(/pikachu/i)).not.toBeInTheDocument()
    );
  });
});
