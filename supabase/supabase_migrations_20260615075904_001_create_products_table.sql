-- Create products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('wedding', 'birthday', 'cupcakes', 'custom')),
  flavors TEXT[] DEFAULT ARRAY['Chocolate', 'Vanilla', 'Red Velvet'],
  sizes TEXT[] DEFAULT ARRAY['1kg', '2kg', '3kg'],
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  delivery_date DATE NOT NULL,
  delivery_address TEXT,
  notes TEXT,
  total DECIMAL(10,2) NOT NULL,
  items JSONB NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create inquiries table
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  image_url TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Products are publicly readable
CREATE POLICY "products_public_read" ON products FOR SELECT
  TO anon, authenticated USING (true);

-- Orders can be created by anyone (public checkout)
CREATE POLICY "orders_public_insert" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Inquiries can be created by anyone
CREATE POLICY "inquiries_public_insert" ON inquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);