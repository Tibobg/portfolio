"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider(
  props: React.ComponentProps<typeof NextThemesProvider>
) {
  // tu peux aussi ajouter disableTransitionOnChange si tu veux
  return <NextThemesProvider {...props} />;
}
