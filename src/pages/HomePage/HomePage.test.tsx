import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from './HomePage';
import * as api from '../../utils/api';
import { MemoryRouter } from 'react-router';

const mockData = [
  { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
  { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
];

describe('HomePage', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: mockData }),
    });
    jest.spyOn(api, 'fetchAllPokemon').mockResolvedValue(mockData);
    console.error = jest.fn();
  });

  describe('Initial Mount Behavior', () => {
    test('displays previously saved search term from localStorage', async () => {
      localStorage.setItem('searchTerm', 'bulbasaur');
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
      const input = await screen.findByPlaceholderText('Search Input Field');
      expect(input).toHaveValue('bulbasaur');
    });

    test('shows empty input if no localStorage value exists', async () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
      const input = await screen.findByPlaceholderText('Search Input Field');
      expect(input).toHaveValue('');
    });

    test('calls API once on mount', async () => {
      const spy = jest.spyOn(api, 'fetchPokemonPage');
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
      await waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Search Functionality', () => {
    test('updates input value when typing', async () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
      const input = await screen.findByPlaceholderText('Search Input Field');
      fireEvent.change(input, { target: { value: 'abc' } });
      expect(input).toHaveValue('abc');
    });

    test('saves search term to localStorage on search', async () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
      const input = await screen.findByPlaceholderText('Search Input Field');
      const button = screen.getByRole('button', { name: /search/i });

      fireEvent.change(input, { target: { value: 'bulba' } });
      fireEvent.click(button);

      expect(localStorage.getItem('searchTerm')).toBe('bulba');
    });

    test('filters results based on search input', async () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
      const input = await screen.findByPlaceholderText('Search Input Field');
      const button = screen.getByRole('button', { name: /search/i });

      fireEvent.change(input, { target: { value: 'iv' } });
      fireEvent.click(button);

      const result = await screen.findByText(/ivysaur/i);
      expect(result).toBeInTheDocument();

      expect(screen.queryByText(/bulbasaur/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/venusaur/i)).not.toBeInTheDocument();
    });

    test('overwrites existing localStorage value on new search', async () => {
      localStorage.setItem('searchTerm', 'oldterm');
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
      const input = await screen.findByPlaceholderText('Search Input Field');
      const button = screen.getByRole('button', { name: /search/i });

      fireEvent.change(input, { target: { value: 'newterm' } });
      fireEvent.click(button);

      await waitFor(() => {
        expect(localStorage.getItem('searchTerm')).toBe('newterm');
      });
    });
  });

  describe('API Error Handling', () => {
    test('displays error message on 500', async () => {
      localStorage.setItem('searchTerm', 'bulba');
      jest.spyOn(api, 'fetchAllPokemon').mockRejectedValueOnce({
        message: 'Internal Server Error',
      });
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
      const error = await screen.findByText(/internal server error/i);
      expect(error).toBeInTheDocument();
    });

    test('displays error message on 404', async () => {
      localStorage.setItem('searchTerm', 'bulba');
      jest
        .spyOn(api, 'fetchAllPokemon')
        .mockRejectedValueOnce(new Error('Not Found'));
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
      const error = await screen.findByText(/not found/i);
      expect(error).toBeInTheDocument();
    });
  });
});
