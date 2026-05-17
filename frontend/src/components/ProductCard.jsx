import { Link } from 'react-router-dom'
import { deleteProduct } from '../api'

export default function ProductCard({ product, onDelete }) {
  const handleDelete = async () => {
    if (!confirm(`Delete "${product.name}"?`)) return
    try {
      await deleteProduct(product.id)
      onDelete(product.id)
    } catch {
      alert('Failed to delete product.')
    }
  }

  const isLowStock = product.stock > 0 && product.stock <= 10
  const isOutOfStock = product.stock === 0

  return (
    <div className="card group hover:shadow-md transition-shadow duration-300">
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-stone-100 h-52">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.style.display = 'none' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {product.category && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-stone-600 text-xs px-2.5 py-1 rounded-full font-medium">
            {product.category}
          </span>
        )}
        {isLowStock && (
          <span className="absolute top-3 right-3 bg-amber-400 text-amber-900 text-xs px-2.5 py-1 rounded-full font-medium">
            ⚠ Low stock
          </span>
        )}
        {isOutOfStock && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2.5 py-1 rounded-full font-medium">
            Out of stock
          </span>
        )}
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-stone-900 text-base leading-snug mb-1 truncate hover:text-stone-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-stone-400 text-sm mb-3 line-clamp-2 min-h-[2.5rem]">
          {product.description || 'No description'}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-stone-900">
            ${Number(product.price).toFixed(2)}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            product.stock > 10
              ? 'bg-green-50 text-green-700'
              : product.stock > 0
              ? 'bg-amber-50 text-amber-700'
              : 'bg-red-50 text-red-600'
          }`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>

        <div className="flex gap-2">
          <Link to={`/edit/${product.id}`} className="flex-1 text-center btn-secondary text-sm py-2">
            Edit
          </Link>
          <button onClick={handleDelete} className="btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
