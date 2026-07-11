import type { Metadata } from "next";
import { Inter, Geist_Mono, EB_Garamond } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/main-nav";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });
const ebGaramond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "sawcodes", template: "%s | sawcodes" },
  description: "Saurabh Singh — Full stack developer specialising in Agentic workflows and AI adoption",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} ${ebGaramond.variable}`} suppressHydrationWarning>
      <head>
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <MainNav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border/60 py-10">
          <div className="max-w-[1400px] mx-auto px-10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-mono text-xs text-muted-foreground">
              © {new Date().getFullYear()} Saurabh Singh · sawcodes
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              Built with Next.js + Strapi
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
