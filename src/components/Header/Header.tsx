'use client';
import Navigation from '@/components/Navigation/Navigation';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';
import LocaleSwitcher from '@/components/LocaleSwitcher/LocaleSwitcher';

export default function Header() {
  return (
    <div className="max-w-6xl mx-auto px-10 py-2">
      <header className="px-6 py-4 border rounded-lg bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-700">
        <div className="flex items-center justify-between gap-4">
          <Navigation />
          <ThemeSwitcher />
          <LocaleSwitcher />
        </div>
      </header>
    </div>
  );
}
