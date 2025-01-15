import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Background } from '@/components/background';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Kerroucha Sarim Abdelbari | Full Stack Developer',
    template: '%s | Kerroucha Sarim Abdelbari',
  },
  description: 'Portfolio of Kerroucha Sarim Abdelbari, a passionate Full Stack Developer specializing in MERN stack and modern web technologies.',
  keywords: ['Full Stack Developer', 'MERN Stack', 'Web Development', 'React', 'Node.js', 'MongoDB', 'JavaScript', 'TypeScript'],
  authors: [{ name: 'Kerroucha Sarim Abdelbari' }],
  creator: 'Kerroucha Sarim Abdelbari',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-portfolio-url.com',
    title: 'Kerroucha Sarim Abdelbari | Full Stack Developer',
    description: 'Portfolio of Kerroucha Sarim Abdelbari, a passionate Full Stack Developer specializing in MERN stack and modern web technologies.',
    siteName: 'Kerroucha Sarim Abdelbari Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kerroucha Sarim Abdelbari | Full Stack Developer',
    description: 'Portfolio of Kerroucha Sarim Abdelbari, a passionate Full Stack Developer specializing in MERN stack and modern web technologies.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <Background />
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}