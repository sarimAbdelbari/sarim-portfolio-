import { Geist_Mono } from "next/font/google";
import { Outfit } from "next/font/google";
import "./globals.css";
import LoadingWarpper from "@/components/layout/loadingWarpper";
import { ThemeProvider } from "@/components/provider/theme-provider";
import Container from "@/components/ui/container";
import NavBar from "@/components/layout/navBar";
import { ScrollIndicator } from "@/components/layout/scrollIndicator";
import SideMenu from "@/components/layout/sidemenu";

const outfit = Outfit({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',  // Add this line to create a CSS variable
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sarim Abdelbari Full Stack Developer",
  description: "Sarim Abdelbari Full Stack Developer",
  icons: {
    icon: "/assets/svg/GuibleHero.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${geistMono.variable} font-sans antialiased`}
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