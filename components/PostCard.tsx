import Link from 'next/link'
import type { Post } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  if (!post) return null;

  const featuredImage = post.metadata?.featured_image;
  const excerpt = getMetafieldValue(post.metadata?.excerpt);
  const postTitle = getMetafieldValue(post.metadata?.title) || post.title;
  const author = post.metadata?.author;
  const category = post.metadata?.category;

  return (
    <article className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl hover:border-accent/30 transition-all duration-300">
      <Link href={`/posts/${post.slug}`} className="block">
        {featuredImage && (
          <div className="aspect-[16/9] overflow-hidden bg-gray-100">
            <img
              src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={postTitle}
              width={400}
              height={225}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-6">
          {category && (
            <span className="inline-block text-xs font-semibold text-accent uppercase tracking-wider mb-3">
              {getMetafieldValue(category.metadata?.name) || category.title}
            </span>
          )}
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-accent transition-colors line-clamp-2">
            {postTitle}
          </h3>
          {excerpt && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{excerpt}</p>
          )}
          {author && (
            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
              {author.metadata?.profile_photo && (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={getMetafieldValue(author.metadata?.name) || author.title}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <span className="text-sm text-gray-700 font-medium">
                {getMetafieldValue(author.metadata?.name) || author.title}
              </span>
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}