'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, CheckCircle, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/lib/cart-context';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    delivery_address: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);

    try {
      const earliestDate = items.reduce(
        (min, item) => (new Date(item.deliveryDate) < new Date(min) ? item.deliveryDate : min),
        items[0].deliveryDate
      );

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          delivery_date: earliestDate,
          total,
          items,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        clearCart();
        setTimeout(() => router.push('/'), 5000);
      }
    } catch (error) {
      console.error('Failed to submit order:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 pt-20 dark:bg-zinc-950">
        <div className="mx-auto max-w-md px-6 py-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mb-3 text-2xl font-serif font-bold text-zinc-900 dark:text-zinc-50">
            Order Confirmed!
          </h1>
          <p className="mb-6 text-zinc-600 dark:text-zinc-400">
            Thank you for your order. We have sent a confirmation email with all the details.
            Your delicious treats will be ready for pickup or delivery on your selected date.
          </p>
          <Button asChild className="bg-amber-600 text-white hover:bg-amber-700">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 pt-20 dark:bg-zinc-950">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-serif font-bold text-zinc-900 dark:text-zinc-50">
            Your cart is empty
          </h2>
          <Button asChild className="bg-amber-600 text-white hover:bg-amber-700">
            <Link href="/#products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const inputClass =
    'h-12 rounded-md border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-500 focus:border-amber-500 focus:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-violet-500 dark:focus:ring-violet-500';

  return (
    <div className="min-h-screen bg-zinc-50 pt-20 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group mb-6 inline-flex items-center gap-2 text-zinc-600 hover:text-amber-700 dark:text-zinc-400 dark:hover:text-violet-400"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Continue Shopping
        </Link>

        <h1 className="mb-8 text-3xl font-serif font-bold text-zinc-900 dark:text-zinc-50">
          Checkout
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="rounded-md border border-zinc-200 bg-white p-6 shadow-soft dark:border-zinc-800 dark:bg-zinc-950 md:p-8">
              <h2 className="mb-6 text-xl font-serif font-bold text-zinc-900 dark:text-zinc-50">
                Your Information
              </h2>

              <div className="mb-6 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-medium text-zinc-900 dark:text-zinc-200">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    required
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                    placeholder="Jane Smith"
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-medium text-zinc-900 dark:text-zinc-200">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.customer_email}
                    onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                    placeholder="jane@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mb-6 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-medium text-zinc-900 dark:text-zinc-200">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.customer_phone}
                    onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                    placeholder="(123) 456-7890"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mb-6 space-y-2">
                <Label htmlFor="address" className="font-medium text-zinc-900 dark:text-zinc-200">
                  Delivery Address (optional)
                </Label>
                <Input
                  id="address"
                  value={formData.delivery_address}
                  onChange={(e) => setFormData({ ...formData, delivery_address: e.target.value })}
                  placeholder="123 Main St, City, State 12345"
                  className={inputClass}
                />
                <p className="text-xs text-zinc-500">Leave empty for in-store pickup</p>
              </div>

              <div className="mb-8 space-y-2">
                <Label htmlFor="notes" className="font-medium text-zinc-900 dark:text-zinc-200">
                  Special Instructions
                </Label>
                <Textarea
                  id="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any allergies, special requests, or messages on the cake..."
                  className="resize-none rounded-md border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-500 focus:border-amber-500 focus:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-violet-500 dark:focus:ring-violet-500"
                />
              </div>

              <Button
                type="submit"
                disabled={loading || !formData.customer_name || !formData.customer_email}
                className="w-full rounded-xl bg-amber-600 py-6 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-amber-700 hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Place Order
                  </>
                )}
              </Button>
            </form>
          </div>

          <div>
            <div className="sticky top-24 rounded-md border border-zinc-200 bg-white p-6 shadow-soft dark:border-zinc-800 dark:bg-zinc-950">
              <h2 className="mb-6 text-xl font-serif font-bold text-zinc-900 dark:text-zinc-50">
                Order Summary
              </h2>

              <div className="mb-6 space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-50">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">
                        {item.selectedFlavor} - {item.selectedSize}
                      </p>
                      <p className="text-xs text-amber-600 dark:text-violet-400">
                        {new Date(item.deliveryDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      <p className="text-xs text-zinc-500">x{item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-zinc-200 pt-4 dark:border-zinc-800">
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Delivery</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between border-t border-zinc-200 pt-2 text-xl font-serif font-bold text-zinc-900 dark:border-zinc-800 dark:text-zinc-50">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
