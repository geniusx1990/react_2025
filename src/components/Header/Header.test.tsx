import { render, screen } from '@testing-library/react';
import Header from './Header';

jest.mock('../Navigation/Navigation.tsx', () => {
  const NavigationMock = () => <div>NavigationMock</div>;
  NavigationMock.displayName = 'NavigationMock';
  return NavigationMock;
});

jest.mock('../ThemeSwitcher/ThemeSwitcher.tsx', () => {
  const ThemeSwitcherMock = () => <div>ThemeSwitcherMock</div>;
  ThemeSwitcherMock.displayName = 'ThemeSwitcherMock';
  return ThemeSwitcherMock;
});

describe('Header', () => {
  it('renders Navigation and ThemeSwitcher', () => {
    render(<Header />);
    expect(screen.getByText('NavigationMock')).toBeInTheDocument();
    expect(screen.getByText('ThemeSwitcherMock')).toBeInTheDocument();
  });
});
