const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;
const DB_FILE = path.join(__dirname, 'catalog.json');

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// ── Simple JSON "database" ──────────────────────────
// Reads and writes to catalog.json — no native modules needed!

function readDB() {
  if (!fs.existsSync(DB_FILE)) return { products: [], nextId: 1 };
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Seed with sample data if empty
const initial = readDB();
if (initial.products.length === 0) {
  const seeded = {
    nextId: 23,
    products: [
      { id: 1, name: 'Classic White T-Shirt', description: 'Premium cotton everyday tee', price: 19.99, category: 'Clothing', stock: 50, image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', created_at: new Date().toISOString() },
      { id: 2, name: 'Slim Fit Jeans', description: 'Modern slim fit denim jeans', price: 59.99, category: 'Clothing', stock: 30, image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', created_at: new Date().toISOString() },
      { id: 3, name: 'Running Sneakers', description: 'Lightweight performance sneakers', price: 89.99, category: 'Footwear', stock: 20, image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', created_at: new Date().toISOString() },
      { id: 4, name: 'Leather Wallet', description: 'Slim genuine leather bifold wallet', price: 34.99, category: 'Accessories', stock: 45, image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400', created_at: new Date().toISOString() },
      { id: 5, name: 'Sunglasses', description: 'UV400 polarized sunglasses', price: 49.99, category: 'Accessories', stock: 25, image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', created_at: new Date().toISOString() },
      { id: 6, name: 'Backpack', description: '30L waterproof travel backpack', price: 74.99, category: 'Bags', stock: 15, image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', created_at: new Date().toISOString() },
      { id: 7, name: 'Hoodie', description: 'Comfortable fleece pullover hoodie', price: 44.99, category: 'Clothing', stock: 35, image_url: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400', created_at: new Date().toISOString() },
      { id: 8, name: 'Baseball Cap', description: 'Classic adjustable cotton cap', price: 24.99, category: 'Accessories', stock: 40, image_url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400', created_at: new Date().toISOString() },
      { id: 9, name: 'Ankle Boots', description: 'Genuine leather ankle boots', price: 119.99, category: 'Footwear', stock: 18, image_url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', created_at: new Date().toISOString() },
      { id: 10, name: 'Tote Bag', description: 'Large canvas everyday tote bag', price: 29.99, category: 'Bags', stock: 22, image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400', created_at: new Date().toISOString() },
      { id: 11, name: 'Denim Jacket', description: 'Classic washed denim jacket', price: 79.99, category: 'Clothing', stock: 12, image_url: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=400', created_at: new Date().toISOString() },
      { id: 12, name: 'Watch', description: 'Minimalist leather strap watch', price: 149.99, category: 'Accessories', stock: 8, image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', created_at: new Date().toISOString() },
      { id: 13, name: 'Polo Shirt', description: 'Classic pique cotton polo shirt', price: 39.99, category: 'Clothing', stock: 28, image_url: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400', created_at: new Date().toISOString() },
      { id: 14, name: 'Leather Belt', description: 'Genuine leather dress belt', price: 29.99, category: 'Accessories', stock: 33, image_url: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400', created_at: new Date().toISOString() },
      { id: 15, name: 'Swim Shorts', description: 'Quick-dry beach swim shorts', price: 34.99, category: 'Clothing', stock: 20, image_url: 'https://images.unsplash.com/photo-1565693413579-8ff3fdc1b03b?w=400', created_at: new Date().toISOString() },
      { id: 16, name: 'Sandals', description: 'Comfortable leather strap sandals', price: 54.99, category: 'Footwear', stock: 14, image_url: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400', created_at: new Date().toISOString() },
      { id: 17, name: 'Scarf', description: 'Soft wool blend winter scarf', price: 22.99, category: 'Accessories', stock: 30, image_url: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400', created_at: new Date().toISOString() },
      { id: 18, name: 'Crossbody Bag', description: 'Compact leather crossbody bag', price: 64.99, category: 'Bags', stock: 11, image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400', created_at: new Date().toISOString() },
      { id: 19, name: 'Joggers', description: 'Slim fit cotton jogger pants', price: 49.99, category: 'Clothing', stock: 25, image_url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400', created_at: new Date().toISOString() },
      { id: 20, name: 'Loafers', description: 'Suede slip-on loafer shoes', price: 94.99, category: 'Footwear', stock: 9, image_url: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400', created_at: new Date().toISOString() },
      { id: 21, name: 'Beanie', description: 'Knitted ribbed winter beanie', price: 18.99, category: 'Accessories', stock: 42, image_url: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400', created_at: new Date().toISOString() },
      { id: 22, name: 'Duffle Bag', description: 'Large weekend travel duffle bag', price: 89.99, category: 'Bags', stock: 7, image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', created_at: new Date().toISOString() },
    ]
  };
  writeDB(seeded);
}

// ── ROUTES ──────────────────────────────────────────

// GET all products (with optional search & category filter)
app.get('/api/products', (req, res) => {
  const { search, category } = req.query;
  let { products } = readDB();

  if (search) {
    const s = search.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(s) || (p.description || '').toLowerCase().includes(s)
    );
  }
  if (category && category !== 'All') {
    products = products.filter(p => p.category === category);
  }

  res.json(products.reverse());
});

// GET single product
app.get('/api/products/:id', (req, res) => {
  const { products } = readDB();
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// GET all categories
app.get('/api/categories', (req, res) => {
  const { products } = readDB();
  const cats = [...new Set(products.map(p => p.category).filter(Boolean))].sort();
  res.json(cats);
});

// POST create product
app.post('/api/products', (req, res) => {
  const { name, description, price, category, stock, image_url } = req.body;
  if (!name || !price) return res.status(400).json({ error: 'Name and price are required' });

  const db = readDB();
  const product = {
    id: db.nextId++,
    name, description,
    price: parseFloat(price),
    category,
    stock: parseInt(stock) || 0,
    image_url: image_url || '',
    created_at: new Date().toISOString()
  };
  db.products.push(product);
  writeDB(db);
  res.status(201).json(product);
});

// PUT update product
app.put('/api/products/:id', (req, res) => {
  const db = readDB();
  const index = db.products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  db.products[index] = { ...db.products[index], ...req.body, id: db.products[index].id };
  writeDB(db);
  res.json(db.products[index]);
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
  const db = readDB();
  const index = db.products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  db.products.splice(index, 1);
  writeDB(db);
  res.json({ message: 'Product deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
