import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  it('renders 404 page with Go Home link', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Go Home/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});
