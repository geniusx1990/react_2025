import type { SelectedItem } from '../store/useSelectionStore';

interface PokemonDetails {
  height: number;
  weight: number;
  types: { type: { name: string } }[];
}

export async function downloadItemsAsCSV(items: SelectedItem[]) {
  const enrichedItems = await Promise.all(
    items.map(async (item) => {
      try {
        const res = await fetch(item.detailsUrl);
        const data: PokemonDetails = await res.json();
        return {
          ...item,
          height: data.height,
          weight: data.weight,
          types: data.types.map((t) => t.type.name),
        };
      } catch (err) {
        console.error(`Error fetching details for ${item.name}`, err);
        return item;
      }
    })
  );

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

  const csvContent = csvRows
    .map((r) =>
      r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    )
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${enrichedItems.length}_items.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
