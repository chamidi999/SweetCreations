'use client';

import { Hero } from '@/components/hero';
import { FeaturedSection } from '@/components/featured-section';
import { CategorySection } from '@/components/category-section';
import { ProductCatalog } from '@/components/product-catalog';
import { TestimonialsSection } from '@/components/testimonials-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { SectionDivider } from '@/components/section-divider';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Hero />
      <SectionDivider from="bg-white dark:bg-zinc-950" to="text-zinc-50 dark:text-zinc-900" accent />
      <FeaturedSection />
      <SectionDivider from="bg-zinc-50 dark:bg-zinc-900" to="text-white dark:text-zinc-950" />
      <CategorySection />
      <SectionDivider from="bg-white dark:bg-zinc-950" to="text-zinc-50 dark:text-zinc-900" accent />
      <ProductCatalog />
      <SectionDivider from="bg-zinc-50 dark:bg-zinc-900" to="text-white dark:text-zinc-950" />
      <TestimonialsSection />
      <SectionDivider from="bg-white dark:bg-zinc-950" to="text-zinc-50 dark:text-zinc-900" accent />
      <ContactSection />
      <SectionDivider from="bg-zinc-50 dark:bg-zinc-900" to="text-white dark:text-zinc-950" />
      <Footer />
    </main>
  );
}
