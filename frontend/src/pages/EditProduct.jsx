import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getProduct, updateProduct } from '../api'
import ProductForm from '../components/ProductForm'

export default function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getProduct(id)
      .then(res => setProduct(res.data))
      .catch(() => setError('Product not found.'))
  }, [id])

  const handleSubmit = async (data) => {
    setLoading(true)
    setError('')
    try {
      await updateProduct(id, data)
      navigate('/')
    } catch {
      setError('Failed to update product. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Link to="/" className="text-stone-400 hover:text-stone-600 text-sm flex items-center gap-1 mb-4">
          ← Back to catalog
        </Link>
        <h1 className="text-3xl font-bold text-stone-900">Edit Product</h1>
        <p className="text-stone-400 mt-1">Update the details for this product.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm mb-6">
          {error}
        </div>
      )}

      <div className="card p-6">
        {product ? (
          <ProductForm initial={product} onSubmit={handleSubmit} loading={loading} />
        ) : !error ? (
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => <div key={i} className="h-10 bg-stone-100 rounded-lg" />)}
          </div>
        ) : null}
      </div>
    </div>
  )
}
