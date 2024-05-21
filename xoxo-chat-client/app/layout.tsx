import QueryProvider from '@/QueryProvider';
import Header from '@/app/Header';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import './globals.css';

export const metadata: Metadata = {
  title: 'XoXo Chat',
  description: 'Play and chat'
};

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <Toaster position="top-right" richColors />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex grow flex-col">
            <QueryProvider>{children}</QueryProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
