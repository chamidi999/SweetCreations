'use client';

const WHATSAPP_URL =
  'https://wa.me/94771234567?text=Hi%20SweetCreations!%20I%27d%20like%20to%20inquire%20about%20ordering%20a%20cake.';

export function WhatsAppFloat() {
  return (
    <button
      type="button"
      aria-label="Chat with SweetCreations on WhatsApp"
      onClick={() => window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer')}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#25D366] p-4 text-white shadow-lg shadow-emerald-950/25 transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-20" />
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="relative h-7 w-7 fill-current"
      >
        <path d="M16.02 3.2A12.76 12.76 0 0 0 5.18 22.72L3.6 28.8l6.23-1.52A12.74 12.74 0 1 0 16.02 3.2Zm0 23.2a10.2 10.2 0 0 1-5.2-1.42l-.37-.22-3.68.9.94-3.58-.24-.38a10.19 10.19 0 1 1 8.55 4.7Zm5.6-7.64c-.3-.15-1.8-.9-2.08-1-.28-.1-.48-.15-.68.15-.2.3-.78 1-.96 1.18-.18.2-.35.22-.66.08-.3-.15-1.28-.47-2.44-1.5a9.12 9.12 0 0 1-1.7-2.1c-.18-.3-.02-.46.13-.61.14-.14.3-.35.46-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.64-.94-2.25-.25-.58-.5-.5-.68-.51h-.58c-.2 0-.52.07-.8.37-.28.3-1.05 1.02-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.8-.73 2.05-1.44.25-.7.25-1.31.18-1.44-.08-.13-.28-.2-.58-.35Z" />
      </svg>
    </button>
  );
}
