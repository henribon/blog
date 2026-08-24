import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import SiteNav, { type NavLink } from "@/components/site-nav";
import "../globals.css";

/**
 * Fonte só do título do site. É uma versão demo com 57 caracteres: tem A–Z e
 * a–z, mas NÃO tem números nem acentos. Por isso fica restrita a "bonbap" —
 * usar em texto em português faria o navegador trocar de fonte no meio da
 * palavra, em cada "ã" ou "ç".
 */
const valmist = localFont({
  src: "../fonts/TBJValmistDemo-Bold.ttf",
  display: "swap",
  variable: "--font-valmist",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const navLinks: NavLink[] = [
  { href: "/blog", label: "Home" },
  { href: "/restaurantes", label: "Restaurantes favoritos" },
];

export const metadata: Metadata = {
  title: {
    default: "Blog · bonbap",
    template: "%s · bonbap",
  },
  description: "Receitas e outras anotações.",
};

export default function SiteRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={valmist.variable} lang="pt-BR">
      <body className="antialiased">
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-5 sm:px-8">
          <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-10">
            {/* Célula vazia à esquerda: mantém o título no centro real. */}
            <span aria-hidden />

            <Link
              className="text-center font-title text-4xl leading-none tracking-tight sm:text-5xl"
              href="/blog"
            >
              bonbap
            </Link>

            <SiteNav links={navLinks} />
          </header>

          <main className="flex-1 py-4">{children}</main>

          <footer className="border-border border-t py-8 text-muted-foreground text-xs">
            <a
              className="underline-offset-4 hover:underline"
              href="https://bonbap.com.br"
            >
              bonbap.com.br
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
