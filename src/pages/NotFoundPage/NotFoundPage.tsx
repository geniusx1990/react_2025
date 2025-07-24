import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-lg shadow-md text-center space-y-6 max-w-md w-full">
        <h1 className="text-4xl font-bold text-red-600">404</h1>
        <p className="text-xl text-gray-700">Page Not Found</p>
        <p className="text-gray-500">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
