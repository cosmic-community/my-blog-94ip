// app/categories/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getPostsByCategory, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <span className="inline-block text-xs font-semibold text-accent uppercase tracking-wider mb-3">
          Category
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">{name}</h1>
        {description && <p className="text-lg text-gray-600 max-w-2xl">{description}</p>}
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600">No articles in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link href="/categories" className="text-accent hover:text-accent-hover font-medium">
          ← Back to all categories
        </Link>
      </div>
    </div>
  )
}