/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CakeSlice, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const heroSlides = [
  {
    src: 'https://images.unsplash.com/photo-1527488259957-87b412dbd308?w=800',
    alt: 'Elegant wedding cake with floral details',
  },
  {
    src: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
    alt: 'Luxury chocolate gateau cake',
  },
  {
    src: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800',
    alt: 'Premium cupcakes with strawberry frosting',
  },
];

const heroStats = [
  { value: '15+', label: 'Years crafting cakes' },
  { value: '5000+', label: 'Celebrations served' },
  { value: '50+', label: 'Signature flavors' },
];

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden bg-white pt-24 dark:bg-zinc-950">
      <AnimatePresence mode="wait">
        <motion.img
          key={heroSlides[activeSlide].src}
          src={heroSlides[activeSlide].src}
          alt={heroSlides[activeSlide].alt}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.25, ease: 'easeOut' }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-zinc-950/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/78 to-zinc-950/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-zinc-950/45" />

      <div className="relative z-10 flex min-h-[calc(92vh-6rem)] items-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-zinc-950/70 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-white shadow-lg backdrop-blur dark:border-violet-500/40"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
            >
              <Sparkles className="h-4 w-4 text-amber-300 dark:text-violet-300" />
              <span>Luxury cakes for unforgettable moments</span>
            </motion.div>

            <motion.h1
              className="mb-6 max-w-4xl text-5xl font-bold leading-[1.02] text-white drop-shadow-[0_4px_22px_rgba(0,0,0,0.65)] sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18, ease: 'easeOut' }}
            >
              SweetCreations
              <span className="block text-amber-100 dark:text-violet-200">Cakes made to be remembered.</span>
            </motion.h1>

            <motion.p
              className="mb-8 max-w-2xl text-base font-medium leading-8 text-zinc-100 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] sm:text-lg"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.26, ease: 'easeOut' }}
            >
              Bespoke wedding cakes, celebration centerpieces, and gourmet cupcakes crafted with premium ingredients,
              refined design, and a flawless finish.
            </motion.p>

            <motion.div
              className="flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.34, ease: 'easeOut' }}
            >
              <Button
                asChild
                size="lg"
                className="h-14 rounded-md bg-amber-600 px-7 text-base font-semibold text-white shadow-lg shadow-amber-950/30 hover:bg-amber-700"
              >
                <Link href="/#products">
                  Shop Cakes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 rounded-md border-white/50 bg-white/15 px-7 text-base font-semibold text-white backdrop-blur hover:bg-white/25 hover:text-white dark:border-zinc-600 dark:bg-zinc-950/40 dark:hover:bg-zinc-900"
              >
                <Link href="/#contact">
                  <CakeSlice className="mr-2 h-5 w-5" />
                  Custom Order
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-28 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 sm:bottom-32">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show hero slide ${index + 1}`}
            onClick={() => setActiveSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              activeSlide === index
                ? 'w-8 bg-white shadow-[0_0_18px_rgba(255,255,255,0.55)]'
                : 'w-2.5 bg-white/45 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      <div className="relative z-10 border-t border-zinc-200 bg-white shadow-[0_-12px_34px_rgba(0,0,0,0.12)] dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {heroStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="border-zinc-200 py-5 sm:border-l sm:first:border-l-0 dark:border-zinc-800"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 + index * 0.08, ease: 'easeOut' }}
            >
              <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{stat.value}</p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
