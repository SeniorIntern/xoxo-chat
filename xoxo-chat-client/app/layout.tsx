import QueryProvider from '@/QueryProvider';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
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
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
            style: {
              background: '#363636',
              color: '#fff'
            }
          }}
        />
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
