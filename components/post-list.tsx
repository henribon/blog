import Image from "next/image";
import Link from "next/link";

export type PostListItem = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishDate: string;
  image: string | null;
  imageAlt: string;
};

export default function PostList({ posts }: { posts: PostListItem[] }) {
  if (posts.length === 0) {
    return (
      <p className="py-16 text-center text-muted-foreground text-sm">
        Nenhuma postagem publicada ainda.{" "}
        <Link className="underline underline-offset-4" href="/studio">
          Escreva a primeira no painel
        </Link>
        .
      </p>
    );
  }

  return (
    <ul>
      {posts.map((post) => (
        <li
          className="border-border border-t first:border-t-0"
          key={post.slug}
        >
          <Link
            className="group grid gap-5 py-10 sm:grid-cols-[14rem_1fr] sm:gap-8"
            href={`/blog/${post.slug}`}
          >
            {post.image && (
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  alt={post.imageAlt}
                  className="object-cover transition-opacity group-hover:opacity-90"
                  fill
                  sizes="(max-width: 640px) 100vw, 14rem"
                  src={post.image}
                />
              </div>
            )}
            <div className="self-center">
              <p className="mb-2 text-muted-foreground text-xs uppercase tracking-wider">
                {post.category} · {post.publishDate}
              </p>
              <h2 className="mb-2 font-normal text-xl tracking-tight underline-offset-4 group-hover:underline sm:text-2xl">
                {post.title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {post.description}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
