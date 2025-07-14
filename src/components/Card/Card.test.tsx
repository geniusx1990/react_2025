import { render, screen } from '@testing-library/react';
import Card from './Card.tsx';
import type { IPokemon } from '../../utils/types';

describe('Card component', () => {
  const mockPokemon: IPokemon = {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
  };

  it('renders pokemon name and image', () => {
    render(<Card poke={mockPokemon} />);

    const nameElement = screen.getByText(/pikachu/i);
    expect(nameElement).toBeInTheDocument();

    const imgElement = screen.getByRole('img', { name: /pikachu/i });
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute(
      'src',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
    );
  });
});
