'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { cn } from '@/lib/utils';

interface CartSidebarProps {
  onCheckout: () => void;
}

export function CartSidebar({ onCheckout }: CartSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener('toggle-cart', handleToggle);
    return () => window.removeEventListener('toggle-cart', handleToggle);
  }, []);

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-full bg-white shadow-2xl transition-transform duration-300 ease-out dark:bg-zinc-950 sm:w-96',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-zinc-200 p-6 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-5 w-5 text-amber-600 dark:text-violet-400" />
              <h2 className="text-xl font-serif font-bold text-zinc-900 dark:text-zinc-50">
                Your Cart
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900"
              aria-label="Close cart"
            >
              <X className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
                  <ShoppingBag className="h-8 w-8 text-zinc-400" />
                </div>
                <p className="mb-2 font-medium text-zinc-700 dark:text-zinc-300">Your cart is empty</p>
                <p className="text-sm text-zinc-500">
                  Add some delicious treats to get started!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.selectedFlavor}-${item.selectedSize}-${item.deliveryDate}`}
                    className="flex gap-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-medium text-zinc-900 dark:text-zinc-50">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {item.selectedFlavor} - {item.selectedSize}
                      </p>
                      <p className="mt-1 text-xs text-amber-600 dark:text-violet-400">
                        Pickup: {new Date(item.deliveryDate).toLocaleDateString()}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 transition-colors hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3 text-zinc-700 dark:text-zinc-300" />
                          </button>
                          <span className="w-8 text-center font-medium text-zinc-900 dark:text-zinc-50">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 transition-colors hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3 text-zinc-700 dark:text-zinc-300" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeItem(index)}
                            className="p-1 text-zinc-500 transition-colors hover:text-red-500"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Subtotal</span>
                <span className="text-2xl font-serif font-bold text-zinc-900 dark:text-zinc-50">
                  {formatPrice(total)}
                </span>
              </div>
              <Button
                onClick={() => {
                  setIsOpen(false);
                  onCheckout();
                }}
                className="w-full rounded-xl bg-amber-600 py-6 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-amber-700 hover:shadow-xl"
              >
                Proceed to Checkout
              </Button>
              <button
                onClick={clearCart}
                className="mt-3 w-full py-2 text-sm font-medium text-zinc-600 transition-colors hover:text-red-500 dark:text-zinc-400"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
