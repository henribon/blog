"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export type NavLink = {
  href: string;
  label: string;
  /** Fora do blog (outro app do bonbap.com.br): sai do roteamento do Next. */
  external?: boolean;
};

function NavItem({ link, className }: { link: NavLink; className: string }) {
  if (link.external) {
    return (
      <a className={className} href={link.href}>
        {link.label}
      </a>
    );
  }

  return (
    <Link className={className} href={link.href}>
      {link.label}
    </Link>
  );
}

const itemClass =
  "text-muted-foreground text-xs uppercase tracking-wider underline-offset-4 transition-colors hover:text-foreground hover:underline";

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
      <nav className="col-start-1 hidden flex-col items-start gap-1.5 self-start sm:flex xl:absolute xl:top-10 xl:left-10">
        {links.map((link) => (
          <NavItem className={itemClass} key={link.href} link={link} />
        ))}
      </nav>

      {/* Mobile: só o botão; os links vivem no overlay. */}
      <button
        aria-expanded={open}
        aria-label="Abrir menu"
        className="-ml-2 col-start-1 flex justify-self-start p-2 text-foreground sm:hidden"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background sm:hidden">
          <div className="flex justify-start px-5 py-10">
            <button
              aria-label="Fechar menu"
              className="-ml-2 p-2 text-foreground"
              onClick={() => setOpen(false)}
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {links.map((link) => (
              <NavItem
                className="text-lg uppercase tracking-wider underline-offset-4 hover:underline"
                key={link.href}
                link={link}
              />
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
