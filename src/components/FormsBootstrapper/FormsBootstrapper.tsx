'use client';
import { useEffect } from 'react';
import { useFormsStore } from '@/store/formsStore';
import { allCountryNames } from '@/lib/countries';

export default function FormsBootstrapper() {
  const setCountries = useFormsStore((s) => s.setCountries);
  useEffect(() => {
    setCountries(allCountryNames);
  }, [setCountries]);
  return null;
}
