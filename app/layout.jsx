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
  title: "Sarim Kerroucha | Full-Stack Developer Portfolio",
  description: "Welcome to the portfolio of Sarim Kerroucha, a passionate Full-Stack Developer specializing in React, Next.js, and Node.js. Explore my projects and articles.",
  keywords: "Sarim Kerroucha, Full Stack Developer, React, Next.js, Node.js, TypeScript, Tailwind CSS, Framer Motion, Radix UI, Portfolio, Web Developer",
  authors: [{ name: "Sarim Kerroucha", url: "https://sarimabdelbari.vercel.app" }],
  creator: "Sarim Kerroucha",
  publisher: "Sarim Kerroucha",
  website: "https://sarimabdelbari.vercel.app",
  openGraph: {
    title: "Sarim Kerroucha | Full-Stack Developer Portfolio",
    description: "Welcome to the portfolio of Sarim Kerroucha, a passionate Full-Stack Developer specializing in React, Next.js, and Node.js. Explore my projects and articles.",
    url: "https://sarimabdelbari.vercel.app",
    siteName: "Sarim Kerroucha's Portfolio",
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