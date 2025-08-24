'use client';

import { useEffect } from 'react';
import { useFormsStore } from '@/store/formsStore';
import Image from 'next/image';

const HIGHLIGHT_MS = 3500;

export default function EntriesGrid() {
  const entries = useFormsStore((s) => s.entries);
  const markAllSeen = useFormsStore((s) => s.markAllSeen);

  useEffect(() => {
    if (!entries.some((e) => e._new)) return;
    const t = setTimeout(() => markAllSeen(), HIGHLIGHT_MS);
    return () => clearTimeout(t);
  }, [entries, markAllSeen]);

  if (entries.length === 0)
    return <p className="mt-6 text-sm text-gray-500">Пока нет записей.</p>;

  return (
    <ul className="mt-6 mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((e) => (
        <li
          key={e.id}
          className={[
            'rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-700 shadow p-4 transition',
            e._new ? 'ring-2 ring-emerald-500 animate-pulse' : '',
          ].join(' ')}
        >
          <div className="flex items-start gap-3">
            {e.imageBase64 ? (
              <Image
                src={e.imageBase64}
                alt={`${e.name}'s picture`}
                className="h-16 w-16 rounded object-cover border"
              />
            ) : (
              <div className="h-16 w-16 rounded border flex items-center justify-center text-xs text-gray-400">
                no image
              </div>
            )}
            <div className="min-w-0">
              <div className="font-semibold">{e.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {e.email}
              </div>
              <div className="text-xs text-gray-500">
                {e.country} • {e.gender} • {e.age} y.o.
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
