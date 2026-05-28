// app/authors/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAuthorBySlug, getPostsByAuthor, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)
  const email = getMetafieldValue(author.metadata?.email)
  const photo = author.metadata?.profile_photo

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 lg:p-12 mb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {photo && (
            <img
              src={`${photo.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
              alt={name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">{name}</h1>
            {bio && <p className="text-lg text-gray-700 leading-relaxed mb-3">{bio}</p>}
            {email && (
              <a href={`mailto:${email}`} className="text-sm text-accent hover:text-accent-hover font-medium">
                {email}
              </a>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Articles by {name} ({posts.length})
        </h2>
        {posts.length === 0 ? (
          <p className="text-gray-600">No articles by this author yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link href="/authors" className="text-accent hover:text-accent-hover font-medium">
          ← Back to all authors
        </Link>
      </div>
    </div>
  )
}