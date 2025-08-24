import * as yup from 'yup';

export const passwordStrengthRegex = {
  number: /\d/,
  upper: /[A-Z]/,
  lower: /[a-z]/,
  special: /[^A-Za-z0-9]/,
};

export function getPasswordStrengthFlags(pw: string) {
  return {
    number: passwordStrengthRegex.number.test(pw),
    upper: passwordStrengthRegex.upper.test(pw),
    lower: passwordStrengthRegex.lower.test(pw),
    special: passwordStrengthRegex.special.test(pw),
  };
}

const genders = ['male', 'female', 'other'] as const;
type Gender = (typeof genders)[number];

export type FormValues = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: Gender;
  terms: boolean;
  country: string;
  imageFile?: File | null;
};

export const formSchema = yup
  .object({
    name: yup
      .string()
      .required('Name is required')
      .matches(
        /^[A-Z][a-zA-Z\s'-]*$/,
        'Name must start with an uppercase letter'
      ),

    age: yup
      .number()
      .typeError('Age must be a number')
      .integer('Age must be an integer')
      .min(0, 'Age cannot be negative')
      .required('Age is required'),

    email: yup.string().email('Invalid email').required('Email is required'),

    password: yup
      .string()
      .required('Password is required')
      .test(
        'strength',
        'Password must include: 1 number, 1 uppercase, 1 lowercase, 1 special',
        (v) => {
          if (!v) return false;
          const f = getPasswordStrengthFlags(v);
          return f.number && f.upper && f.lower && f.special;
        }
      ),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),

    gender: yup.mixed<Gender>().oneOf(genders, 'Gender is required').defined(),

    terms: yup.boolean().oneOf([true], 'You must accept T&C').defined(),

    country: yup.string().required('Country is required'),

    imageFile: yup
      .mixed<File>()
      .notRequired()
      .nullable()
      .transform((value) => {
        if (typeof FileList !== 'undefined' && value instanceof FileList) {
          return value.length ? value[0] : null;
        }
        return value ?? null;
      })
      .test(
        'fileType',
        'Only PNG or JPEG allowed',
        (file: File | null | undefined) =>
          !file || ['image/png', 'image/jpeg'].includes(file.type)
      )
      .test(
        'fileSize',
        'Max size 2MB',
        (file: File | null | undefined) => !file || file.size <= 2 * 1024 * 1024
      ),
  })
  .required() as yup.ObjectSchema<FormValues>;
