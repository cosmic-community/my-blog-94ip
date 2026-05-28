import Link from 'next/link'
import { getAllPosts, getAllCategories, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ])

  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1, 7)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Stories, Ideas &{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Inspiration
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Discover thoughtful articles from talented writers exploring creativity, technology, and everything in between.
            </p>
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Read Articles
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Story</h2>
          </div>
          <Link
            href={`/posts/${featuredPost.slug}`}
            className="block group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300"
          >
            <div className="grid md:grid-cols-2 gap-0">
              {featuredPost.metadata?.featured_image && (
                <div className="aspect-[16/10] md:aspect-auto overflow-hidden bg-gray-100">
                  <img
                    src={`${featuredPost.metadata.featured_image.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
                    alt={getMetafieldValue(featuredPost.metadata?.title) || featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                {featuredPost.metadata?.category && (
                  <span className="inline-block text-xs font-semibold text-accent uppercase tracking-wider mb-3">
                    {getMetafieldValue(featuredPost.metadata.category.metadata?.name) || featuredPost.metadata.category.title}
                  </span>
                )}
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-accent transition-colors">
                  {getMetafieldValue(featuredPost.metadata?.title) || featuredPost.title}
                </h3>
                {featuredPost.metadata?.excerpt && (
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {getMetafieldValue(featuredPost.metadata.excerpt)}
                  </p>
                )}
                {featuredPost.metadata?.author && (
                  <div className="flex items-center gap-3">
                    {featuredPost.metadata.author.metadata?.profile_photo && (
                      <img
                        src={`${featuredPost.metadata.author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                        alt={getMetafieldValue(featuredPost.metadata.author.metadata?.name) || featuredPost.metadata.author.title}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <span className="text-sm font-medium text-gray-900">
                      {getMetafieldValue(featuredPost.metadata.author.metadata?.name) || featuredPost.metadata.author.title}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Recent Posts */}
      {remainingPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
            <Link href="/posts" className="text-sm font-medium text-accent hover:text-accent-hover">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Explore by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-accent hover:shadow-md transition-all"
                >
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-accent transition-colors">
                    {getMetafieldValue(category.metadata?.name) || category.title}
                  </h3>
                  {category.metadata?.description && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {getMetafieldValue(category.metadata.description)}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}