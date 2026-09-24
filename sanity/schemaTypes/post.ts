import { defineArrayMember, defineField, defineType } from "sanity";
import { categories } from "../categories";

/**
 * Normaliza o slug: tira acentos, baixa a caixa e troca o resto por hífen.
 * "Pão de Queijo" vira "pao-de-queijo". Acento no slug obrigaria o navegador a
 * percent-encodar a URL, o que já causou 404 uma vez.
 */
function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // marcas de acento
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

export const post = defineType({
  name: "post",
  title: "Postagem",
  type: "document",
  fieldsets: [
    {
      name: "receita",
      title: "Receita (opcional)",
      description:
        "Preencha só em postagens de receita. Em branco, nada disso aparece na página.",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (endereço da postagem)",
      type: "slug",
      description:
        'Clique em "Generate" para gerar a partir do título. Só letras ' +
        "minúsculas, números e hífens — é isso que vai na URL.",
      options: { source: "title", maxLength: 96, slugify: slugify },
      validation: (rule) =>
        rule.required().custom((value) => {
          const current = value?.current ?? "";
          if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(current)) return true;
          return "Use só letras minúsculas, números e hífens (ex.: pao-de-queijo). Nada de espaços, acentos ou maiúsculas.";
        }),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: { list: categories, layout: "radio" },
      initialValue: "cozinha",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Resumo",
      type: "text",
      rows: 3,
      description: "Texto curto exibido na listagem.",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "mainImage",
      title: "Imagem de capa",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          description: "Descrição da imagem para leitores de tela.",
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Data de publicação",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tempoPreparo",
      title: "Tempo de preparo",
      type: "string",
      description: 'Como preferir escrever: "40 min", "1h30".',
      fieldset: "receita",
    }),
    defineField({
      name: "rendimento",
      title: "Rendimento",
      type: "string",
      description: 'Ex.: "4 porções", "12 unidades".',
      fieldset: "receita",
    }),
    defineField({
      name: "ingredientes",
      title: "Ingredientes",
      type: "array",
      description: "Um ingrediente por linha.",
      of: [defineArrayMember({ type: "string" })],
      fieldset: "receita",
    }),
    defineField({
      name: "body",
      title: "Conteúdo",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texto alternativo",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "mainImage",
    },
  },
});
