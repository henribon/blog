"use client";

import { useMemo, useState } from "react";
import PostList, { type PostListItem } from "@/components/post-list";
import { categories, categoryColor, categoryLabel } from "@/sanity/categories";

function FilterButton({
  label,
  color,
  active,
  onClick,
}: {
  label: string;
  color?: string;
  active: boolean;
  onClick: () => void;
}) {
  const state = active
    ? "text-foreground underline"
    : "text-muted-foreground hover:text-foreground hover:underline";

  return (
    <button
      aria-pressed={active}
      className={`flex shrink-0 items-center gap-2 font-bold font-categoria text-sm uppercase tracking-[0.04em] underline-offset-4 transition-colors ${state}`}
      onClick={onClick}
      type="button"
    >
      {color && (
        <span
          aria-hidden
          className="size-2"
          style={{ backgroundColor: color }}
        />
      )}
      {label}
    </button>
  );
}

export default function PostFilter({ posts }: { posts: PostListItem[] }) {
  const [ativa, setAtiva] = useState<string | null>(null);

  const usadas = useMemo(() => {
    const valores = new Set(posts.map((post) => post.category));
    return categories.filter((category) => valores.has(category.value));
  }, [posts]);

  const visiveis = ativa
    ? posts.filter((post) => post.category === ativa)
    : posts;

  return (
    <>
      {usadas.length > 1 && (
        <div className="mb-12 flex gap-x-6 overflow-x-auto [scrollbar-width:none] lg:mb-16 lg:justify-center lg:gap-x-8">
          <FilterButton
            active={ativa === null}
            label="Todas"
            onClick={() => setAtiva(null)}
          />
          {usadas.map((category) => (
            <FilterButton
              active={ativa === category.value}
              color={categoryColor(category.value)}
              key={category.value}
              label={category.title}
              onClick={() => setAtiva(category.value)}
            />
          ))}
        </div>
      )}

      <PostList
        emptyMessage={
          ativa
            ? `Nenhuma postagem em ${categoryLabel(ativa)}.`
            : "Nenhuma postagem publicada ainda."
        }
        posts={visiveis}
      />
    </>
  );
}
