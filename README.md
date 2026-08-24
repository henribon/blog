# Blog

Next.js (App Router) + TypeScript + Tailwind v4 + shadcn, com o conteúdo vindo do Sanity.

## Onde eu crio uma postagem?

Em **http://localhost:3000/studio** — o painel de edição do Sanity roda dentro do
próprio site. Você escreve lá, clica em *Publish*, e a postagem aparece em `/blog`
automaticamente (a listagem revalida a cada 60 segundos).

Antes disso funcionar, é preciso fazer a configuração abaixo uma única vez.

## Configuração inicial do Sanity

**1. Crie a conta e o projeto**

Acesse https://sanity.io/manage, entre com sua conta e crie um novo projeto no
plano gratuito. Use `production` como nome do dataset.

**2. Copie o Project ID**

Ainda em sanity.io/manage, abra o projeto — o *Project ID* fica no topo da página.
Cole no arquivo `.env.local`, na raiz do repositório:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=seu-project-id-aqui
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
```

**3. Libere o CORS**

No painel do Sanity, vá em **API → CORS origins → Add CORS origin** e adicione
`http://localhost:3000` com a opção *Allow credentials* marcada. Sem isso o
painel embutido não consegue conversar com a API do Sanity.

Quando publicar o site, repita o passo para o domínio de produção.

**4. Reinicie o servidor**

```bash
npm run dev
```

Abra http://localhost:3000/studio, faça login com a mesma conta Sanity e crie a
primeira postagem.

## Campos de uma postagem

| Campo | Para que serve |
| --- | --- |
| Título | Título da postagem |
| Slug | Endereço final (`/blog/meu-titulo`) — use o botão *Generate* |
| Categoria | Escolha na lista fixa. Para criar uma nova, edite `sanity/categories.ts` |
| Resumo | Texto curto da listagem (máx. 200 caracteres) |
| Imagem de capa | Miniatura na listagem e topo da postagem |
| Data de publicação | Ordena a listagem (mais recente primeiro) |
| Conteúdo | O texto da postagem, com títulos, links e imagens |

### Bloco "Receita (opcional)"

Fica recolhido no painel e serve só para postagens de receita. Se ficar em
branco, nada disso aparece na página.

| Campo | Exemplo |
| --- | --- |
| Tempo de preparo | `40 min` |
| Rendimento | `4 porções` |
| Ingredientes | Um por linha |

## Publicar na Vercel

O blog é Next.js com renderização no servidor — **não roda no GitHub Pages**.
A listagem revalida a cada 60 segundos, o `/studio` é um app inteiro e as
imagens são otimizadas sob demanda. Tudo isso precisa de um servidor.

**1.** Em https://vercel.com, importe o repositório `henribon/blog`.

**2.** Em *Environment Variables*, repita as três chaves do `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
```

**3.** Depois do primeiro deploy, em *Settings → Domains*, adicione
`blog.bonbap.com.br`.

**4.** No Registro.br (**DNS → Configurar endereçamento**, modo avançado):

```
TIPO    NOME    DADOS
CNAME   blog    cname.vercel-dns.com
```

**5.** De volta ao Sanity (**API → CORS origins**), adicione
`https://blog.bonbap.com.br` com *Allow credentials* marcado — senão o
`/studio` publicado não conversa com a API.

A partir daí, todo `git push` na `main` republica sozinho.

## Postar de qualquer lugar

Com o site publicado, o painel fica em **https://blog.bonbap.com.br/studio**.
Funciona no navegador do celular — é só entrar com a conta Sanity. Não há nada
para instalar, e o post entra no ar em até 60 segundos.

## Estrutura

```
app/
  (site)/          layout do site + globals.css
    page.tsx       redireciona para /blog
    blog/          listagem em /blog
    blog/[slug]/   página da postagem
  (studio)/        layout isolado (sem Tailwind, para não quebrar o Sanity)
    studio/        painel de edição em /studio
components/
  post-list.tsx    a listagem de postagens
sanity/
  categories.ts    lista de categorias (lida pelo schema e pelo site)
  schemaTypes/     schema das postagens
  lib/             client, queries e helpers
```

## Comandos

```bash
npm run dev
```

```bash
npm run build
```
