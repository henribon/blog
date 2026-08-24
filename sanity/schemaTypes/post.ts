import { defineArrayMember, defineField, defineType } from "sanity";
import { categories } from "../categories";

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
      description: 'Clique em "Generate" para gerar a partir do título.',
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: { list: categories, layout: "radio" },
      initialValue: "receitas",
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
