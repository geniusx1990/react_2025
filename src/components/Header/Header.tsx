import { ChangeEvent, KeyboardEvent, useState } from 'react';

interface Props {
  searchTerm: string;
  onSearch: (value: string) => void;
}

export default function Header({ searchTerm, onSearch }: Props) {
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue.trim());
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <header className="p-6 border rounded-lg space-y-4 bg-white">
      <h2 className="text-lg font-semibold">Top controls</h2>
      <div className="flex gap-4">
        <input
          type="search"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search Input Field"
          className="flex-1 text-black border rounded px-3 py-2"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>
    </header>
  );
}
