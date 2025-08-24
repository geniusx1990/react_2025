'use client';
import { useState } from 'react';
import Navigation from '@/components/pokemons/Navigation/Navigation';
import ThemeSwitcher from '@/components/pokemons/ThemeSwitcher/ThemeSwitcher';
import LocaleSwitcher from '@/components/pokemons/LocaleSwitcher/LocaleSwitcher';
import SharedModal from '@/components/pokemons/Modal/SharedModal';
import UncontrolledForm from '@/components/Forms/UncontrolledForm';
import HookForm from '@/components/Forms/HookForm';

export default function Header() {
  const [modal, setModal] = useState<null | 'uncontrolled' | 'rhf'>(null);

  return (
    <div className="max-w-6xl mx-auto px-10 py-2">
      <header className="px-6 py-4 border rounded-lg bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-700">
        <div className="flex items-center justify-between gap-4">
          <Navigation />
          <ThemeSwitcher />
          <LocaleSwitcher />
          <button
            onClick={() => setModal('uncontrolled')}
            className="rounded bg-blue-500 text-white px-3 py-1"
          >
            Uncontrolled Form
          </button>
          <button
            onClick={() => setModal('rhf')}
            className="rounded bg-green-500 text-white px-3 py-1"
          >
            React Hook Form
          </button>
        </div>
      </header>

      <SharedModal
        isOpen={modal === 'uncontrolled'}
        onClose={() => setModal(null)}
        type="uncontrolled"
      >
        <UncontrolledForm onSuccessAction={() => setModal(null)} />
      </SharedModal>

      <SharedModal
        isOpen={modal === 'rhf'}
        onClose={() => setModal(null)}
        type="rhf"
      >
        <HookForm onSuccessAction={() => setModal(null)} />
      </SharedModal>
    </div>
  );
}
