import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-6xl font-extrabold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <Link
        href="/"
        className="inline-block bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        Go Home
      </Link>
    </div>
  )
}