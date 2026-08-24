"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export type NavLink = { href: string; label: string };

export default function SiteNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Navegar fecha o menu: o overlay some junto com a troca de página.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Enquanto o overlay está aberto, a página atrás não rola.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      {/* Desktop: os links direto no cabeçalho, à direita. */}
      <nav className="hidden justify-end gap-5 sm:flex">
        {links.map((link) => (
          <Link
            className="text-muted-foreground text-xs uppercase tracking-wider underline-offset-4 transition-colors hover:text-foreground hover:underline"
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile: só o botão; os links vivem no overlay. */}
      <button
        aria-expanded={open}
        aria-label="Abrir menu"
        className="-mr-2 flex justify-self-end p-2 text-foreground sm:hidden"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background sm:hidden">
          <div className="flex justify-end px-5 py-10">
            <button
              aria-label="Fechar menu"
              className="-mr-2 p-2 text-foreground"
              onClick={() => setOpen(false)}
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {links.map((link) => (
              <Link
                className="text-lg uppercase tracking-wider underline-offset-4 hover:underline"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
