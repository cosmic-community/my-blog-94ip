import Link from 'next/link'
import { getAllAuthors, getMetafieldValue } from '@/lib/cosmic'

export const metadata = {
  title: 'Authors - My Blog',
}

export default async function AuthorsPage() {
  const authors = await getAllAuthors()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Our Authors</h1>
        <p className="text-lg text-gray-600">Meet the talented writers behind our stories</p>
      </div>

      {authors.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600">No authors available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => {
            const name = getMetafieldValue(author.metadata?.name) || author.title
            const bio = getMetafieldValue(author.metadata?.bio)
            const photo = author.metadata?.profile_photo

            return (
              <Link
                key={author.id}
                href={`/authors/${author.slug}`}
                className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl hover:border-accent/30 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  {photo && (
                    <img
                      src={`${photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                      alt={name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-accent transition-colors">
                      {name}
                    </h3>
                  </div>
                </div>
                {bio && (
                  <p className="text-gray-600 text-sm line-clamp-3">{bio}</p>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}