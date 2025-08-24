'use client';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  formSchema,
  type FormValues,
  getPasswordStrengthFlags,
} from '@/lib/validation';
import { useFormsStore } from '@/store/formsStore';
import { fileToBase64 } from '@/lib/files';
import CountryAutocomplete from '@/components/CountryAutocomplete/CountryAutocomplete';

type FieldProps = {
  name: keyof FormValues;
  label: string;
  error?: string;
  children: ReactNode;
};

export default function HookForm({
  onSuccessAction,
}: {
  onSuccessAction: () => void;
}) {
  const { register, handleSubmit, formState, watch, setValue } =
    useForm<FormValues>({
      resolver: yupResolver<FormValues, unknown, FormValues>(formSchema),
      mode: 'onChange',
      defaultValues: {
        imageFile: undefined,
      },
    });
  const { errors, isValid, isSubmitting } = formState;
  const addEntry = useFormsStore((s) => s.addEntry);

  const [strength, setStrength] = useState(getPasswordStrengthFlags(''));

  const onSubmit = handleSubmit(async (data) => {
    const base64 = data.imageFile
      ? await fileToBase64(data.imageFile)
      : undefined;
    addEntry({
      id: crypto.randomUUID(),
      name: data.name,
      age: data.age,
      email: data.email,
      password: data.password,
      gender: data.gender,
      terms: data.terms,
      country: data.country,
      imageBase64: base64,
    });
    onSuccessAction();
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field name="name" label="Name" error={errors.name?.message}>
        <input
          id="name"
          {...register('name')}
          className="w-full rounded border p-2"
        />
      </Field>

      <Field name="age" label="Age" error={errors.age?.message}>
        <input
          id="age"
          type="number"
          {...register('age')}
          className="w-full rounded border p-2"
        />
      </Field>

      <Field name="email" label="Email" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="w-full rounded border p-2"
        />
      </Field>

      <Field name="password" label="Password" error={errors.password?.message}>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="w-full rounded border p-2"
          onChange={(e) =>
            setStrength(getPasswordStrengthFlags(e.target.value))
          }
        />
      </Field>

      <Field
        name="confirmPassword"
        label="Confirm Password"
        error={errors.confirmPassword?.message}
      >
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          className="w-full rounded border p-2"
        />
      </Field>

      <Strength flags={strength} />

      <fieldset>
        <legend className="text-sm">Gender</legend>
        <div className="flex gap-4 mt-1">
          <label>
            <input type="radio" value="male" {...register('gender')} /> Male
          </label>
          <label>
            <input type="radio" value="female" {...register('gender')} /> Female
          </label>
          <label>
            <input type="radio" value="other" {...register('gender')} /> Other
          </label>
        </div>
        <p className="min-h-5 text-sm text-red-600">{errors.gender?.message}</p>
      </fieldset>

      <div>
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('terms')} /> Accept Terms &
          Conditions
        </label>
        <p className="min-h-5 text-sm text-red-600">{errors.terms?.message}</p>
      </div>

      <div>
        <label htmlFor="imageFile" className="block text-sm font-medium mb-1">
          Picture (png/jpeg, ≤2MB)
        </label>
        <input
          id="imageFile"
          type="file"
          accept="image/png,image/jpeg"
          {...register('imageFile')}
        />
        <p className="min-h-5 text-sm text-red-600">
          {errors.imageFile?.message}
        </p>
      </div>

      <CountryAutocomplete
        value={watch('country') || ''}
        onChange={(v) =>
          setValue('country', v, { shouldValidate: true, shouldDirty: true })
        }
      />
      <p className="min-h-5 text-sm text-red-600">{errors.country?.message}</p>

      <button
        disabled={!isValid || isSubmitting}
        type="submit"
        className="rounded bg-blue-600 disabled:opacity-50 text-white px-4 py-2"
      >
        {isSubmitting ? 'Submitting…' : 'Submit'}
      </button>
    </form>
  );
}

function Field({ name, label, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={String(name)} className="block text-sm font-medium mb-1">
        {label}
      </label>
      {children}
      <p className="min-h-5 text-sm text-red-600">{error}</p>
    </div>
  );
}

function Strength({
  flags,
}: {
  flags: { number: boolean; upper: boolean; lower: boolean; special: boolean };
}) {
  return (
    <ul className="text-sm grid grid-cols-2 gap-1">
      {Object.entries(flags).map(([k, v]) => (
        <li key={k} className={v ? 'text-green-600' : 'text-gray-500'}>
          {k}
        </li>
      ))}
    </ul>
  );
}
