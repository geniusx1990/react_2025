import { fireEvent, render, screen } from '@testing-library/react';
import Main from './Main.tsx';
import type { IPokemon } from '../../utils/types';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary.tsx';
import { FallbackUi } from '../FallbackUI/FallbackUi.tsx';
import { MemoryRouter } from 'react-router';

describe('Main component', () => {
  const mockData: IPokemon[] = [
    { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
  ];

  test('renders cards when data is provided', () => {
    render(
      <MemoryRouter>
        <Main data={mockData} isLoading={false} error={null} />
      </MemoryRouter>
    );
    expect(screen.getByText(/squirtle/i)).toBeInTheDocument();
  });

  test('displays "no results" when data is empty', () => {
    render(<Main data={[]} isLoading={false} error={null} />);
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  test('shows spinner when loading', () => {
    render(<Main data={[]} isLoading={true} error={null} />);
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  test('shows error message', () => {
    render(<Main data={[]} isLoading={false} error="Failed to fetch" />);
    expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
  });
});

describe('Main component error button integration', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {}); // подавляем ошибки в консоли
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('triggers fallback UI when error button throws', () => {
    render(
      <ErrorBoundary fallback={<FallbackUi />}>
        <Main data={[]} isLoading={false} />
      </ErrorBoundary>
    );

    const errorBtn = screen.getByRole('button', { name: /throw error/i });
    fireEvent.click(errorBtn);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
