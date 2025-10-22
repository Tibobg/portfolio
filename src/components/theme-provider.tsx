"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      enableSystem={false}     // ✅ ignore le thème système
      defaultTheme="dark"      // ✅ démarre en sombre
      forcedTheme="dark"       // ✅ force sombre partout
    >
      {children}
    </NextThemesProvider>
  );
}
