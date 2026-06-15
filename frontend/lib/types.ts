export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: 'wedding' | 'birthday' | 'cupcakes' | 'custom';
  flavors: string[];
  sizes: string[];
  is_featured: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFlavor: string;
  selectedSize: string;
  deliveryDate: string;
}

export interface OrderInput {
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  delivery_date: string;
  delivery_address?: string;
  notes?: string;
  total: number;
  items: CartItem[];
}

export interface InquiryInput {
  name: string;
  email: string;
  message: string;
  image_url?: string;
}
