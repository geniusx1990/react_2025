import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { FallbackUi } from '../FallbackUI/FallbackUi.tsx';

jest.mock('../../utils/logErrorToMyService.ts', () => ({
  logErrorToMyService: jest.fn(),
}));

const fallbackText = 'Something went wrong';

describe('ErrorBoundary component', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders children if no error occurs', () => {
    render(
      <ErrorBoundary fallback={<FallbackUi />}>
        <div>Safe child</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Safe child')).toBeInTheDocument();
    expect(screen.queryByText(fallbackText)).not.toBeInTheDocument();
  });
});
