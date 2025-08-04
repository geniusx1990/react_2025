import { render, screen } from '@testing-library/react';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('renders heading and author info', () => {
    render(<AboutPage />);

    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
    expect(
      screen.getByText(/RS School React Course Link/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/frontend developer passionate/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /RS School React Course/i })
    ).toHaveAttribute('href', expect.stringContaining('rs.school'));
  });
});
