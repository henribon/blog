import type { Metadata } from "next";
import Link from "next/link";
import "../globals.css";

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
    <html lang="pt-BR">
      <body className="antialiased">
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-5 sm:px-8">
          <header className="py-8">
            <Link
              className="font-medium text-sm tracking-tight underline-offset-4 hover:underline"
              href="/blog"
            >
              bonbap
            </Link>
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
