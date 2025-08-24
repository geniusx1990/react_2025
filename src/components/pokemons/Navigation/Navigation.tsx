'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Navigation() {
  const pathname = usePathname();
  const t = useTranslations('nav');

  const linkClass = (href: string, isExact?: boolean) => {
    const isActive = isExact ? pathname === href : pathname?.startsWith(href);

    return isActive
      ? 'text-blue-600 border-b-2 border-blue-600 pb-1 dark:text-blue-400 dark:border-blue-400'
      : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400';
  };

  return (
    <nav>
      <ul className="flex space-x-6 text-lg font-medium">
        <li>
          <Link
            href={'/public' as Route}
            className={linkClass('/' as Route, true)}
          >
            {t('home')}
          </Link>
        </li>
        <li>
          <Link
            href={'/about' as Route}
            className={linkClass('/about' as Route)}
          >
            {t('about')}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
