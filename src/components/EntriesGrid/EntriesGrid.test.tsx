import { render, screen, act } from '@testing-library/react';
import EntriesGrid from '@/components/EntriesGrid/EntriesGrid';
import { useFormsStore } from '@/store/formsStore';

const HIGHLIGHT_MS = 3500;

beforeEach(() => {
  useFormsStore.setState({ countries: [], entries: [] });
});

test('renders empty state', () => {
  render(<EntriesGrid />);
  expect(screen.getByText(/Пока нет записей/i)).toBeInTheDocument();
});

test('highlights a new entry and removes highlight after timeout', () => {
  jest.useFakeTimers();

  useFormsStore.setState({
    entries: [
      {
        id: '1',
        name: 'John',
        age: 25,
        email: 'j@a.com',
        password: 'Aa1!',
        gender: 'male',
        terms: true,
        country: 'LT',
        imageBase64: undefined,
        _new: true,
      },
    ],
  });

  const { container } = render(<EntriesGrid />);
  const getCard = () => container.querySelector('li') as HTMLElement;

  expect(getCard().className).toMatch(/ring-emerald-500|animate-pulse/);

  act(() => {
    jest.advanceTimersByTime(HIGHLIGHT_MS);
  });

  expect(useFormsStore.getState().entries[0]._new).toBe(false);
  expect(getCard().className).not.toMatch(/ring-emerald-500|animate-pulse/);

  jest.useRealTimers();
});
