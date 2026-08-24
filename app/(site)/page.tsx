import { redirect } from "next/navigation";

/** A raiz do blog não tem conteúdo próprio: manda direto para a listagem. */
export default function Home() {
  redirect("/blog");
}
