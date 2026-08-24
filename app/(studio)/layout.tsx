/**
 * Root layout do Sanity Studio. Propositalmente NÃO importa `globals.css`:
 * o preflight do Tailwind sobrescreveria os estilos próprios do Studio.
 */
export default function StudioRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
