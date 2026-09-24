/**
 * Categorias disponíveis no painel. Para criar uma nova, acrescente aqui —
 * é o único lugar. Lista fixa em vez de texto livre para evitar que
 * "Sobremesa" e "sobremesas" virem duas categorias diferentes.
 *
 * Fica fora de `schemaTypes/` de propósito: este arquivo é lido também pelas
 * páginas do site, e importar do schema traria o pacote do Studio junto.
 */
export const categories = [
  { title: "Cozinha", value: "cozinha" },
  { title: "Música", value: "musica" },
  { title: "Restaurantes", value: "restaurantes" },
  { title: "Notas", value: "notas" },
];

export function categoryLabel(value: string) {
  return categories.find((item) => item.value === value)?.title ?? value;
}

export function categoryColor(value: string) {
  return `var(--categoria-${value}, var(--muted-foreground))`;
}
