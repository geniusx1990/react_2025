import { useTheme } from '../../Context/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="ml-auto">
      <select
        value={theme}
        onChange={(e) => toggleTheme(e.target.value as 'light' | 'dark')}
        className="px-3 py-1 rounded-md bg-white dark:bg-gray-900 dark:text-white focus:outline-none"
      >
        <option value="light">☀ Light</option>
        <option value="dark">🌙 Dark</option>
      </select>
    </div>
  );
}
