import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { ImageProvider } from "@/context/ImageContext"; // Import the provider
import "./globals.css";

export const metadata: Metadata = {
  title: "Reduce It | Compress Images in a Snap",
  description: "Easily reduce the file size of your images to a specific KB target. Fast, free, and secure.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ImageProvider> {/* Wrap the children with the ImageProvider */}
            {children}
          </ImageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
