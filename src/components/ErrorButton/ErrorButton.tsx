import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ErrorButton() {
  const [hasError, setHasError] = useState(false);
  const t = useTranslations('errorbutton');

  if (hasError) {
    throw new Error('This is a Toto error!');
  }

  return (
    <button
      onClick={() => setHasError(true)}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      {t('errorbutton')}
    </button>
  );
}
