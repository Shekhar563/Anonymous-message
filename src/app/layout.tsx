import "./globals.css";
import Providers from "./providers";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="max-w-5xl mx-auto p-4">{children}</main>
        </Providers>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
