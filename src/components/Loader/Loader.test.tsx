import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader component', () => {
  test('renders loading spinner', () => {
    render(<Loader />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  test('has accessible label for screen readers', () => {
    render(<Loader />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });
});
