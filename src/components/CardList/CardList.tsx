import { Component } from 'react';
import Card from '../Card/Card.tsx';
import type { IPokemon } from '../../utils/types.ts';
import { getPokemonId } from '../../utils/getPokemonId.ts';

export default class CardList extends Component<{ data: IPokemon[] }> {
  render() {
    const { data } = this.props;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((poke) => (
          <Card key={getPokemonId(poke.url)} poke={poke} />
        ))}
      </div>
    );
  }
}
