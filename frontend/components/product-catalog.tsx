'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from './product-card';
import { Product } from '@/lib/types';

const categoryLabels: Record<string, string> = {
  all: 'All Products',
  wedding: 'Wedding Cakes',
  birthday: 'Birthday Cakes',
  cupcakes: 'Cupcakes',
  custom: 'Custom Designs',
};

const priceRanges = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'budget', label: 'Under $50', min: 0, max: 50 },
  { id: 'mid', label: '$50 - $100', min: 50, max: 100 },
  { id: 'premium', label: '$100+', min: 100, max: Infinity },
];

export function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const priceRange = priceRanges.find(r => r.id === selectedPriceRange);
      const matchesPrice = product.price >= (priceRange?.min || 0) && product.price <= (priceRange?.max || Infinity);
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, search, selectedCategory, selectedPriceRange]);

  const activeFilters = useMemo(() => {
    const filters: string[] = [];
    if (selectedCategory !== 'all') filters.push(`Category: ${categoryLabels[selectedCategory]}`);
    if (selectedPriceRange !== 'all') {
      const range = priceRanges.find(r => r.id === selectedPriceRange);
      if (range) filters.push(`Price: ${range.label}`);
    }
    return filters;
  }, [selectedCategory, selectedPriceRange]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setSearch('');
  };

  return (
    <section id="products" className="py-20 md:py-32 bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-amber-600 dark:text-violet-400 font-medium text-sm uppercase tracking-widest">
            Our Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-zinc-900 dark:text-zinc-50 mt-3 mb-4">
            Delicious Creations
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Browse our handcrafted selection of cakes and treats, each made with premium ingredients and love
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search for cakes, flavors, designs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 rounded-md border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-500 focus:border-amber-500 focus:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-violet-500 dark:focus:ring-violet-500"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={`h-12 rounded-md border-zinc-200 bg-white px-6 text-zinc-900 hover:bg-amber-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-violet-950/60 ${
              showFilters ? 'border-amber-500 bg-amber-50 dark:border-violet-500 dark:bg-violet-950/70' : ''
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
            {activeFilters.length > 0 && (
              <Badge className="ml-2 bg-amber-600 text-white">{activeFilters.length}</Badge>
            )}
          </Button>
        </div>

        {showFilters && (
          <div className="bg-white p-6 rounded-md border border-zinc-200 shadow-soft mb-8 animate-accordion-down dark:bg-zinc-950 dark:border-zinc-800">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 mb-3">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(categoryLabels).map(([id, label]) => (
                    <Badge
                      key={id}
                      variant={selectedCategory === id ? 'default' : 'outline'}
                      onClick={() => setSelectedCategory(id)}
                      className={`cursor-pointer px-4 py-2 ${
                        selectedCategory === id
                          ? 'bg-amber-600 hover:bg-amber-700 text-white'
                          : 'border-zinc-200 text-zinc-700 hover:bg-amber-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-violet-950/60'
                      }`}
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 mb-3">Price Range</h3>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range) => (
                    <Badge
                      key={range.id}
                      variant={selectedPriceRange === range.id ? 'default' : 'outline'}
                      onClick={() => setSelectedPriceRange(range.id)}
                      className={`cursor-pointer px-4 py-2 ${
                        selectedPriceRange === range.id
                          ? 'bg-amber-600 hover:bg-amber-700 text-white'
                          : 'border-zinc-200 text-zinc-700 hover:bg-amber-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-violet-950/60'
                      }`}
                    >
                      {range.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Active filters:</span>
            {activeFilters.map((filter, i) => (
              <Badge key={i} variant="secondary" className="bg-amber-100 text-amber-700 dark:bg-violet-950 dark:text-violet-200">
                {filter}
              </Badge>
            ))}
            <button
              onClick={clearFilters}
              className="text-sm text-zinc-600 hover:text-amber-700 flex items-center gap-1 dark:text-zinc-400 dark:hover:text-violet-400"
            >
              <X className="w-3 h-3" />
              Clear all
            </button>
          </div>
        )}

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-zinc-950 rounded-2xl overflow-hidden animate-pulse border border-zinc-200 dark:border-zinc-800">
                <div className="aspect-square bg-zinc-200 dark:bg-zinc-800" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
                  <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
                  <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-4 dark:bg-zinc-900">
              <Search className="w-10 h-10 text-zinc-400" />
            </div>
            <h3 className="text-xl font-serif font-bold text-zinc-900 dark:text-zinc-50 mb-2">
              No cakes found
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">Try adjusting your search or filters</p>
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        ) : (
          <>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
