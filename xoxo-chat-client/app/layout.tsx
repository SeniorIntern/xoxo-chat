import QueryProvider from '@/QueryProvider';
import type { Metadata } from 'next';
import Header from './Header';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'XoXo Chat',
  description: 'Play and chat'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
