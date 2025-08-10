import { PokemonDetails } from './types.ts';
import { SelectedItem } from '../store/useSelectionStore.ts';
import { formatToCSV } from './formatToCSV';

export async function downloadItemsAsCSV(
  items: SelectedItem[]
): Promise<string> {
  const results = await Promise.allSettled(
    items.map(async (item) => {
      const res = await fetch(item.detailsUrl);
      const data: PokemonDetails = await res.json();
      return {
        ...item,
        height: data.height,
        weight: data.weight,
        types: data.types.map((t) => t.type.name),
      };
    })
  );

  const enrichedItems = results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      console.error(
        `Error fetching details for ${items[index].name}`,
        result.reason
      );
      return items[index];
    }
  });

  const csvRows = [
    ['ID', 'Name', 'Description', 'Details URL', 'Height', 'Weight', 'Types'],
    ...enrichedItems.map(
      ({ id, name, description, detailsUrl, height, weight, types }) => [
        id,
        name,
        description,
        detailsUrl,
        height ?? '',
        weight ?? '',
        types?.join(', ') ?? '',
      ]
    ),
  ];

  const csvContent = formatToCSV(csvRows);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  return URL.createObjectURL(blob);
}
