import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  // Placeholder mantém o build de pé enquanto o projeto Sanity não existe;
  // quem consulta o client checa `isSanityConfigured` antes.
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
});
