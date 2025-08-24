// UncontrolledForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UncontrolledForm from './UncontrolledForm';
import { useFormsStore } from '@/store/formsStore';

beforeEach(() => {
  useFormsStore.setState({ entries: [], countries: ['Lithuania'] });
  Object.defineProperty(global, 'crypto', {
    value: { randomUUID: jest.fn(() => 'test-id') },
    configurable: true,
  });
});

test('shows errors on invalid submit', async () => {
  const onSuccess = jest.fn();
  render(<UncontrolledForm onSuccessAction={onSuccess} />);
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
  expect(onSuccess).not.toHaveBeenCalled();
});

test('submits valid data and writes to store', async () => {
  const onSuccess = jest.fn();
  render(<UncontrolledForm onSuccessAction={onSuccess} />);

  fireEvent.change(screen.getByLabelText(/^name$/i), {
    target: { value: 'John' },
  });
  fireEvent.change(screen.getByLabelText(/^age$/i), {
    target: { value: '22' },
  });
  fireEvent.change(screen.getByLabelText(/^email$/i), {
    target: { value: 'a@b.com' },
  });
  fireEvent.change(screen.getByLabelText(/^password$/i), {
    target: { value: 'Aa1!' },
  });
  fireEvent.change(screen.getByLabelText(/confirm password/i), {
    target: { value: 'Aa1!' },
  });
  fireEvent.click(screen.getByRole('radio', { name: /^male$/i }));
  fireEvent.click(screen.getByLabelText(/accept terms/i));
  fireEvent.change(screen.getByLabelText(/^country$/i), {
    target: { value: 'Lithuania' },
  });

  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  await waitFor(() => expect(onSuccess).toHaveBeenCalled());

  const { entries } = useFormsStore.getState();
  expect(entries[0].name).toBe('John');
  expect(entries[0].country).toBe('Lithuania');
  expect(entries[0]._new).toBe(true);
});
