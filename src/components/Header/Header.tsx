import Navigation from '../Navigation/Navigation.tsx';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher.tsx';

export default function Header() {
  return (
    <div className="max-w-6xl mx-auto px-10 py-6">
      <header className="p-6 border rounded-lg bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-700 transition-colors">
        <div className="flex items-center justify-between gap-4">
          <Navigation />
          <ThemeSwitcher />
        </div>
      </header>
    </div>
  );
}
