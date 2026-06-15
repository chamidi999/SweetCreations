'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Cake, PartyPopper, Crown, Palette } from 'lucide-react';

const categories = [
  {
    id: 'wedding',
    name: 'Wedding Cakes',
    description: 'Elegant multi-tiered masterpieces for your special day',
    image: 'https://images.unsplash.com/photo-1527488259957-87b412dbd308?w=600',
    icon: Crown,
    color: 'from-amber-400 to-orange-600',
  },
  {
    id: 'birthday',
    name: 'Birthday Cakes',
    description: 'Fun, colorful creations that make celebrations memorable',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600',
    icon: PartyPopper,
    color: 'from-amber-400 to-rose-500',
  },
  {
    id: 'cupcakes',
    name: 'Cupcakes',
    description: 'Perfectly portioned treats in irresistible flavors',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600',
    icon: Cake,
    color: 'from-orange-500 to-amber-700',
  },
  {
    id: 'custom',
    name: 'Custom Designs',
    description: 'Your vision brought to life by our master bakers',
    image: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=600',
    icon: Palette,
    color: 'from-stone-400 to-amber-600',
  },
];

export function CategorySection() {
  return (
    <section id="categories" className="py-20 md:py-32 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <span className="text-amber-600 dark:text-violet-400 font-medium text-sm uppercase tracking-widest">
            Our Specialties
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-zinc-900 dark:text-zinc-50 mt-3 mb-4">
            Explore Our Categories
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            From intimate gatherings to grand celebrations, discover the perfect cake for every occasion
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
              >
                <Link
                  href={`/#products?category=${category.id}`}
                  className="group relative block overflow-hidden rounded-md border border-zinc-200 aspect-[3/4] cursor-pointer bg-white dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="absolute inset-0">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <div className={`w-12 h-12 rounded-md bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-serif font-bold mb-2">{category.name}</h3>
                    <p className="text-white/80 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {category.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-amber-200 group-hover:text-amber-100 transition-colors dark:text-violet-300 dark:group-hover:text-violet-400">
                      Explore
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
