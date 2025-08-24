'use client';

import { useState, useTransition, useCallback } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Locale } from 'next-intl';
import { IconChevronDown } from '@tabler/icons-react';

type Option = { value: string; label: string };
type Props = { defaultValue: string; label: string; options: Option[] };

export default function LocaleSwitcherSelect({
  defaultValue,
  label,
  options,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      if (!value) return;
      const nextLocale = value as Locale;

      startTransition(() => {
        router.replace({ pathname }, { locale: nextLocale });
      });
    },
    [router, pathname]
  );

  return (
    <div className="relative inline-block group">
      <label htmlFor="locale-select" className="sr-only">
        {label}
      </label>

      <div className="relative">
        <select
          id="locale-select"
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={isPending}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          className={[
            'appearance-none w-[150px] pr-8 rounded-md',
            'border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm',
            'hover:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500',
            'disabled:opacity-60 disabled:cursor-not-allowed',
            'dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-500',
          ].join(' ')}
          aria-busy={isPending}
          aria-label={label}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <IconChevronDown
          size={16}
          className={[
            'pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 opacity-70 transition-transform',
            open ? 'rotate-180' : '',
          ].join(' ')}
          aria-hidden="true"
        />
      </div>

      <div
        role="tooltip"
        className={[
          'pointer-events-none absolute left-1/2 -translate-x-1/2 mt-2',
          'rounded-md bg-zinc-800 px-2 py-1 text-xs text-white shadow-md',
          'opacity-0 transition-opacity duration-150',
          'group-hover:opacity-100 group-focus-within:opacity-100',
          'dark:bg-zinc-700',
        ].join(' ')}
      >
        {label}
      </div>
    </div>
  );
}
