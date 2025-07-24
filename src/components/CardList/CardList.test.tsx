import { render, screen } from '@testing-library/react';
import CardList from './CardList.tsx';
import type { IPokemon } from '../../utils/types.ts';

jest.mock('../Card/Card.tsx', () => ({
  __esModule: true,
  default: ({ poke }: { poke: IPokemon }) => <div>{poke.name}</div>,
}));

describe('CardList component', () => {
  const mockData: IPokemon[] = [
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
  ];

  test('renders a Card component for each pokemon', () => {
    render(<CardList data={mockData} />);

    mockData.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    });
  });

  test('renders nothing when data is empty array', () => {
    render(<CardList data={[]} />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
});
