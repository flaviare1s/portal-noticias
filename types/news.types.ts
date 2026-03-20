export type Category = 
  | "Tecnologia" 
  | "Política" 
  | "Esportes" 
  | "Money" 
  | "Mundo" 
  | "Agro" 
  | "Cultura";

export type Section = 
  | "destaque" 
  | "geral" 
  | "webstory" 
  | "politica" 
  | "esportes" 
  | "money" 
  | "review";

export interface News {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageAlt: string;
  category: Category;
  date: string;
  section: Section;
}

export type CategoryNav = readonly [
  "Ao vivo",
  "Política",
  "Money",
  "Mundo",
  "Agro",
  "Infra",
  "Esportes",
  "Viagem & Gastronomia"
];

export type TopicHighlight = 
  | "Mercado" 
  | "Tecnologia" 
  | "Política" 
  | "Esportes" 
  | "Cultura" 
  | "Agro";

export type CategoryFilter = 
  | "Tecnologia" 
  | "Política" 
  | "Esportes" 
  | "Money" 
  | "Mundo" 
  | "Agro" 
  | "Cultura";
