import type { Metadata } from "next";
import PostList, { type PostListItem } from "@/components/post-list";
import { categoryLabel } from "@/sanity/categories";
import { urlForImage } from "@/sanity/lib/image";
import { formatPublishDate, getPosts } from "@/sanity/lib/posts";

export const metadata: Metadata = {
  title: "Postagens",
  description: "Receitas e outras anotações.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  const items: PostListItem[] = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    category: categoryLabel(post.category),
    publishDate: formatPublishDate(post.publishedAt),
    image: post.mainImage
      ? urlForImage(post.mainImage).width(640).height(480).url()
      : null,
    imageAlt: post.title,
  }));

  return (
    <>
      <h1 className="mb-2 font-normal text-3xl tracking-tight sm:text-4xl">
        Postagens
      </h1>
      <p className="mb-12 text-muted-foreground text-sm">
        Receitas e outras anotações.
      </p>
      <PostList posts={items} />
    </>
  );
}
