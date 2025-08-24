import Card from '@/components/pokemons/Card/Card';
import type { IPokemon } from '@/utils/types';
import { getPokemonId } from '@/utils/getPokemonId';

export default function CardList({ data }: { data: IPokemon[] }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg transition-colors">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((poke) => {
          const id = getPokemonId(poke.url);
          return <Card key={id} poke={poke} />;
        })}
      </div>
    </div>
  );
}
