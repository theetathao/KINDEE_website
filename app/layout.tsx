import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KIN DEE — Authentic Southeast Asian Food',
  description: 'Premium Southeast Asian food products crafted with authentic flavor, quality ingredients and care.',
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
