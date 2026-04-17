import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { SearchProvider } from "@/contexts/SearchContext";
import { SearchBar } from "@/components/search/SearchBar";
import { Box, CssBaseline } from "@mui/material";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import NavCategory from "@/components/layout/navCategory";
import NavWrapper from "@/components/layout/navWrapper";
import MockServiceWorkerProvider from "@/components/providers/MockServiceWorkerProvider";
import { NewsProvider } from "@/contexts/NewsContext";
import { NotFoundProvider } from "@/contexts/NotFoundContext";
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
        <NotFoundProvider>
          <MockServiceWorkerProvider>
            <NewsProvider>
              <SearchProvider>
                <div className="flex-1 bg-[#ECECEC]">
                  <Header />
                  <SearchBar />
                  <NavCategory />
                  <NavWrapper />
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
          </MockServiceWorkerProvider>
        </NotFoundProvider>

        <Footer />
      </body>
    </html>
  );
}
