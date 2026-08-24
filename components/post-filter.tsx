"use client";

import { useMemo, useState } from "react";
import PostList, { type PostListItem } from "@/components/post-list";
import { categories } from "@/sanity/categories";

const TODAS = "Todas";

export default function PostFilter({ posts }: { posts: PostListItem[] }) {
  const [ativa, setAtiva] = useState(TODAS);

  // Só entram no filtro as categorias que têm postagem — a ordem é a da lista
  // canônica, não a de publicação, para os botões não dançarem a cada post novo.
  const abas = useMemo(() => {
    const usadas = new Set(posts.map((post) => post.category));
    return [
      TODAS,
      ...categories.map((c) => c.title).filter((title) => usadas.has(title)),
    ];
  }, [posts]);

  const visiveis =
    ativa === TODAS ? posts : posts.filter((post) => post.category === ativa);

  return (
    <>
      {abas.length > 2 && (
        <div className="mb-10 flex flex-wrap gap-x-5 gap-y-2">
          {abas.map((aba) => (
            <button
              aria-pressed={aba === ativa}
              className={
                aba === ativa
                  ? "text-foreground text-xs uppercase tracking-wider underline underline-offset-4"
                  : "text-muted-foreground text-xs uppercase tracking-wider underline-offset-4 transition-colors hover:text-foreground hover:underline"
              }
              key={aba}
              onClick={() => setAtiva(aba)}
              type="button"
            >
              {aba}
            </button>
          ))}
        </div>
      )}

      <PostList
        emptyMessage={
          ativa === TODAS
            ? "Nenhuma postagem publicada ainda."
            : `Nenhuma postagem em ${ativa}.`
        }
        posts={visiveis}
      />
    </>
  );
}
