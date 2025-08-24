import { formSchema, getPasswordStrengthFlags } from './validation';

const base = {
  name: 'John',
  age: 25,
  email: 'j@a.com',
  password: 'Aa1!',
  confirmPassword: 'Aa1!',
  gender: 'male' as const,
  terms: true,
  country: 'Lithuania',
  imageFile: undefined,
};

test('accepts valid data', async () => {
  await expect(formSchema.validate(base)).resolves.toBeTruthy();
});

test('rejects weak password', async () => {
  await expect(
    formSchema.validate({ ...base, password: 'aaaa', confirmPassword: 'aaaa' })
  ).rejects.toBeTruthy();
});

test('requires uppercase first letter in name', async () => {
  await expect(
    formSchema.validate({ ...base, name: 'john' })
  ).rejects.toBeTruthy();
});

test('disallows negative age', async () => {
  await expect(formSchema.validate({ ...base, age: -1 })).rejects.toBeTruthy();
});

test('calculates flags correctly', () => {
  expect(getPasswordStrengthFlags('Aa1!')).toEqual({
    number: true,
    upper: true,
    lower: true,
    special: true,
  });
  expect(getPasswordStrengthFlags('aaaa')).toEqual({
    number: false,
    upper: false,
    lower: true,
    special: false,
  });
});
