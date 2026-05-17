export default function About() {
  const team = [
    { name: 'Product Catalog', role: 'Browse and search all available products' },
    { name: 'Add & Edit', role: 'Create new products or update existing ones' },
    { name: 'Categories', role: 'Filter products by Clothing, Footwear, Bags and more' },
    { name: 'Stock Tracking', role: 'Monitor stock levels with visual indicators' },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-14">
        <h1 className="text-5xl font-bold text-stone-900 mb-4">About Clothify</h1>
        <p className="text-stone-500 text-lg leading-relaxed">
          Clothify is a simple and clean product catalog built for managing fashion items.
          Add, edit, and organize your products with ease.
        </p>
      </div>

      {/* What we offer */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-stone-900 mb-6">What we offer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {team.map((item, i) => (
            <div key={i} className="card p-5 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 font-bold text-sm shrink-0">
                {i + 1}
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 mb-1">{item.name}</h3>
                <p className="text-stone-400 text-sm">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-stone-900 mb-6">Tech stack</h2>
        <div className="card divide-y divide-stone-100">
          {[
            { layer: 'Frontend', tech: 'React + Vite + Tailwind CSS', desc: 'Fast, modern UI framework' },
            { layer: 'Backend', tech: 'Node.js + Express', desc: 'REST API server' },
            { layer: 'Database', tech: 'JSON file (catalog.json)', desc: 'Lightweight local data storage' },
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-medium text-stone-900 text-sm">{row.layer}</p>
                <p className="text-stone-400 text-xs mt-0.5">{row.desc}</p>
              </div>
              <span className="text-xs bg-stone-100 text-stone-600 px-3 py-1 rounded-full font-medium">
                {row.tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
