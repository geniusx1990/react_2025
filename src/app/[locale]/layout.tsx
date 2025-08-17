import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Providers from '@/providers/Providers';
import Header from '@/components/Header/Header';
import '../globals.css';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider>
          <Providers>
            <div className="min-h-screen bg-gray-100 text-black dark:bg-gray-950 dark:text-white transition-colors">
              <Header />
              <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
