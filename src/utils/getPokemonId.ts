export const getPokemonId = (url: string): string => {
  const parts = url.split('/');
  return parts[parts.length - 2];
};
