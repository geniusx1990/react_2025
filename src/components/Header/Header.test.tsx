import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';

describe('Header component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test('renders search input and search button', () => {
    render(<Header searchTerm="" onSearch={mockOnSearch} />);
    expect(
      screen.getByPlaceholderText('Search Input Field')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('displays previously saved search term in input field', () => {
    render(<Header searchTerm="initial" onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(
      'Search Input Field'
    ) as HTMLInputElement;
    expect(input.value).toBe('initial');
  });

  test('shows empty input when no saved searchTerm is provided', () => {
    render(<Header searchTerm="" onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(
      'Search Input Field'
    ) as HTMLInputElement;
    expect(input.value).toBe('');
  });

  test('updates input when user types', () => {
    render(<Header searchTerm="" onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(
      'Search Input Field'
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: '  hello ' } });
    expect(input.value).toBe('  hello ');
  });

  test('trims input and calls onSearch when Search button is clicked', () => {
    render(<Header searchTerm="" onSearch={mockOnSearch} />);
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
    render(<Header searchTerm="" onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(
      'Search Input Field'
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'bulbasaur' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('bulbasaur');
  });

  test('onSearch called with empty string when input is only spaces', () => {
    render(<Header searchTerm="" onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(
      'Search Input Field'
    ) as HTMLInputElement;
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '    ' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});
