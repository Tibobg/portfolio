import "./styles/globals.css";
import "./styles/cv-button.css";
import type { Metadata } from "next";
import Nav from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider";
import GlobalBlobs from "@/components/GlobalBlobs";


export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "CAUCHE Thibault",
  description: "Présentation, projets, compétences.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="relative bg-[#1c1b21] text-foreground"> {/*#121212*/}
        {/* Fond global visible seulement après le Hero grâce au masque */}
        <GlobalBlobs balls={[
      { x: "50%", y: "-5%",  w: "80vmax", color: "#8b5cf6", opacity: 0.30, blur: "80px", speed: "22s" },
      { x: "12%", y: "65%",  w: "62vmax", color: "#22d3ee", opacity: 0.26, blur: "80px", speed: "24s" },
      { x: "88%", y: "60%",  w: "58vmax", color: "#f43f5e", opacity: 0.24, blur: "80px", speed: "26s" },
    ]}
  />
        <ThemeProvider>
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

