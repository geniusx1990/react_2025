import { NextResponse } from 'next/server';

type SelectedItem = {
  id: string;
  name: string;
  description: string;
  detailsUrl: string;
};

type PokeDetails = {
  height: number;
  weight: number;
  types: { slot: number; type: { name: string; url: string } }[];
};

function q(v: unknown) {
  return `"${String(v ?? '').replace(/"/g, '""')}"`;
}

export async function POST(req: Request) {
  const items = (await req.json()) as SelectedItem[];

  const enriched = await Promise.all(
    items.map(async (i) => {
      try {
        const r = await fetch(i.detailsUrl, { cache: 'no-store' });
        if (!r.ok) throw new Error(`fetch ${i.id} ${r.status}`);
        const d = (await r.json()) as PokeDetails;
        return {
          ...i,
          height: d.height,
          weight: d.weight,
          types: d.types.map((t) => t.type.name).join('|'),
        };
      } catch {
        return { ...i, height: '', weight: '', types: '' };
      }
    })
  );

  const header = [
    'ID',
    'Name',
    'Description',
    'Details URL',
    'Height',
    'Weight',
    'Types',
  ];
  const rows = enriched.map((i) =>
    [i.id, i.name, i.description, i.detailsUrl, i.height, i.weight, i.types]
      .map(q)
      .join(',')
  );

  const csv = '\uFEFF' + [header.join(','), ...rows].join('\n');

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${enriched.length}_items.csv"`,
    },
  });
}
