import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { AppShell } from '@/components/app-shell';
import { CartProvider } from '@/lib/cart-context';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { WhatsAppFloat } from '@/components/whatsapp-float';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SweetCreations - Handcrafted Cakes Made with Love',
  description: 'Premium artisan bakery specializing in wedding cakes, birthday cakes, cupcakes, and custom designs. Every celebration deserves a masterpiece.',
  openGraph: {
    title: 'SweetCreations - Handcrafted Cakes Made with Love',
    description: 'Premium artisan bakery specializing in wedding cakes, birthday cakes, cupcakes, and custom designs.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1527488259957-87b412dbd308?w=1200',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1527488259957-87b412dbd308?w=1200',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable} bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <CartProvider>
            <AppShell>{children}</AppShell>
            <WhatsAppFloat />
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
