import { getPokemonId } from '../../utils/getPokemonId.ts';
import { IPokemon } from '../../utils/types.ts';
import { useSearchParams } from 'react-router';
import { ChangeEvent } from 'react';
import { useSelectionStore } from '../../store/useSelectionStore.ts';
import { usePrefetchPokemonDetails } from '../../query/hooks.ts';

export default function Card({ poke }: { poke: IPokemon }) {
  const { name, url } = poke;
  const id = getPokemonId(url);
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  const prefetchDetails = usePrefetchPokemonDetails();

  const [searchParams, setSearchParams] = useSearchParams();

  const { selected, toggleItem } = useSelectionStore();
  const isSelected = !!selected[id];

  const handleClick = () => {
    searchParams.set('details', id);
    setSearchParams(searchParams);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const checked = e.target.checked;
    toggleItem({
      id,
      name,
      description: `Pokemon ${name}`,
      detailsUrl: url,
    });

    if (checked) {
      prefetchDetails(id).catch((err) => {
        console.error('Prefetch failed', err);
      });
    }
  };

  return (
    <div
      className="relative border rounded p-4 shadow bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700 text-center mt-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      onClick={handleClick}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
        aria-label={`Select ${name}`}
        className="absolute top-2 left-2 w-4 h-4 cursor-pointer"
      />
      <h3 className="text-xl font-bold mb-2 capitalize">{name}</h3>
      <img src={imgUrl} alt={name} className="mx-auto w-20 h-20" />
    </div>
  );
}
