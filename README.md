# Portal de Notícias

Portal de notícias moderno desenvolvido com Next.js 15, TypeScript e Material UI.

## Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Material UI** - Biblioteca de componentes UI
- **Zod** - Validação de schemas

## Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

Acesse em: [http://localhost:3000](http://localhost:3000)

---

## Estrutura de Rotas (App Router)

### Páginas principais

- `/` → Página inicial (home com destaques e listagem)
- `/news` → Listagem geral de notícias
- `/news/[slug]` → Página dinâmica de notícia
- `/news/category/[category]` → Listagem por categoria
- `/live` → Página de cobertura ao vivo
- `/faq` → Perguntas frequentes
- `/contact` → Página de contato
- `/profile` → Perfil do usuário

### SEO

- `/sitemap.xml` → Sitemap gerado dinamicamente via `app/sitemap.ts`
- `/robots.txt` → Configuração de rastreamento via `app/robots.ts`

---

## Estrutura do Projeto

```
portal-noticias/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Layout raiz
│   ├── page.tsx                      # Página inicial
│   ├── error.tsx                     # Error boundary
│   ├── loading.tsx                   # Loading UI global
│   ├── not-found.tsx                 # Página 404
│   ├── sitemap.ts                    # Geração do sitemap.xml
│   ├── robots.ts                     # Geração do robots.txt
│   ├── live/
│   │   └── page.tsx
│   ├── faq/
│   │   └── page.tsx
│   ├── contact/
│   │   ├── page.tsx
│   │   └── components/
│   │       └── contactForm/
│   │           └── index.tsx
│   ├── profile/
│   │   └── page.tsx
│   └── news/
│       ├── page.tsx                  # Listagem geral
│       ├── [slug]/
│       │   └── page.tsx              # Detalhe da notícia
│       └── category/
│           └── [category]/
│               └── page.tsx          # Notícias por categoria
│
├── components/                       # Componentes React reutilizáveis
│   ├── layout/
│   │   ├── header/
│   │   │   ├── index.tsx
│   │   │   ├── desktopNavbar.tsx
│   │   │   └── mobileMenu.tsx
│   │   ├── nav/
│   │   │   └── index.tsx
│   │   ├── navCategory/
│   │   │   └── index.tsx
│   │   └── footer/
│   │       └── index.tsx
│   ├── news/
│   │   ├── NewsCard.tsx
│   │   └── NewsGrid.tsx
│   └── search/
│       ├── SearchBar.tsx
│       └── SearchContext.tsx
│
├── infrastructure/                   # Camada de dados
│   └── data/
│       └── news.ts                   # Dados de notícias
│
├── schemas/                          # Validações Zod (runtime)
│   ├── news.schema.ts
│   └── contact.schema.ts
│
├── types/                            # Types TypeScript (compile-time)
│   ├── index.ts
│   ├── news.types.ts
│   └── contact.types.ts
│
└── public/                           # Assets estáticos
    └── favicon.svg
```

---

## Organização por Camadas

### `types/`
- Define contratos e interfaces TypeScript
- Utilizado em toda a aplicação
- Exemplo:  
  ```ts
  import { News } from "@/types";
  ```

### `schemas/`
- Validação em runtime com Zod
- Utilizado em formulários e futuras APIs
- Exemplo:
  ```ts
  import { ContactFormSchema } from "@/schemas/contact.schema";
  ```

### `infrastructure/`
- Fonte de dados (atualmente estática)
- Preparado para futura integração com API ou CMS
- Exemplo:
  ```ts
  import { noticias } from "@/infrastructure/data/news";
  ```

---

## Funcionalidades

- ✅ Listagem de notícias
- ✅ Filtro por categoria
- ✅ Página dinâmica por slug
- ✅ Página de cobertura ao vivo
- ✅ Sistema de busca com contexto global
- ✅ Formulário de contato com validação (Zod)
- ✅ Design responsivo
- ✅ SEO com sitemap e robots dinâmicos
- ✅ Type-safe com TypeScript
