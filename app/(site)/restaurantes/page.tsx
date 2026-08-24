import type { Metadata } from "next";
import PostList, { toPostListItems } from "@/components/post-list";
import { getPostsByCategory } from "@/sanity/lib/posts";

export const metadata: Metadata = {
  title: "Restaurantes favoritos",
  description: "Lugares que valem a visita.",
};

export default async function RestaurantesPage() {
  const posts = await getPostsByCategory("restaurantes");

  return (
    <>
      <h1 className="mb-2 font-normal text-3xl tracking-tight sm:text-4xl">
        Restaurantes favoritos
      </h1>
      <p className="mb-12 text-muted-foreground text-sm">
        Lugares que valem a visita.
      </p>
      <PostList
        emptyMessage="Nenhum restaurante anotado ainda."
        posts={toPostListItems(posts)}
      />
    </>
  );
}
