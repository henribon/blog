/**
 * Categorias disponíveis no painel. Para criar uma nova, acrescente aqui —
 * é o único lugar. Lista fixa em vez de texto livre para evitar que
 * "Sobremesa" e "sobremesas" virem duas categorias diferentes.
 *
 * Fica fora de `schemaTypes/` de propósito: este arquivo é lido também pelas
 * páginas do site, e importar do schema traria o pacote do Studio junto.
 */
export const categories = [
  { title: "Receitas", value: "receitas" },
  { title: "Doces", value: "doces" },
  { title: "Bebidas", value: "bebidas" },
  { title: "Restaurantes", value: "restaurantes" },
  { title: "Notas", value: "notas" },
];

/** Converte o valor salvo ("doces") no rótulo de exibição ("Doces"). */
export function categoryLabel(value: string) {
  return categories.find((item) => item.value === value)?.title ?? value;
}
