// HookForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import HookForm from '@/components/Forms/HookForm';
import { useFormsStore } from '@/store/formsStore';

beforeEach(() => {
  useFormsStore.setState({
    entries: [],
    countries: ['Lithuania', 'Latvia', 'Estonia'],
  });
  Object.defineProperty(global, 'crypto', {
    value: { randomUUID: jest.fn(() => 'id-1') },
    configurable: true,
  });
});

test('renders all required fields', () => {
  render(<HookForm onSuccessAction={() => {}} />);
  expect(screen.getByLabelText(/^name$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^age$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  expect(screen.getByRole('radio', { name: /^male$/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^country$/i)).toBeInTheDocument();
});

test('button disabled until form is valid; then submits and writes to store', async () => {
  const onSuccess = jest.fn();
  render(<HookForm onSuccessAction={onSuccess} />);

  const submit = screen.getByRole('button', { name: /submit/i });
  expect(submit).toBeDisabled();

  await user.type(screen.getByLabelText(/^name$/i), 'John');
  await user.type(screen.getByLabelText(/^age$/i), '22');
  await user.type(screen.getByLabelText(/^email$/i), 'a@b.com');
  await user.type(screen.getByLabelText(/^password$/i), 'Aa1!');
  await user.type(screen.getByLabelText(/confirm password/i), 'Aa1!');
  await user.click(screen.getByRole('radio', { name: /^male$/i }));
  const country = screen.getByLabelText(/^country$/i);
  await user.clear(country);
  await user.type(country, 'Lithuania');
  await user.click(screen.getByLabelText(/accept terms/i));

  await waitFor(() => expect(submit).toBeEnabled());

  await user.click(submit);
  await waitFor(() => expect(onSuccess).toHaveBeenCalled());

  const { entries } = useFormsStore.getState();
  expect(entries[0].email).toBe('a@b.com');
});

test('shows and clears validation errors (email)', async () => {
  render(<HookForm onSuccessAction={() => {}} />);
  const email = screen.getByLabelText(/^email$/i);

  await user.type(email, 'wrong');
  expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();

  await user.clear(email);
  await user.type(email, 'ok@ex.com');
  await waitFor(() => {
    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
  });
});
