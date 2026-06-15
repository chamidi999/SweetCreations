'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Bride',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    quote: 'SweetCreations made our wedding absolutely magical. The cake was not just beautiful - it was the most delicious cake our guests had ever tasted!',
    rating: 5,
  },
  {
    name: 'David Chen',
    role: 'Father of the Birthday Boy',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    quote: 'My son wanted a superhero cake and they delivered beyond our expectations. The attention to detail was incredible. A new family tradition!',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Event Planner',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    quote: 'As an event planner, I have worked with many bakeries. SweetCreations stands out for their professionalism, creativity, and absolutely stunning work.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <span className="text-amber-600 dark:text-violet-400 font-medium text-sm uppercase tracking-widest">
            Love from Our Customers
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-zinc-900 dark:text-zinc-50 mt-3 mb-4">
            What People Say About Us
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our happy customers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-md border border-zinc-200 p-6 md:p-8 shadow-soft hover:border-amber-300 hover:shadow-elegant transition-colors duration-300 relative dark:bg-zinc-950 dark:border-zinc-800 dark:hover:border-violet-800/70"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.42, delay: index * 0.07, ease: 'easeOut' }}
            >
              <Quote className="w-10 h-10 text-amber-200 absolute top-6 right-6 dark:text-violet-900" />

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                ))}
              </div>

              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6 relative z-10">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">{testimonial.name}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
