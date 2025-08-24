'use client';
import { useRef, useState } from 'react';
import * as yup from 'yup';
import { formSchema, type FormValues } from '@/lib/validation';
import { fileToBase64 } from '@/lib/files';
import { useFormsStore } from '@/store/formsStore';
import CountryAutocomplete from '@/components/CountryAutocomplete/CountryAutocomplete';

export default function UncontrolledForm({
  onSuccessAction,
}: {
  onSuccessAction: () => void;
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const addEntry = useFormsStore((s) => s.addEntry);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});
  const [strength, setStrength] = useState({
    number: false,
    upper: false,
    lower: false,
    special: false,
  });

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();

        const fd = new FormData(formRef.current!);
        const raw = fd.get('imageFile');
        const image = raw instanceof File ? raw : null;

        const ageStr = String(fd.get('age') ?? '');
        const ageVal: number | undefined =
          ageStr.trim() === '' ? undefined : Number(ageStr);

        const values: Record<string, unknown> = {
          name: String(fd.get('name') ?? ''),
          age: ageVal,
          email: String(fd.get('email') ?? ''),
          password: String(fd.get('password') ?? ''),
          confirmPassword: String(fd.get('confirmPassword') ?? ''),
          gender: String(fd.get('gender') ?? ''),
          terms: fd.get('terms') === 'on',
          country: String(fd.get('country') ?? ''),
          imageFile: image && image.size > 0 ? image : null,
        };

        try {
          setErrors({});
          const parsed: FormValues = await formSchema.validate(values, {
            abortEarly: false,
          });
          const base64 = parsed.imageFile
            ? await fileToBase64(parsed.imageFile)
            : undefined;

          addEntry({
            id: crypto.randomUUID(),
            name: parsed.name,
            age: parsed.age,
            email: parsed.email,
            password: parsed.password,
            gender: parsed.gender,
            terms: parsed.terms,
            country: parsed.country,
            imageBase64: base64,
          });

          onSuccessAction();
        } catch (err: unknown) {
          if (err instanceof yup.ValidationError) {
            const next: Partial<Record<keyof FormValues, string>> = {};
            for (const e of err.inner) {
              if (e.path && e.message && !next[e.path as keyof FormValues]) {
                next[e.path as keyof FormValues] = e.message;
              }
            }
            setErrors(next);
          } else {
            console.error(err);
          }
        }
      }}
      className="space-y-4"
    >
      <Text name="name" label="Name" error={errors.name} />
      <Text name="age" label="Age" type="number" error={errors.age} />
      <Text name="email" label="Email" type="email" error={errors.email} />

      <Password
        name="password"
        label="Password"
        error={errors.password}
        onStrength={setStrength}
      />
      <Password
        name="confirmPassword"
        label="Confirm Password"
        error={errors.confirmPassword}
      />

      <fieldset>
        <legend className="text-sm">Gender</legend>
        <div className="flex gap-4 mt-1">
          <label>
            <input type="radio" name="gender" value="male" /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" /> Female
          </label>
          <label>
            <input type="radio" name="gender" value="other" /> Other
          </label>
        </div>
        <p className="min-h-5 text-sm text-red-600 mt-1">{errors.gender}</p>
      </fieldset>

      <div>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="terms" /> Accept Terms & Conditions
        </label>
        <p className="min-h-5 text-sm text-red-600 mt-1">{errors.terms}</p>
      </div>

      <div>
        <label htmlFor="imageFile" className="block text-sm font-medium mb-1">
          Picture (png/jpeg, ≤2MB)
        </label>
        <input
          id="imageFile"
          name="imageFile"
          type="file"
          accept="image/png,image/jpeg"
        />
        <p className="min-h-5 text-sm text-red-600 mt-1">{errors.imageFile}</p>
      </div>

      <Country value="" />
      <p className="min-h-5 text-sm text-red-600">{errors.country}</p>

      <Strength flags={strength} />

      <button
        type="submit"
        className="rounded bg-blue-600 text-white px-4 py-2"
      >
        Submit
      </button>
    </form>
  );
}

type TextProps = {
  name: keyof FormValues;
  label: string;
  error?: string;
  type?: string;
};
function Text({ name, label, error, type = 'text' }: TextProps) {
  const errId = `${String(name)}-error`;
  return (
    <div>
      <label htmlFor={String(name)} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={String(name)}
        name={String(name)}
        type={type}
        className="w-full rounded border p-2"
        aria-invalid={!!error}
        aria-describedby={errId}
      />
      <p id={errId} className="min-h-5 text-sm text-red-600">
        {error}
      </p>
    </div>
  );
}

type PasswordProps = {
  name: 'password' | 'confirmPassword';
  label: string;
  error?: string;
  onStrength?: (f: {
    number: boolean;
    upper: boolean;
    lower: boolean;
    special: boolean;
  }) => void;
};
function Password({ name, label, error, onStrength }: PasswordProps) {
  const errId = `${name}-error`;
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="password"
        className="w-full rounded border p-2"
        aria-invalid={!!error}
        aria-describedby={errId}
        onChange={(e) =>
          onStrength?.({
            number: /\d/.test(e.target.value),
            upper: /[A-Z]/.test(e.target.value),
            lower: /[a-z]/.test(e.target.value),
            special: /[^A-Za-z0-9]/.test(e.target.value),
          })
        }
      />
      <p id={errId} className="min-h-5 text-sm text-red-600">
        {error}
      </p>
    </div>
  );
}

function Country({ value }: { value: string }) {
  const [val, setVal] = useState(value);
  return (
    <>
      <CountryAutocomplete value={val} onChange={setVal} />
      <input type="hidden" name="country" value={val} />
    </>
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
