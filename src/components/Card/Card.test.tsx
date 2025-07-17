import { render, screen } from '@testing-library/react';
import Card from './Card.tsx';
import type { IPokemon } from '../../utils/types';

describe('Card component', () => {
  const mockPokemon: IPokemon = {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
  };

  test('renders pokemon name and image', () => {
    render(<Card poke={mockPokemon} />);

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
    render(<Card poke={brokenData} />);
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
    render(<Card poke={brokenData} />);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
  });
});
