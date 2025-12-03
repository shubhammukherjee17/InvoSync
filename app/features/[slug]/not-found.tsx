import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Feature Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The feature you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

