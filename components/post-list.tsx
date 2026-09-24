import Image from "next/image";
import Link from "next/link";
import PostMeta from "@/components/post-meta";

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
    placement: "col-span-12 col-start-1 lg:col-span-7 lg:col-start-1",
    frame: "aspect-4/3",
    title: "text-2xl lg:text-3xl",
    sizes: "(min-width: 1024px) 690px, 100vw",
  },
  {
    placement:
      "col-span-8 col-start-5 lg:col-span-4 lg:col-start-9 lg:mt-32 lg:rotate-[1.5deg]",
    frame: "aspect-square",
    title: "text-xl",
    sizes: "(min-width: 1024px) 384px, 65vw",
  },
  {
    placement: "col-span-10 col-start-1 lg:col-span-4 lg:col-start-2 lg:mt-10",
    frame: "aspect-4/5",
    title: "text-2xl lg:text-3xl",
    sizes: "(min-width: 1024px) 384px, 85vw",
  },
  {
    placement: "col-span-10 col-start-3 lg:col-span-4 lg:col-start-7 lg:mt-16",
    frame: "aspect-3/4",
    title: "text-xl lg:text-2xl",
    sizes: "(min-width: 1024px) 384px, 85vw",
  },
  {
    placement:
      "col-span-9 col-start-1 lg:col-span-2 lg:col-start-11 lg:mt-40 lg:-rotate-2",
    frame: "aspect-square",
    title: "text-xl lg:text-base",
    sizes: "(min-width: 1024px) 180px, 75vw",
  },
  {
    placement: "col-span-11 col-start-2 lg:col-span-5 lg:col-start-1 lg:mt-6",
    frame: "aspect-3/2",
    title: "text-xl lg:text-2xl",
    sizes: "(min-width: 1024px) 486px, 90vw",
  },
  {
    placement: "col-span-8 col-start-5 lg:col-span-4 lg:col-start-8 lg:mt-24",
    frame: "aspect-4/5",
    title: "text-xl lg:text-2xl",
    sizes: "(min-width: 1024px) 384px, 65vw",
  },
  {
    placement: "col-span-10 col-start-1 lg:col-span-4 lg:col-start-2 lg:mt-8",
    frame: "aspect-4/3",
    title: "text-xl lg:text-2xl",
    sizes: "(min-width: 1024px) 384px, 85vw",
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
      <PostMeta
        category={post.category}
        className="mb-2"
        date={post.publishDate}
      />
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
    <ul className="grid grid-cols-12 items-start gap-x-4 gap-y-16 py-6 lg:gap-x-6 lg:gap-y-12">
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
