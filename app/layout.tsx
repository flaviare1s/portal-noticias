import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Nav from "@/components/layout/nav";
import { SearchProvider } from "@/components/search/SearchContext";
import { SearchBar } from "@/components/search/SearchBar";
import { Box, CssBaseline } from "@mui/material";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Portal de Notícias",
  description: "Portal de Notícias - Fique por dentro das principais atualizações.",
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
      className={`${roboto.variable} h-full antialiased`}
      style={{ width: "100%", overflowX: "hidden" }}
      suppressHydrationWarning
    >
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ECECEC",
          overflowX: "hidden",
        }}
        suppressHydrationWarning
      >
        <CssBaseline />
        <SearchProvider>
          <Header />
          <SearchBar />
          <Nav />
          <main style={{ flexGrow: 1 }}>
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
        </SearchProvider>

        <Footer />
      </body>
    </html>
  );
}
