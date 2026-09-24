import Image from "next/image";
import Link from "next/link";

type PostListImage = {
  src: string;
  alt: string;
  position: string;
};

export type PostListItem = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishDate: string;
  image: PostListImage | null;
};

type CardLayout = {
  placement: string;
  frame: string;
  title: string;
  sizes: string;
};

const cardLayouts: CardLayout[] = [
  {
    placement: "col-span-12 col-start-1 sm:col-span-7 sm:col-start-1",
    frame: "aspect-4/3",
    title: "text-2xl sm:text-3xl",
    sizes: "(min-width: 640px) 400px, 100vw",
  },
  {
    placement: "col-span-8 col-start-5 sm:col-span-4 sm:col-start-9 sm:mt-32",
    frame: "aspect-3/4",
    title: "text-xl",
    sizes: "(min-width: 640px) 220px, 60vw",
  },
  {
    placement: "col-span-10 col-start-1 sm:col-span-5 sm:col-start-2 sm:mt-8",
    frame: "aspect-square",
    title: "text-xl sm:text-2xl",
    sizes: "(min-width: 640px) 280px, 80vw",
  },
  {
    placement: "col-span-10 col-start-3 sm:col-span-5 sm:col-start-8 sm:mt-40",
    frame: "aspect-4/5",
    title: "text-xl sm:text-2xl",
    sizes: "(min-width: 640px) 280px, 80vw",
  },
  {
    placement: "col-span-9 col-start-1 sm:col-span-4 sm:col-start-1 sm:mt-4",
    frame: "aspect-4/5",
    title: "text-xl",
    sizes: "(min-width: 640px) 220px, 70vw",
  },
  {
    placement: "col-span-11 col-start-2 sm:col-span-6 sm:col-start-6 sm:mt-24",
    frame: "aspect-3/2",
    title: "text-2xl sm:text-3xl",
    sizes: "(min-width: 640px) 340px, 85vw",
  },
];

function layoutAt(index: number) {
  return cardLayouts[index % cardLayouts.length];
}

function PostCard({
  post,
  layout,
  priority,
}: {
  post: PostListItem;
  layout: CardLayout;
  priority: boolean;
}) {
  return (
    <Link className="group block" href={`/blog/${post.slug}`}>
      {post.image && (
        <div
          className={`relative mb-4 overflow-hidden bg-muted ${layout.frame}`}
        >
          <Image
            alt={post.image.alt}
            className="object-cover transition-opacity group-hover:opacity-90"
            fetchPriority={priority ? "high" : "auto"}
            fill
            loading={priority ? "eager" : "lazy"}
            sizes={layout.sizes}
            src={post.image.src}
            style={{ objectPosition: post.image.position }}
          />
        </div>
      )}
      <p className="mb-2 text-muted-foreground text-xs uppercase tracking-wider">
        {post.category} · {post.publishDate}
      </p>
      <h2
        className={`mb-2 text-balance tracking-tight underline-offset-4 group-hover:underline ${layout.title}`}
      >
        {post.title}
      </h2>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {post.description}
      </p>
    </Link>
  );
}

export default function PostList({
  posts,
  emptyMessage = "Nenhuma postagem publicada ainda.",
}: {
  posts: PostListItem[];
  emptyMessage?: string;
}) {
  if (posts.length === 0) {
    return (
      <p className="py-16 text-center text-muted-foreground text-sm">
        {emptyMessage}{" "}
        <Link className="underline underline-offset-4" href="/studio">
          Escreva a primeira no painel
        </Link>
        .
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-12 items-start gap-x-4 gap-y-16 py-6 sm:gap-x-6 sm:gap-y-10">
      {posts.map((post, index) => {
        const layout = layoutAt(index);

        return (
          <li className={layout.placement} key={post.slug}>
            <PostCard layout={layout} post={post} priority={index === 0} />
          </li>
        );
      })}
    </ul>
  );
}
