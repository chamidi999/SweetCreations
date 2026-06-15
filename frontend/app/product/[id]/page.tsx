'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Check, Heart, ShoppingBag, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { Product } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ProductPageProps {
  params: { id: string };
}

const categoryLabels: Record<string, string> = {
  wedding: 'Wedding Cakes',
  birthday: 'Birthday Cakes',
  cupcakes: 'Cupcakes',
  custom: 'Custom Designs',
};

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  useEffect(() => {
    if (!product) return;

    setSelectedFlavor(product.flavors[0] || '');
    setSelectedSize(product.sizes[0] || '');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow.toISOString().split('T')[0]);
  }, [product]);

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleAddToCart = () => {
    if (!product || !selectedFlavor || !selectedSize || !selectedDate) return;

    addItem(product, selectedFlavor, selectedSize, selectedDate);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded mb-6" />
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
              <div className="space-y-4">
                <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4" />
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
                <div className="space-y-2 mt-6">
                  <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded" />
                  <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded" />
                  <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-20 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Product not found
          </h2>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/#products"
          className="inline-flex items-center gap-2 text-zinc-600 hover:text-amber-700 dark:text-zinc-400 dark:hover:text-violet-400 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-start">
          <motion.div
            className="relative rounded-md border border-zinc-200 bg-white p-3 shadow-2xl shadow-zinc-200/70 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/30"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <div className="aspect-square rounded-sm overflow-hidden bg-zinc-100 dark:bg-zinc-900">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.is_featured && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-amber-600 text-white px-4 py-1.5 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  Featured
                </Badge>
              </div>
            )}
          </motion.div>

          <motion.div
            className="rounded-md border border-zinc-200 bg-white p-6 md:p-8 lg:py-8 dark:border-zinc-800 dark:bg-zinc-950/70"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
          >
            <div className="mb-4">
              <Badge variant="outline" className="text-amber-700 border-amber-200 uppercase tracking-widest dark:text-violet-200 dark:border-violet-800/70">
                {categoryLabels[product.category]}
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-zinc-600 dark:text-zinc-400">starting price</span>
            </div>

            <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-7">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-700 dark:text-zinc-300 mb-3">
                  Select Size
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        'px-6 py-3 rounded-md border font-medium transition-all duration-200',
                        selectedSize === size
                          ? 'border-amber-600 bg-amber-600 text-white dark:border-violet-500 dark:bg-violet-950/80 dark:text-violet-100'
                          : 'border-zinc-200 text-zinc-700 hover:border-amber-400 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-violet-700'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-700 dark:text-zinc-300 mb-3">
                  Select Flavor
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.flavors.map((flavor) => (
                    <button
                      key={flavor}
                      onClick={() => setSelectedFlavor(flavor)}
                      className={cn(
                        'px-5 py-2.5 rounded-md border font-medium transition-all duration-200',
                        selectedFlavor === flavor
                          ? 'border-amber-600 bg-amber-600 text-white dark:border-violet-500 dark:bg-violet-950/80 dark:text-violet-100'
                          : 'border-zinc-200 text-zinc-700 hover:border-amber-400 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-violet-700'
                      )}
                    >
                      {flavor}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-700 dark:text-zinc-300 mb-3">
                  <Calendar className="w-4 h-4 inline-block mr-2" />
                  Pickup/Delivery Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={getMinDate()}
                  className="w-full sm:w-auto px-4 py-3 rounded-md border border-zinc-200 bg-white text-zinc-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-violet-500 dark:focus:ring-violet-950"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                onClick={handleAddToCart}
                disabled={!selectedFlavor || !selectedSize || !selectedDate}
                className={cn(
                  'flex-1 py-6 text-lg font-semibold rounded-md transition-all duration-300',
                  addedToCart
                    ? 'bg-green-500 hover:bg-green-500'
                    : 'bg-amber-600 hover:bg-amber-700'
                )}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="px-6 py-6 rounded-md border border-zinc-200 hover:bg-amber-50 dark:border-zinc-800 dark:hover:bg-violet-950/60"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                {['Fresh ingredients daily', 'Made to order', 'Custom flavors available', 'Delivery available'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center dark:bg-violet-950/70 dark:border-violet-800">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-zinc-600 dark:text-zinc-400">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
