# Portal de Notícias

Portal de notícias moderno desenvolvido com Next.js 15, TypeScript e Material UI.

## Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Material UI** - Estilização utilitária
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

## Estrutura do Projeto

```
portal-noticias/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Layout raiz
│   ├── page.tsx             # Página inicial
│   ├── error.tsx            # Error boundary
│   ├── loading.tsx          # Loading UI
│   ├── not-found.tsx        # Página 404
│   ├── news/                # Rotas de notícias
│   │   └── page.tsx
│   └── contact/             # Rotas de contato
│       ├── page.tsx
│       └── components/
│           └── contactForm/
├── components/              # Componentes React reutilizáveis
│   └── layout/
│       ├── header/
│       │   └── index.tsx
│       └── footer/
│           └── index.tsx
├── types/                   # ✨ Types TypeScript
│   ├── index.ts             # Exports centralizados
│   ├── news.types.ts        # Tipos de notícias
│   └── contact.types.ts     # Tipos de contato
├── schemas/                 # ✨ Validações Zod
│   ├── news.schema.ts       # Schema de notícias
│   └── contact.schema.ts    # Schema de contato
├── infrastructure/          # Camada de dados
│   └── data/
│       └── news.ts          # Dados de notícias (27 items)
└── public/                  # Assets estáticos
```

### Organização

**types/** - Types TypeScript (compile-time)
- Define contratos e interfaces
- Usado em toda aplicação
- Import: `import { News } from "@/types"`

**schemas/** - Validações Zod (runtime)
- Validação de dados em runtime
- Formulários e APIs
- Import: `import { ContactFormSchema } from "@/schemas/contact.schema"`

**infrastructure/** - Fonte de dados
- Dados estáticos tipados
- Futuro: integração com APIs/CMS
- Import: `import { noticias } from "@/infrastructure/data/news"`


## Funcionalidades

- ✅ Listagem de notícias por categoria
- ✅ Notícias em destaque
- ✅ Sistema de busca
- ✅ Formulário de contato com validação
- ✅ Design responsivo
- ✅ SEO otimizado
- ✅ Type-safe com TypeScript
