import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Navigation from './Navitation.tsx';

describe('Navigation component', () => {
  test('renders Home and About links', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  test('Home link has active class when route is "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navigation />
      </MemoryRouter>
    );

    const homeLink = screen.getByText('Home');
    expect(homeLink).toHaveClass('text-blue-600');
    expect(homeLink).toHaveClass('border-b-2');
  });

  test('About link has active class when route is "/about"', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Navigation />
      </MemoryRouter>
    );

    const aboutLink = screen.getByText('About');
    expect(aboutLink).toHaveClass('text-blue-600');
    expect(aboutLink).toHaveClass('border-b-2');
  });

  test('Home link does not have active class when route is "/about"', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Navigation />
      </MemoryRouter>
    );

    const homeLink = screen.getByText('Home');
    expect(homeLink).not.toHaveClass('text-blue-600');
    expect(homeLink).not.toHaveClass('border-b-2');
  });
});
