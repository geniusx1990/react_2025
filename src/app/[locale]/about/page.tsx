import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function AboutPage() {
  const t = await getTranslations('About');

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">{t('heading')}</h1>

      <p className="text-lg text-gray-700 leading-relaxed">{t('intro')}</p>

      <div className="border-t pt-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {t('authorHeading')}
        </h2>
        <p className="text-gray-700">{t('authorText')}</p>
      </div>

      <div className="pt-4">
        <Link
          href={t('linkUrl')}
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
          target="_blank"
        >
          {t('cta')}
        </Link>
      </div>
    </div>
  );
}
