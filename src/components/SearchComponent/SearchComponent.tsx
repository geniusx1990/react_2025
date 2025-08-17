'use client';

import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface Props {
  searchTerm: string;
  onSearch: (value: string) => void;
}

export default function SearchComponent({ searchTerm, onSearch }: Props) {
  const [inputValue, setInputValue] = useState(searchTerm);
  const t = useTranslations('search');

  useEffect(() => setInputValue(searchTerm), [searchTerm]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleSearchClick = () => onSearch(inputValue.trim());
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearchClick();
  };

  return (
    <div className="p-6 border rounded-lg space-y-4 bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-700 transition-colors">
      <h2 className="text-lg font-semibold">{t('title')}</h2>
      <div className="flex gap-4">
        <input
          type="search"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={t('placeholder')}
          className="flex-1 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 transition-colors"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          onClick={handleSearchClick}
        >
          {t('button')}
        </button>
      </div>
    </div>
  );
}
