import { useState } from 'react';

export function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState<string>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? item : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: string | ((val: string) => string)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      window.localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.warn(`Error writing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}
