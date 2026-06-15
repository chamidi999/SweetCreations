'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';

export function FeaturedSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      const featured = data.filter((p: Product) => p.is_featured).slice(0, 4);
      setProducts(featured);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || products.length === 0) return null;

  return (
    <section className="py-16 bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-between mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <div>
            <span className="text-amber-600 dark:text-violet-400 font-medium text-sm uppercase tracking-widest">
              Customer Favorites
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900 dark:text-zinc-50 mt-2">
              Featured Creations
            </h2>
          </div>
          <Button
            asChild
            variant="ghost"
            className="hidden sm:flex items-center gap-2 text-amber-600 hover:bg-amber-50 hover:text-amber-700 dark:text-violet-400 dark:hover:bg-violet-950/60 dark:hover:text-violet-200"
          >
            <Link href="/#products">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.42, delay: index * 0.07, ease: 'easeOut' }}
            >
              <Link
                href={`/product/${product.id}`}
                className="group block overflow-hidden rounded-md border border-zinc-200 bg-white shadow-soft hover:border-amber-300 hover:shadow-elegant transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-violet-800/70"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute top-3 left-3">
                    <span className="flex items-center gap-1 px-2 py-1 bg-amber-600 text-white text-xs font-semibold uppercase tracking-widest rounded-full dark:bg-violet-600">
                      <Star className="w-3 h-3 fill-current" />
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-bold text-zinc-900 group-hover:text-amber-700 transition-colors line-clamp-1 dark:text-zinc-50 dark:group-hover:text-violet-300">
                    {product.name}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                    <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-amber-600 dark:text-violet-400 font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
