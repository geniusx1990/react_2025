import { fireEvent, render, screen } from '@testing-library/react';
import Main from './Main';
import type { IPokemon } from '../../utils/types';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { FallbackUi } from '../FallbackUI/FallbackUi';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

describe('Main component', () => {
  const mockData: IPokemon[] = [
    { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
  ];

  function renderWithProviders(
    ui: React.ReactElement,
    { withRouter = false } = {}
  ) {
    const qc = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const tree = (
      <QueryClientProvider client={qc}>
        {withRouter ? <MemoryRouter>{ui}</MemoryRouter> : ui}
      </QueryClientProvider>
    );
    return render(tree);
  }

  test('renders cards when data is provided', () => {
    renderWithProviders(
      <Main
        data={mockData}
        isLoading={false}
        isRefreshing={false}
        error={null}
      />,
      { withRouter: true }
    );
    expect(screen.getByText(/squirtle/i)).toBeInTheDocument();
  });

  test('displays "no results" when data is empty', () => {
    renderWithProviders(
      <Main data={[]} isLoading={false} isRefreshing={false} error={null} />
    );
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  test('shows spinner when loading', () => {
    renderWithProviders(
      <Main data={[]} isLoading={true} isRefreshing={false} error={null} />
    );
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  test('shows error message', () => {
    renderWithProviders(
      <Main
        data={[]}
        isLoading={false}
        isRefreshing={false}
        error="Failed to fetch"
      />
    );
    expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
  });

  test('shows "Refreshing…" label when isRefreshing=true', () => {
    renderWithProviders(
      <Main
        data={mockData}
        isLoading={false}
        isRefreshing={true}
        error={null}
      />,
      { withRouter: true }
    );
    expect(screen.getByText(/refreshing/i)).toBeInTheDocument();
  });
});

describe('Main component error button integration', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('triggers fallback UI when error button throws', () => {
    const qc = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    render(
      <QueryClientProvider client={qc}>
        <ErrorBoundary fallback={<FallbackUi />}>
          <Main data={[]} isLoading={false} isRefreshing={false} />
        </ErrorBoundary>
      </QueryClientProvider>
    );

    const errorBtn = screen.getByRole('button', { name: /throw error/i });
    fireEvent.click(errorBtn);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
