import { Component } from 'react';
import type { IPokemon } from '../../src/utils/types.ts';
import { getPokemonId } from '../../src/utils/getPokemonId.ts';
export default class Card extends Component<{ poke: IPokemon }> {
  render() {
    const { name, url } = this.props.poke;
    const id = getPokemonId(url);
    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return (
      <div className="border rounded p-4 shadow bg-white text-center mt-4">
        <h3 className="text-xl font-bold mb-2 capitalize">{name}</h3>
        <img src={imgUrl} alt={name} className="mx-auto w-20 h-20" />
      </div>
    );
  }
}
