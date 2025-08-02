import { ReactNode } from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/sonner";
import { APP_CONFIG } from "@/config/app-config";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: APP_CONFIG.meta.title,
  description: APP_CONFIG.meta.description,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange enableSystem={false}>
          {children}
          <Toaster
            className="group min-h-12! gap-3!"
            position="bottom-right"
            toastOptions={{
              classNames: {
                icon: "size-5! shrink-0!",
                title: "text-base font-medium",
                description: "text-sm",
                toast: "group toast-sonner",
                error: "bg-red-50! text-rose-600!",
                info: "bg-blue-50! text-blue-600!",
                success: "bg-green-50! text-green-600!",
                warning: "bg-orange-50! text-orange-600!",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
