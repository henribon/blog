import { categoryColor, categoryLabel } from "@/sanity/categories";

export default function PostMeta({
  category,
  date,
  className = "",
}: {
  category: string;
  date: string;
  className?: string;
}) {
  return (
    <p
      className={`flex flex-wrap items-baseline gap-x-2 text-muted-foreground text-xs uppercase tracking-wider ${className}`}
    >
      <span
        className="font-bold font-categoria tracking-[0.04em]"
        style={{ color: categoryColor(category) }}
      >
        {categoryLabel(category)}
      </span>
      <span aria-hidden>·</span>
      <span>{date}</span>
    </p>
  );
}
