export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/**
 * O projeto compila e roda antes de o Sanity estar configurado: as páginas
 * checam esta flag e mostram um estado vazio em vez de estourar em runtime.
 */
export const isSanityConfigured = projectId.length > 0;
