import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProduct, deleteProduct } from '../api'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getProduct(id).then(res => setProduct(res.data)).catch(() => setError('Product not found.'))
  }, [id])

  const handleDelete = async () => {
    if (!confirm(`Delete "${product.name}"?`)) return
    await deleteProduct(id)
    navigate('/')
  }

  if (error) return (
    <div className="text-center py-24 text-stone-400">
      <p className="text-lg font-medium">Product not found</p>
      <Link to="/" className="text-sm text-stone-500 hover:text-stone-700 mt-2 inline-block">← Back to catalog</Link>
    </div>
  )

  if (!product) return (
    <div className="max-w-3xl mx-auto animate-pulse">
      <div className="h-6 bg-stone-100 rounded w-32 mb-8" />
      <div className="card overflow-hidden">
        <div className="h-80 bg-stone-100" />
        <div className="p-8 space-y-4">
          <div className="h-8 bg-stone-100 rounded w-2/3" />
          <div className="h-4 bg-stone-100 rounded w-full" />
          <div className="h-4 bg-stone-100 rounded w-3/4" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/" className="text-stone-400 hover:text-stone-600 text-sm flex items-center gap-1 mb-6">
        ← Back to catalog
      </Link>

      <div className="card overflow-hidden">
        {/* Image */}
        {product.image_url ? (
          <div className="h-80 bg-stone-100 overflow-hidden">
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="h-80 bg-stone-100 flex items-center justify-center text-stone-300">
            <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        <div className="p-8">
          {/* Category badge */}
          {product.category && (
            <span className="inline-block bg-stone-100 text-stone-500 text-xs px-3 py-1 rounded-full font-medium mb-4">
              {product.category}
            </span>
          )}

          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-bold text-stone-900">{product.name}</h1>
            <p className="text-3xl font-bold text-stone-900">${Number(product.price).toFixed(2)}</p>
          </div>

          <p className="text-stone-500 mb-8 leading-relaxed">
            {product.description || 'No description available.'}
          </p>

          {/* Stock */}
          <div className="flex items-center gap-3 mb-8 p-4 bg-stone-50 rounded-xl">
            <span className={`w-3 h-3 rounded-full ${product.stock > 10 ? 'bg-green-400' : product.stock > 0 ? 'bg-amber-400' : 'bg-red-400'}`} />
            <span className="text-stone-600 font-medium text-sm">
              {product.stock > 0 ? `${product.stock} items in stock` : 'Out of stock'}
            </span>
            {product.stock > 0 && product.stock <= 10 && (
              <span className="text-amber-600 text-xs bg-amber-50 px-2 py-0.5 rounded-full">⚠ Low stock</span>
            )}
          </div>

          {/* Added date */}
          <p className="text-stone-400 text-xs mb-8">
            Added on {new Date(product.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <Link to={`/edit/${product.id}`} className="btn-primary flex-1 text-center py-3">
              Edit Product
            </Link>
            <button onClick={handleDelete} className="btn-danger px-6 py-3">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
