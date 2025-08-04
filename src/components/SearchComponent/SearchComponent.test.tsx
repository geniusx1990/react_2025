import { render, screen, fireEvent } from '@testing-library/react';
import SearchComponent from './SearchComponent.tsx';

describe('SearchComponent component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test('renders search input and search button', () => {
    render(<SearchComponent searchTerm="" onSearch={mockOnSearch} />);
    expect(
      screen.getByPlaceholderText('Search Input Field')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('displays previously saved search term in input field', () => {
    render(<SearchComponent searchTerm="initial" onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(
      'Search Input Field'
    ) as HTMLInputElement;
    expect(input.value).toBe('initial');
  });

  test('shows empty input when no saved searchTerm is provided', () => {
    render(<SearchComponent searchTerm="" onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(
      'Search Input Field'
    ) as HTMLInputElement;
    expect(input.value).toBe('');
  });

  test('updates input when user types', () => {
    render(<SearchComponent searchTerm="" onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(
      'Search Input Field'
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: '  hello ' } });
    expect(input.value).toBe('  hello ');
  });

  test('trims input and calls onSearch when Search button is clicked', () => {
    render(<SearchComponent searchTerm="" onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(
      'Search Input Field'
    ) as HTMLInputElement;
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '  pikachu  ' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('pikachu');
  });

  test('calls onSearch when Enter key is pressed', () => {
    render(<SearchComponent searchTerm="" onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(
      'Search Input Field'
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'bulbasaur' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('bulbasaur');
  });

  test('onSearch called with empty string when input is only spaces', () => {
    render(<SearchComponent searchTerm="" onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(
      'Search Input Field'
    ) as HTMLInputElement;
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '    ' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});
