'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, Cake, Phone, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#products', label: 'Products' },
  { href: '/#categories', label: 'Categories' },
  { href: '/#contact', label: 'Contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { itemCount } = useCart();
  const isDark = mounted && theme === 'dark';

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300',
        scrolled
          ? isDark
            ? 'border-zinc-800 bg-zinc-950/90 shadow-soft backdrop-blur-md'
            : 'border-zinc-200 bg-white/90 shadow-soft backdrop-blur-md'
          : isDark
            ? 'border-zinc-900/70 bg-zinc-950 backdrop-blur-sm'
            : 'border-zinc-200/70 bg-white/70 backdrop-blur-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-md border border-amber-300/70 bg-gradient-to-br from-amber-500 to-orange-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 dark:border-violet-400/40 dark:from-violet-500 dark:to-purple-700">
              <Cake className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-serif font-bold text-zinc-900 dark:text-zinc-50">
              Sweet<span className="text-amber-600 dark:text-violet-400">Creations</span>
            </span>
          </Link>

          <nav
            className={cn(
              'hidden md:flex items-center gap-10 rounded-full border px-6 py-3 shadow-sm',
              isDark ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-200 bg-white'
            )}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm uppercase tracking-widest font-medium transition-colors relative group',
                  isDark ? 'text-zinc-200 hover:text-violet-300' : 'text-zinc-700 hover:text-amber-700'
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full dark:bg-violet-500" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="tel:+1234567890"
              className={cn(
                'hidden sm:flex items-center gap-2 text-sm transition-colors',
                isDark ? 'text-zinc-200 hover:text-violet-300' : 'text-zinc-700 hover:text-amber-700'
              )}
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">(123) 456-7890</span>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              className={cn(
                'relative border',
                isDark
                  ? 'border-zinc-800 bg-zinc-900 text-zinc-100 hover:bg-violet-950 hover:text-violet-200'
                  : 'border-zinc-200 bg-white text-zinc-800 hover:bg-amber-50 hover:text-amber-700'
              )}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {mounted && theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'relative border',
                isDark
                  ? 'border-zinc-800 bg-zinc-900 hover:bg-violet-950'
                  : 'border-zinc-200 bg-white hover:bg-amber-50'
              )}
              onClick={() => {
                const event = new CustomEvent('toggle-cart');
                window.dispatchEvent(event);
              }}
            >
              <ShoppingBag className={cn('w-5 h-5', isDark ? 'text-zinc-100' : 'text-zinc-800')} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-600 text-white text-xs font-bold rounded-full flex items-center justify-center animate-scale-in dark:bg-violet-500">
                  {itemCount}
                </span>
              )}
            </Button>

            <button
              className="md:hidden p-2 text-zinc-800 dark:text-zinc-100"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <nav className="md:hidden py-4 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-zinc-700 hover:bg-amber-50 hover:text-amber-700 rounded-lg transition-colors font-medium dark:text-zinc-300 dark:hover:bg-violet-950/60 dark:hover:text-violet-300"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
