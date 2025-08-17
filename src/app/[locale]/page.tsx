import HomeClient from './HomeClient';
import { fetchPokemonPage } from '@/lib/pokemon';

export const revalidate = 3600;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; details?: string }>;
}) {
  const sp = await searchParams;

  const limit = 8;
  const page = Math.max(1, Number(sp.page ?? 1));
  const offset = (page - 1) * limit;

  const initialPage = sp.search ? null : await fetchPokemonPage(limit, offset);

  return (
    <HomeClient
      initialPage={initialPage}
      limit={limit}
      page={page}
      searchTerm={sp.search ?? ''}
      detailsId={sp.details ?? ''}
    />
  );
}
