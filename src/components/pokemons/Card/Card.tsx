'use client';
import Image from 'next/image';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useSelectionStore } from '@/store/useSelectionStore';
import { usePrefetchPokemonDetails } from '@/query/hooks';
import { getPokemonId } from '@/utils/getPokemonId';

export default function Card({
  poke,
}: {
  poke: { name: string; url: string };
}) {
  const { name, url } = poke;
  const id = getPokemonId(url);
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  const router = useRouter();
  const pathname = usePathname();
  const { selected, toggleItem } = useSelectionStore();
  const isSelected = !!selected[id];
  const prefetchDetails = usePrefetchPokemonDetails();

  const openDetails = () => {
    const params = new URLSearchParams(window.location.search);
    params.set('details', id);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className="relative border rounded p-4 shadow bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-center"
      onClick={openDetails}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={(e) => {
          e.stopPropagation();
          toggleItem({
            id,
            name,
            description: `Pokemon ${name}`,
            detailsUrl: url,
          });
          if (e.target.checked) prefetchDetails(id).catch(() => {});
        }}
        onClick={(e) => e.stopPropagation()}
        aria-label={`Select ${name}`}
        className="absolute top-2 left-2 w-4 h-4"
      />
      <h3 className="text-xl font-bold mb-2 capitalize">{name}</h3>
      <Image
        src={imgUrl}
        alt={name}
        width={80}
        height={80}
        className="mx-auto w-20 h-20"
        priority={false}
      />
    </div>
  );
}
