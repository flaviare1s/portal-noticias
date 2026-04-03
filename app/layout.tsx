import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { SearchProvider } from "@/contexts/SearchContext";
import { SearchBar } from "@/components/search/SearchBar";
import { Box, CssBaseline } from "@mui/material";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import NavCategory from "@/components/layout/navCategory";
import Nav from "@/components/layout/nav";
import { NewsProvider } from "@/contexts/NewsContext";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Portal de Notícias",
  description:
    "Portal de Notícias - Fique por dentro das principais atualizações.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} h-full antialiased w-full overflow-x-hidden`}
      suppressHydrationWarning
    >
      <body
        className="m-0 min-h-screen flex flex-col overflow-hidden"
        suppressHydrationWarning
      >
        <CssBaseline />
        <NewsProvider>
          <SearchProvider>
            <div className="flex-1 bg-[#ECECEC]">
              <Header />
              <SearchBar />
              <NavCategory />
              <Nav />
              <main className="flex-1">
                <Box
                  component="section"
                  sx={{
                    width: "100%",
                    py: 1,
                  }}
                >
                  {children}
                </Box>
              </main>
            </div>
          </SearchProvider>
        </NewsProvider>

        <Footer />
      </body>
    </html>
  );
}
