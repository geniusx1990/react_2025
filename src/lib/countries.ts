import countries from 'world-countries';
export const allCountryNames = countries.map((c) => c.name.common).sort();
