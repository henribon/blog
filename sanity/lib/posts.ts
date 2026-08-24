import type { PortableTextBlock } from "@portabletext/types";
import type { Image } from "sanity";
import { isSanityConfigured } from "../env";
import { client } from "./client";

export type PostSummary = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  publishedAt: string;
  mainImage: Image | null;
};

export type Post = PostSummary & {
  body: PortableTextBlock[] | null;
  mainImageAlt: string | null;
  tempoPreparo: string | null;
  rendimento: string | null;
  ingredientes: string[] | null;
};

const summaryFields = `
  _id,
  title,
  "slug": slug.current,
  category,
  description,
  publishedAt,
  mainImage
`;

const postsQuery = `*[_type == "post" && defined(slug.current)]
  | order(publishedAt desc){${summaryFields}}`;

const postQuery = `*[_type == "post" && slug.current == $slug][0]{
  ${summaryFields},
  body,
  tempoPreparo,
  rendimento,
  ingredientes,
  "mainImageAlt": mainImage.alt
}`;

const slugsQuery = `*[_type == "post" && defined(slug.current)].slug.current`;

export async function getPosts(): Promise<PostSummary[]> {
  if (!isSanityConfigured) return [];
  return client.fetch<PostSummary[]>(
    postsQuery,
    {},
    { next: { revalidate: 60 } },
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!isSanityConfigured) return null;
  return client.fetch<Post | null>(
    postQuery,
    { slug },
    { next: { revalidate: 60 } },
  );
}

export async function getPostSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return [];
  return client.fetch<string[]>(slugsQuery);
}

export function formatPublishDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}
