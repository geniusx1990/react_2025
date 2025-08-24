'use client';

import { useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Loader from '@/components/pokemons/Loader/Loader';
import { usePokemonDetailsQuery } from '@/query/hooks';
import type { Route } from 'next';

type PokemonType = { type: { name: string } };

export default function DetailView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawId = searchParams.get('details');
  const id = rawId ?? '';

  const close = useCallback(() => {
    const next = new URLSearchParams(searchParams.toString());
    next.delete('details');
    const href = (
      next.toString() ? `${pathname}?${next.toString()}` : pathname
    ) as Route;

    router.replace(href, { scroll: false });
  }, [router, pathname, searchParams]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [close]);

  const { data, isPending, isFetching, error, refetch } =
    usePokemonDetailsQuery(id);

  if (!id) return null;
  if (isPending) return <Loader />;

  if (error || !data) {
    return (
      <div className="text-center text-red-500 dark:text-red-400 p-4">
        Pokemon not found.
        <button className="ml-2 underline" onClick={() => refetch()}>
          Retry
        </button>
        <button className="ml-4 underline" onClick={close}>
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="relative h-full p-4 md:p-6 overflow-y-auto transition-colors">
      <button
        className="absolute top-2 right-2 text-xl text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
        onClick={close}
        aria-label="Close details"
      >
        ✖
      </button>

      <div className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-xl shadow-md p-4 space-y-4 h-full transition-colors">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold capitalize">{data.name}</h2>
          {isFetching ? (
            <span className="text-sm opacity-70">Refreshing…</span>
          ) : null}
        </div>

        <div className="flex justify-center">
          <Image
            src={data.sprites.front_default}
            alt={data.name}
            width={128}
            height={128}
            className="object-contain"
          />
        </div>

        <div className="space-y-2 text-gray-700 dark:text-gray-300">
          <p>
            <strong>Height:</strong> {data.height}
          </p>
          <p>
            <strong>Weight:</strong> {data.weight}
          </p>
          <p>
            <strong>Types:</strong>{' '}
            {data.types.map((t: PokemonType) => t.type.name).join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
}
