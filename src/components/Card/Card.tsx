import { getPokemonId } from '../../utils/getPokemonId.ts';
import { IPokemon } from '../../utils/types.ts';
import { useSearchParams } from 'react-router';

export default function Card({ poke }: { poke: IPokemon }) {
  const { name, url } = poke;
  const id = getPokemonId(url);
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = () => {
    searchParams.set('details', id);
    setSearchParams(searchParams);
  };

  return (
    <div
      className="border rounded p-4 shadow bg-white text-center mt-4 cursor-pointer hover:bg-gray-100"
      onClick={handleClick}
    >
      <h3 className="text-xl font-bold mb-2 capitalize">{name}</h3>
      <img src={imgUrl} alt={name} className="mx-auto w-20 h-20" />
    </div>
  );
}
