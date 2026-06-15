'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { CartSidebar } from '@/components/cart-sidebar';
import { Header } from '@/components/header';

export function AppShell({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <>
      <Header />
      {children}
      <CartSidebar onCheckout={() => router.push('/checkout')} />
    </>
  );
}
