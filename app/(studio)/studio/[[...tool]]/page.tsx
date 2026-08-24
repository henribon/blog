import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main
        style={{
          fontFamily: "system-ui, sans-serif",
          margin: "0 auto",
          maxWidth: "34rem",
          padding: "4rem 1.5rem",
          lineHeight: 1.6,
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 400 }}>
          Sanity ainda não configurado
        </h1>
        <p>
          Crie o projeto no Sanity e preencha{" "}
          <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> no arquivo{" "}
          <code>.env.local</code>. Depois reinicie o servidor de
          desenvolvimento e recarregue esta página.
        </p>
        <p>
          O passo a passo está no <code>README.md</code>.
        </p>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
