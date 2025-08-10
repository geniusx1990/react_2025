import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import DetailView from './DetailView';
import { act } from 'react';
import { PokemonDetails } from '../../utils/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

global.fetch = jest.fn();

const mockPokemon: PokemonDetails = {
  name: 'pikachu',
  height: 4,
  weight: 60,
  sprites: { front_default: 'pikachu.png' },
  types: [
    {
      slot: 1,
      type: { name: 'electric', url: 'https://pokeapi.co/api/v2/type/13/' },
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

// 👇 helper прямо в этом файле
function renderDetail(route = '/?details=pikachu') {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={[route]}>
        <DetailView />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe('DetailView', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('shows loader while fetching', () => {
    // промис не резолвится — остается pending
    (fetch as jest.Mock).mockReturnValue(new Promise(() => {}));

    renderDetail('/?details=1');

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('shows error message if fetch fails', async () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    mockFetchError();

    renderDetail('/?details=10000');

    await waitFor(() =>
      expect(screen.getByText(/pokemon not found/i)).toBeInTheDocument()
    );

    consoleSpy.mockRestore();
  });

  test('renders pokemon details on successful fetch', async () => {
    mockFetchSuccess(mockPokemon);

    renderDetail('/?details=pikachu');

    expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/height:/i)).toBeInTheDocument();
    expect(screen.getByAltText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/electric/i)).toBeInTheDocument();
  });

  test('removes pokemon details on Escape key press', async () => {
    mockFetchSuccess(mockPokemon);

    renderDetail('/?details=pikachu');

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

    renderDetail('/?details=pikachu');

    expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: '✖' });
    fireEvent.click(closeBtn);

    await waitFor(() =>
      expect(screen.queryByText(/pikachu/i)).not.toBeInTheDocument()
    );
  });
});
