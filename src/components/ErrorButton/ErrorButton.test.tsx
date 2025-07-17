import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorButton } from './ErrorButton';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

describe('TestErrorButton', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders the button with correct text', () => {
    render(<ErrorButton />);
    expect(
      screen.getByRole('button', { name: /throw error/i })
    ).toBeInTheDocument();
  });

  test('throws error when clicked and triggers fallback UI', () => {
    render(
      <ErrorBoundary fallback={<div>Fallback triggered</div>}>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /throw error/i });
    fireEvent.click(button);

    expect(screen.getByText(/fallback triggered/i)).toBeInTheDocument();
  });
});
