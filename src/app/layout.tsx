import type { Metadata } from 'next';
import { Geist } from 'next/font/google'; // Corrected import for Geist
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { ChatbotWidget } from '@/components/chatbot/ChatbotWidget';
import { Providers } from '@/components/layout/Providers';

const geist = Geist({ // Using default Geist configuration
  subsets: ['latin'],
  variable: '--font-geist-sans', // Ensure this variable is used in body className
});


export const metadata: Metadata = {
  title: 'PsychoSocial Solutions - Gestão de Riscos Psicossociais',
  description: 'Consultoria especializada em saúde ocupacional e conformidade com a NR-1 para gestão de riscos psicossociais.',
  keywords: 'NR-1, riscos psicossociais, saúde ocupacional, consultoria, psicologia organizacional, bem-estar no trabalho',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geist.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <ChatbotWidget />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
