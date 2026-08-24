import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Image as SanityImage } from "sanity";
import { categoryLabel } from "@/sanity/categories";
import { urlForImage } from "@/sanity/lib/image";
import { formatPublishDate, getPost, getPostSlugs } from "@/sanity/lib/posts";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "Postagem não encontrada" };

  return { title: post.title, description: post.description };
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage & { alt?: string } }) => (
      <Image
        alt={value.alt || ""}
        className="my-8 h-auto w-full"
        height={1080}
        sizes="(max-width: 768px) 100vw, 768px"
        src={urlForImage(value).width(1600).url()}
        width={1920}
      />
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 font-normal text-2xl tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 font-normal text-xl tracking-tight">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-border border-l-2 pl-4 text-muted-foreground italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-5 text-sm leading-relaxed sm:text-base">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href ?? "";
      // Só abre em nova aba o que sai do site.
      const external = /^https?:\/\//.test(href);

      return (
        <a
          className="underline underline-offset-4"
          href={href}
          {...(external
            ? { rel: "noreferrer noopener", target: "_blank" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
};

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const ingredientes = post.ingredientes ?? [];
  const temFichaReceita =
    post.tempoPreparo || post.rendimento || ingredientes.length > 0;

  return (
    <article className="py-4">
      <Link
        className="mb-8 inline-flex items-center gap-2 text-muted-foreground text-xs underline-offset-4 hover:underline"
        href="/blog"
      >
        <ArrowLeft className="h-3 w-3" />
        Voltar para as postagens
      </Link>

      <p className="mb-3 text-muted-foreground text-xs uppercase tracking-wider">
        {categoryLabel(post.category)} · {formatPublishDate(post.publishedAt)}
      </p>
      <h1 className="mb-6 font-normal text-3xl tracking-tight sm:text-4xl">
        {post.title}
      </h1>

      {post.mainImage && (
        <Image
          alt={post.mainImageAlt || post.title}
          className="mb-10 aspect-video w-full object-cover"
          height={900}
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          src={urlForImage(post.mainImage).width(1600).height(900).url()}
          width={1600}
        />
      )}

      {temFichaReceita && (
        <section className="mb-10 border-border border-t border-b py-6">
          {(post.tempoPreparo || post.rendimento) && (
            <dl className="mb-6 flex flex-wrap gap-x-10 gap-y-3 text-sm last:mb-0">
              {post.tempoPreparo && (
                <div>
                  <dt className="text-muted-foreground text-xs uppercase tracking-wider">
                    Tempo de preparo
                  </dt>
                  <dd>{post.tempoPreparo}</dd>
                </div>
              )}
              {post.rendimento && (
                <div>
                  <dt className="text-muted-foreground text-xs uppercase tracking-wider">
                    Rendimento
                  </dt>
                  <dd>{post.rendimento}</dd>
                </div>
              )}
            </dl>
          )}

          {ingredientes.length > 0 && (
            <>
              <h2 className="mb-3 text-muted-foreground text-xs uppercase tracking-wider">
                Ingredientes
              </h2>
              <ul className="space-y-1.5 text-sm">
                {ingredientes.map((item) => (
                  <li className="flex gap-3" key={item}>
                    <span aria-hidden className="text-muted-foreground">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}

      {post.body && (
        <PortableText components={portableTextComponents} value={post.body} />
      )}
    </article>
  );
}
