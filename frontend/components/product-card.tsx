'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

const categoryLabels: Record<string, string> = {
  wedding: 'Wedding',
  birthday: 'Birthday',
  cupcakes: 'Cupcakes',
  custom: 'Custom',
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group">
      <motion.div
        className="h-full overflow-hidden rounded-md border border-zinc-200 bg-white shadow-soft transition-colors duration-300 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-200/40 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-violet-700/70 dark:hover:shadow-violet-950/20"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium uppercase tracking-widest text-zinc-800 capitalize dark:bg-zinc-950/90 dark:text-zinc-200">
              {categoryLabels[product.category]}
            </span>
          </div>
          {product.is_featured && (
            <div className="absolute top-3 right-3">
              <span className="flex items-center gap-1 px-2 py-1 bg-amber-600 text-white text-xs font-medium rounded-full dark:bg-violet-500">
                <Star className="w-3 h-3 fill-current" />
                Featured
              </span>
            </div>
          )}
          <button
            className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 text-zinc-900 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-amber-600 hover:text-white shadow-lg dark:bg-zinc-950/90 dark:text-zinc-100 dark:hover:bg-violet-500"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="font-serif font-bold text-zinc-900 mb-1 group-hover:text-amber-700 transition-colors line-clamp-1 dark:text-zinc-50 dark:group-hover:text-violet-300">
            {product.name}
          </h3>
          <p className="text-sm text-zinc-600 mb-3 line-clamp-2 flex-1 dark:text-zinc-400">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-200 dark:border-zinc-800">
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-500">
              {product.flavors.length} flavors
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
