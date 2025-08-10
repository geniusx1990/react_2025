import { useState } from 'react';

export default function ErrorButton() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error('This is a Toto error!');
  }

  return (
    <button
      onClick={() => setHasError(true)}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Throw Error
    </button>
  );
}
