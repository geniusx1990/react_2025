import Card from '../Card/Card.tsx';
import type { IPokemon } from '../../utils/types.ts';
import { getPokemonId } from '../../utils/getPokemonId.ts';

export default function CardList({ data }: { data: IPokemon[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((poke) => {
        const id = getPokemonId(poke.url);
        return <Card key={id} poke={poke} />;
      })}
    </div>
  );
}
