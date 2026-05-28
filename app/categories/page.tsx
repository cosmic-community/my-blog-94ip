import Link from 'next/link'
import { getAllCategories, getMetafieldValue } from '@/lib/cosmic'

export const metadata = {
  title: 'Categories - My Blog',
}

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">Categories</h1>
        <p className="text-lg text-gray-600">Browse articles by topic</p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600">No categories available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const name = getMetafieldValue(category.metadata?.name) || category.title
            const description = getMetafieldValue(category.metadata?.description)

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group bg-white rounded-xl border border-gray-200 p-8 hover:shadow-xl hover:border-accent/30 transition-all"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-accent transition-colors">
                  {name}
                </h3>
                {description && (
                  <p className="text-gray-600 leading-relaxed">{description}</p>
                )}
                <div className="mt-4 text-accent text-sm font-medium">
                  View articles →
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}