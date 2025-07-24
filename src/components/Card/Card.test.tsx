import { render, screen } from '@testing-library/react';
import Card from './Card.tsx';
import type { IPokemon } from '../../utils/types';
import { MemoryRouter } from 'react-router';

describe('Card component', () => {
  const mockPokemon: IPokemon = {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
  };

  test('renders pokemon name and image', () => {
    render(
      <MemoryRouter>
        <Card poke={mockPokemon} />
      </MemoryRouter>
    );

    const nameElement = screen.getByText(/pikachu/i);
    const imgElement = screen.getByRole('img', { name: /pikachu/i });
    expect(nameElement).toBeInTheDocument();

    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute(
      'src',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
    );
  });

  test('handles missing props gracefully', () => {
    const brokenData = { name: 'unknown', url: '' } as IPokemon;
    render(
      <MemoryRouter>
        <Card poke={brokenData} />
      </MemoryRouter>
    );
    expect(screen.getByText(/unknown/i)).toBeInTheDocument();
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute(
      'src',
      expect.stringContaining('/pokemon/undefined.png')
    );
  });

  test('does not crash when name is undefined', () => {
    const brokenData = {
      name: undefined,
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
    } as unknown as IPokemon;
    render(
      <MemoryRouter>
        <Card poke={brokenData} />
      </MemoryRouter>
    );
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
  });
});
