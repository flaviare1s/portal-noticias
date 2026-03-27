# Portal de Notícias

Portal de notícias desenvolvido com Next.js, TypeScript, Material UI e Zod.

## Stack

- Next.js 16 com App Router
- React 19
- TypeScript
- Material UI
- Zod
- Jest
- React Testing Library

## Como rodar

```bash
npm install
npm run dev
```

App local: `http://localhost:3000`

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
npm run test:watch
npm run test:coverage
npm run test:coverage:open
```

## Rotas

- `/` home com destaques e grade de notícias
- `/news` listagem geral de notícias
- `/news/[slug]` detalhe da notícia
- `/news/category/[category]` listagem por categoria
- `/live` página de cobertura ao vivo
- `/faq` perguntas frequentes
- `/contact` formulário de contato
- `/profile` página de perfil
- `/sitemap.xml` sitemap dinâmico
- `/robots.txt` configuração de rastreamento

## Estrutura do projeto

```text
portal-noticias/
|-- app/
|   |-- contact/
|   |   |-- components/
|   |   |   `-- contactForm/
|   |   |       |-- index.tsx
|   |   |       `-- index.test.tsx
|   |   `-- page.tsx
|   |-- faq/
|   |   `-- page.tsx
|   |-- live/
|   |   `-- page.tsx
|   |-- news/
|   |   |-- [slug]/
|   |   |   `-- page.tsx
|   |   |-- category/
|   |   |   `-- [category]/
|   |   |       `-- page.tsx
|   |   `-- page.tsx
|   |-- profile/
|   |   `-- page.tsx
|   |-- dynamic-pages.test.tsx
|   |-- error.tsx
|   |-- layout.tsx
|   |-- loading.tsx
|   |-- not-found.tsx
|   |-- page.tsx
|   |-- robots.ts
|   |-- sitemap.ts
|   `-- static-pages.test.tsx
|-- components/
|   |-- layout/
|   |   |-- footer/
|   |   |   |-- index.tsx
|   |   |   `-- index.test.tsx
|   |   |-- header/
|   |   |   |-- desktopNavbar.tsx
|   |   |   |-- desktopNavbar.test.tsx
|   |   |   |-- index.tsx
|   |   |   |-- index.test.tsx
|   |   |   |-- mobileMenu.tsx
|   |   |   `-- mobileMenu.test.tsx
|   |   |-- nav/
|   |   |   |-- index.tsx
|   |   |   `-- index.test.tsx
|   |   `-- navCategory/
|   |       |-- index.tsx
|   |       `-- index.test.tsx
|   |-- news/
|   |   |-- CategoryNewsSection.tsx
|   |   |-- CategoryNewsSection.test.tsx
|   |   |-- NewsCard.tsx
|   |   |-- NewsCard.test.tsx
|   |   |-- NewsGrid.tsx
|   |   `-- NewsGrid.test.tsx
|   `-- search/
|       |-- SearchBar.tsx
|       |-- SearchBar.test.tsx
|       |-- SearchContext.tsx
|       `-- SearchContext.test.tsx
|-- docs/
|   `-- images/
|       `-- coverage.png
|-- infrastructure/
|   `-- data/
|       `-- news.ts
|-- public/
|   `-- favicon.svg
|-- schemas/
|   |-- contact.schema.ts
|   |-- news.schema.ts
|   `-- news.schema.test.ts
|-- scripts/
|   `-- testCoverageOpen.js
|-- types/
|   |-- contact.types.ts
|   |-- index.ts
|   |-- news.types.ts
|   `-- types-runtime.test.ts
|-- jest.config.js
|-- package.json
|-- setupTests.ts
`-- tsconfig.json
```

## Testes

O projeto usa `Jest` com `next/jest` e `React Testing Library`.

Arquivos principais da configuração:

- [jest.config.js](./jest.config.js)
- [setupTests.ts](./setupTests.ts)
- [scripts/testCoverageOpen.js](./scripts/testCoverageOpen.js)

Comandos:

```bash
# roda a suíte uma vez
npm run test

# modo watch
npm run test:watch

# gera coverage em terminal + HTML
npm run test:coverage

# gera coverage e abre o relatório HTML
npm run test:coverage:open
```

O relatório HTML interativo fica em:

```text
coverage/lcov-report/index.html
```

## Coverage

Cobertura atual:

- Statements: `100%`
- Branches: `94.7%`
- Functions: `93.93%`
- Lines: `100%`

### Screenshot do coverage

<img width="1006" height="869" alt="test-coverage" src="https://github.com/user-attachments/assets/3909e5db-6c30-4fdf-ab0d-7d092cbd3dfe" />

## Funcionalidades

- listagem de notícias
- página de detalhe por slug
- filtro por categoria
- busca global por contexto
- formulário de contato com validação
- layout responsivo para desktop e mobile
- sitemap e robots dinâmicos
- suíte de testes com coverage HTML
