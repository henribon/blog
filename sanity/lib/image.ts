import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({
  projectId: projectId || "placeholder",
  dataset,
});

export function urlForImage(source: Image) {
  return builder.image(source).auto("format").fit("max");
}

function toPercent(ratio: number) {
  return Math.min(100, Math.max(0, Math.round(ratio * 100)));
}

export function focalPoint({ crop, hotspot }: Image) {
  if (!hotspot) return "50% 50%";

  const left = crop?.left ?? 0;
  const top = crop?.top ?? 0;
  const width = 1 - left - (crop?.right ?? 0);
  const height = 1 - top - (crop?.bottom ?? 0);

  const x = toPercent((hotspot.x - left) / width);
  const y = toPercent((hotspot.y - top) / height);

  return `${x}% ${y}%`;
}
