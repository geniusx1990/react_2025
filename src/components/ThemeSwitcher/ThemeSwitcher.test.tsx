import { render, screen, fireEvent } from '@testing-library/react';
import ThemeSwitcher from './ThemeSwitcher';

const mockToggleTheme = jest.fn();

jest.mock('../../Context/ThemeContext', () => ({
  useTheme: jest.fn(() => ({
    theme: 'light',
    toggleTheme: mockToggleTheme,
  })),
}));

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    mockToggleTheme.mockClear();
  });

  it('renders the select with current theme selected', () => {
    render(<ThemeSwitcher />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('light');
  });

  it('calls toggleTheme when theme is changed', () => {
    render(<ThemeSwitcher />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'dark' } });
    expect(mockToggleTheme).toHaveBeenCalledWith('dark');
  });
});
