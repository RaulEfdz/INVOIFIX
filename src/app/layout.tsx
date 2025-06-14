import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/hooks/useAuth";

export const metadata: Metadata = {
  title: "InvoiFix",
  description: "Facturación y gestión de tickets optimizadas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased w-full min-h-screen bg-background text-foreground">
        <SidebarProvider>
          <AuthProvider>{children}</AuthProvider>
        </SidebarProvider>
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
