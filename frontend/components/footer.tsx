'use client';

import Link from 'next/link';
import { Cake, MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-md border border-amber-300/70 bg-gradient-to-br from-amber-500 to-orange-700 flex items-center justify-center shadow-lg dark:border-violet-400/40 dark:from-violet-500 dark:to-purple-700">
                <Cake className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-serif font-bold">
                Sweet<span className="text-amber-600 dark:text-violet-400">Creations</span>
              </span>
            </Link>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Handcrafted cakes and pastries made with love. Every creation tells a story, and every bite is a memory.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-md border border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-600 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-violet-500/60 dark:hover:bg-violet-950/70 dark:hover:text-white"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-md border border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-600 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-violet-500/60 dark:hover:bg-violet-950/70 dark:hover:text-white"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-md border border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-600 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 transition-colors dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-violet-500/60 dark:hover:bg-violet-950/70 dark:hover:text-white"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold mb-6 text-zinc-900 dark:text-zinc-100">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#products" className="text-zinc-600 hover:text-amber-700 transition-colors dark:text-zinc-400 dark:hover:text-violet-400">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="text-zinc-600 hover:text-amber-700 transition-colors dark:text-zinc-400 dark:hover:text-violet-400">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-zinc-600 hover:text-amber-700 transition-colors dark:text-zinc-400 dark:hover:text-violet-400">
                  Custom Orders
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-600 hover:text-amber-700 transition-colors dark:text-zinc-400 dark:hover:text-violet-400">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold mb-6 text-zinc-900 dark:text-zinc-100">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#products?category=wedding" className="text-zinc-600 hover:text-amber-700 transition-colors dark:text-zinc-400 dark:hover:text-violet-400">
                  Wedding Cakes
                </Link>
              </li>
              <li>
                <Link href="/#products?category=birthday" className="text-zinc-600 hover:text-amber-700 transition-colors dark:text-zinc-400 dark:hover:text-violet-400">
                  Birthday Cakes
                </Link>
              </li>
              <li>
                <Link href="/#products?category=cupcakes" className="text-zinc-600 hover:text-amber-700 transition-colors dark:text-zinc-400 dark:hover:text-violet-400">
                  Cupcakes
                </Link>
              </li>
              <li>
                <Link href="/#products?category=custom" className="text-zinc-600 hover:text-amber-700 transition-colors dark:text-zinc-400 dark:hover:text-violet-400">
                  Custom Designs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold mb-6 text-zinc-900 dark:text-zinc-100">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 dark:text-violet-400" />
                <span className="text-zinc-600 dark:text-zinc-400">
                  123 Baker Street<br />
                  Sweetville, SW 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-600 dark:text-violet-400" />
                <a href="tel:+1234567890" className="text-zinc-600 hover:text-amber-700 transition-colors dark:text-zinc-400 dark:hover:text-violet-400">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-600 dark:text-violet-400" />
                <a href="mailto:hello@sweetcreations.com" className="text-zinc-600 hover:text-amber-700 transition-colors dark:text-zinc-400 dark:hover:text-violet-400">
                  hello@sweetcreations.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5 dark:text-violet-400" />
                <span className="text-zinc-600 dark:text-zinc-400">
                  Mon - Sat: 9am - 7pm<br />
                  Sun: 10am - 5pm
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            &copy; {new Date().getFullYear()} SweetCreations. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-zinc-500 hover:text-amber-700 transition-colors dark:hover:text-violet-400">
              Privacy Policy
            </Link>
            <Link href="#" className="text-zinc-500 hover:text-amber-700 transition-colors dark:hover:text-violet-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
