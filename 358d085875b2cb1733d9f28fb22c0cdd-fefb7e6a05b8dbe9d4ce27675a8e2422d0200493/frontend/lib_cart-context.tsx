'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '@/lib/types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, flavor: string, size: string, date: string) => void;
  removeItem: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sweetcreations-cart');
    if (saved) {
      setItems(JSON.parse(saved));
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('sweetcreations-cart', JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const addItem = (product: Product, flavor: string, size: string, date: string) => {
    setItems(prev => {
      const existing = prev.findIndex(
        item =>
          item.product.id === product.id &&
          item.selectedFlavor === flavor &&
          item.selectedSize === size &&
          item.deliveryDate === date
      );
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing].quantity += 1;
        return updated;
      }
      return [...prev, { product, quantity: 1, selectedFlavor: flavor, selectedSize: size, deliveryDate: date }];
    });
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(index);
      return;
    }
    setItems(prev => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
