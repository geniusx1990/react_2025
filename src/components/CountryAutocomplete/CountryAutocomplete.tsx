'use client';
import { useMemo, useState } from 'react';
import { useFormsStore } from '@/store/formsStore';

export default function CountryAutocomplete({
  value,
  onChange,
  id = 'country',
}: {
  value: string;
  onChange: (v: string) => void;
  id?: string;
}) {
  const countries = useFormsStore((s) => s.countries);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const needle = (q || value).toLowerCase();
    return countries
      .filter((c) => c.toLowerCase().includes(needle))
      .slice(0, 8);
  }, [countries, q, value]);

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        Country
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setQ(e.target.value);
          setOpen(true);
        }}
        className="w-full rounded border p-2"
        autoComplete="off"
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
      />
      {open && filtered.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full rounded border bg-white shadow">
          {filtered.map((c) => (
            <li key={c}>
              <button
                type="button"
                className="w-full text-left px-3 py-2 hover:bg-gray-100"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(c);
                  setQ(c);
                  setOpen(false);
                }}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
