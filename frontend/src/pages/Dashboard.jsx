import { useState, useEffect } from 'react'
import { getProducts, getCategories } from '../api'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getProducts(), getCategories()]).then(([p, c]) => {
      setProducts(p.data)
      setCategories(c.data)
      setLoading(false)
    })
  }, [])

  const totalProducts = products.length
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
  const outOfStock = products.filter(p => p.stock === 0).length
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 10).length
  const avgPrice = products.length ? (products.reduce((s, p) => s + p.price, 0) / products.length).toFixed(2) : '0.00'
  const mostExpensive = products.length ? products.reduce((a, b) => a.price > b.price ? a : b) : null

  const statCards = [
    { label: 'Total Products', value: totalProducts, color: 'bg-blue-50 text-blue-700' },
    { label: 'Total Categories', value: categories.length, color: 'bg-purple-50 text-purple-700' },
    { label: 'Total Stock', value: totalStock, color: 'bg-green-50 text-green-700' },
    { label: 'Avg Price', value: `$${avgPrice}`, color: 'bg-amber-50 text-amber-700' },
    { label: 'Low Stock Items', value: lowStock, color: 'bg-orange-50 text-orange-700' },
    { label: 'Out of Stock', value: outOfStock, color: 'bg-red-50 text-red-700' },
  ]

  // Products per category
  const byCategory = categories.map(cat => ({
    name: cat,
    count: products.filter(p => p.category === cat).length,
    stock: products.filter(p => p.category === cat).reduce((s, p) => s + p.stock, 0),
  }))

  if (loading) return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-stone-100 rounded w-48" />
      <div className="grid grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => <div key={i} className="h-24 bg-stone-100 rounded-2xl" />)}
      </div>
    </div>
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-stone-900 mb-1">Dashboard</h1>
        <p className="text-stone-400">Overview of your product catalog</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
        {statCards.map((s, i) => (
          <div key={i} className="card p-5">
            <p className="text-stone-400 text-sm mb-2">{s.label}</p>
            <p className={`text-3xl font-bold rounded-lg inline-block px-2 py-0.5 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* By category table */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-stone-900 mb-4">Products by category</h2>
        <div className="card divide-y divide-stone-100">
          {byCategory.map((cat, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3">
              <span className="font-medium text-stone-700 text-sm">{cat.name}</span>
              <div className="flex items-center gap-6">
                <span className="text-stone-400 text-sm">{cat.count} product{cat.count !== 1 ? 's' : ''}</span>
                <span className="text-stone-400 text-sm">{cat.stock} in stock</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Most expensive */}
      {mostExpensive && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-stone-900 mb-4">Most expensive product</h2>
          <div className="card p-5 flex items-center gap-4">
            {mostExpensive.image_url && (
              <img src={mostExpensive.image_url} alt={mostExpensive.name} className="w-16 h-16 object-cover rounded-lg" />
            )}
            <div className="flex-1">
              <p className="font-semibold text-stone-900">{mostExpensive.name}</p>
              <p className="text-stone-400 text-sm">{mostExpensive.category}</p>
            </div>
            <p className="text-2xl font-bold text-stone-900">${mostExpensive.price.toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* Low stock warnings */}
      {(lowStock > 0 || outOfStock > 0) && (
        <div>
          <h2 className="text-xl font-bold text-stone-900 mb-4">Stock warnings</h2>
          <div className="space-y-2">
            {products.filter(p => p.stock <= 10).sort((a, b) => a.stock - b.stock).map(p => (
              <div key={p.id} className="card px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${p.stock === 0 ? 'bg-red-500' : 'bg-amber-400'}`} />
                  <span className="font-medium text-stone-700 text-sm">{p.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${p.stock === 0 ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-700'}`}>
                    {p.stock === 0 ? 'Out of stock' : `${p.stock} left`}
                  </span>
                  <Link to={`/edit/${p.id}`} className="text-xs text-stone-400 hover:text-stone-700">Edit →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
