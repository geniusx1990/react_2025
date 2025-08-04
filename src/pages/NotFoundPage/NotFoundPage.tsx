import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 text-black dark:bg-gray-950 dark:text-white transition-colors">
      <div className="w-full max-w-md p-8 md:p-10 bg-white dark:bg-gray-900 rounded-lg shadow-md space-y-6 text-center transition-colors">
        <h1 className="text-5xl font-extrabold text-red-600 dark:text-red-400">
          404
        </h1>
        <p className="text-2xl font-semibold">Page Not Found</p>
        <p className="text-gray-600 dark:text-gray-400">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
