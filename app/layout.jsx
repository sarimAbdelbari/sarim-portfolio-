import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LoadingWarpper from "@/components/layout/loadingWarpper";
import { ThemeProvider } from "@/components/provider/theme-provider";
import Container from "@/components/ui/container";
import NavBar from "@/components/layout/navBar";
import { ScrollIndicator } from "@/components/layout/scrollIndicator";
import SideMenu from "@/components/layout/sidemenu";

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-jetbrains-mono",
});

export const metadata = {
  title: "Sarim Abdelbari Full Stack Developer",
  description: "Sarim Abdelbari Full Stack Developer",
  keywords: "Sarim Abdelbari, Full Stack Developer, React, Next.js, Node.js, TypeScript, Tailwind CSS, Framer Motion, Radix UI, Tailwind CSS, Framer Motion, Radix UI",
  authors: [{ name: "Sarim Abdelbari", url: "https://sarimabdelbari.vercel.app" }],
  creator: "Sarim Abdelbari",
  publisher: "Sarim Abdelbari",
  website: "https://sarimabdelbari.vercel.app",
  openGraph: {
    title: "Sarim Abdelbari Full Stack Developer",
    description: "Sarim Abdelbari Full Stack Developer",
    url: "https://sarimabdelbari.vercel.app",
    siteName: "Sarim Abdelbari Full Stack Developer",
  },
  icons: {
    icon: "/assets/svg/Black-and-White-Minimalist-Luxury-fashion-Logo.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LoadingWarpper>
            <ScrollIndicator>
              <NavBar />
              <SideMenu/>
              <Container>
                {children}
              </Container>
            </ScrollIndicator>
          </LoadingWarpper>
        </ThemeProvider>
      </body>
    </html>
  );
}