import QueryProvider from '@/QueryProvider';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import Header from './Header';
import './globals.css';

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
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex grow flex-col">
            <QueryProvider>{children}</QueryProvider>
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
