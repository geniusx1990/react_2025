'use client';
import { create } from 'zustand';

export type Gender = 'male' | 'female' | 'other';

export interface FormEntry {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  gender: Gender;
  terms: boolean;
  country: string;
  imageBase64?: string;
  _new?: boolean;
}

interface FormsState {
  countries: string[];
  entries: FormEntry[];
  addEntry: (e: FormEntry) => void;
  markAllSeen: () => void;
  setCountries: (c: string[]) => void;
}

export const useFormsStore = create<FormsState>((set) => ({
  countries: [],
  entries: [],
  addEntry: (e) =>
    set((s) => ({ entries: [{ ...e, _new: true }, ...s.entries] })),
  markAllSeen: () =>
    set((s) => ({ entries: s.entries.map((e) => ({ ...e, _new: false })) })),
  setCountries: (c) => set({ countries: c }),
}));
