import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createProduct } from '../api'
import ProductForm from '../components/ProductForm'

export default function AddProduct() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (data) => {
    setLoading(true)
    setError('')
    try {
      await createProduct(data)
      navigate('/')
    } catch {
      setError('Failed to create product. Please try again.')
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
        <h1 className="text-3xl font-bold text-stone-900">Add New Product</h1>
        <p className="text-stone-400 mt-1">Fill in the details below to add a product to your catalog.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm mb-6">
          {error}
        </div>
      )}

      <div className="card p-6">
        <ProductForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  )
}
