import { useState } from 'react'

const CATEGORIES = ['Clothing', 'Footwear', 'Accessories', 'Bags', 'Other']

export default function ProductForm({ initial = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    name: initial.name || '',
    description: initial.description || '',
    price: initial.price || '',
    category: initial.category || 'Clothing',
    stock: initial.stock ?? 0,
    image_url: initial.image_url || '',
  })

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...form, price: parseFloat(form.price), stock: parseInt(form.stock) })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label>Product Name *</label>
          <input value={form.name} onChange={set('name')} required placeholder="e.g. Classic White T-Shirt" />
        </div>
        <div>
          <label>Price (USD) *</label>
          <input type="number" step="0.01" min="0" value={form.price} onChange={set('price')} required placeholder="0.00" />
        </div>
        <div>
          <label>Category</label>
          <select value={form.category} onChange={set('category')}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label>Stock Quantity</label>
          <input type="number" min="0" value={form.stock} onChange={set('stock')} />
        </div>
      </div>

      <div>
        <label>Description</label>
        <textarea value={form.description} onChange={set('description')} rows={3} placeholder="Brief product description..." />
      </div>

      <div>
        <label>Image URL</label>
        <input value={form.image_url} onChange={set('image_url')} placeholder="https://..." />
        {form.image_url && (
          <div className="mt-2 rounded-lg overflow-hidden w-32 h-24 bg-stone-100">
            <img src={form.image_url} alt="preview" className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
          </div>
        )}
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full py-3">
        {loading ? 'Saving...' : 'Save Product'}
      </button>
    </form>
  )
}
