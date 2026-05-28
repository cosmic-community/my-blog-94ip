// app/posts/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getMetafieldValue } from '@/lib/cosmic'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const title = getMetafieldValue(post.metadata?.title) || post.title
  const content = getMetafieldValue(post.metadata?.content)
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const tags = getMetafieldValue(post.metadata?.tags)
  const author = post.metadata?.author
  const category = post.metadata?.category
  const featuredImage = post.metadata?.featured_image

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        {category && (
          <Link
            href={`/categories/${category.slug}`}
            className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4 hover:text-accent-hover"
          >
            {getMetafieldValue(category.metadata?.name) || category.title}
          </Link>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          {title}
        </h1>
        {excerpt && (
          <p className="text-xl text-gray-600 leading-relaxed mb-8">{excerpt}</p>
        )}
        {author && (
          <Link href={`/authors/${author.slug}`} className="inline-flex items-center gap-3 group">
            {author.metadata?.profile_photo && (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                alt={getMetafieldValue(author.metadata?.name) || author.title}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <p className="text-sm font-semibold text-gray-900 group-hover:text-accent transition-colors">
                {getMetafieldValue(author.metadata?.name) || author.title}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </Link>
        )}
      </div>

      {featuredImage && (
        <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-12 bg-gray-100">
          <img
            src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {content && (
        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-accent hover:prose-a:text-accent-hover prose-strong:text-gray-900"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      {tags && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.split(',').map((tag, i) => (
              <span
                key={i}
                className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link href="/posts" className="text-accent hover:text-accent-hover font-medium">
          ← Back to all posts
        </Link>
      </div>
    </article>
  )
}