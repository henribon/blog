import type { Metadata } from "next";
import PostFilter from "@/components/post-filter";
import { toPostListItems } from "@/components/post-list";
import { getPosts } from "@/sanity/lib/posts";

export const metadata: Metadata = {
  title: "Postagens",
  description: "Receitas e outras anotações.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return <PostFilter posts={toPostListItems(posts)} />;
}
