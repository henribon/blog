import type { PostListItem } from "@/components/post-list";
import { focalPoint, urlForImage } from "./image";
import { formatPublishDate, type PostSummary } from "./posts";

export function toPostListItems(posts: PostSummary[]): PostListItem[] {
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    category: post.category,
    publishDate: formatPublishDate(post.publishedAt),
    image: post.mainImage
      ? {
          src: urlForImage(post.mainImage).width(1400).url(),
          alt: post.title,
          position: focalPoint(post.mainImage),
        }
      : null,
  }));
}
