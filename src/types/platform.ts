export interface Platform {
  id: string;
  name: string;
  description: string;
  url: string;
  category: Category;
  tags: string[];
  logo: string;
  status: "active" | "beta" | "concept" | "suggested";
  dateAdded: string;
}

export type Category =
  | "social"
  | "commerce"
  | "search"
  | "tools"
  | "infrastructure"
  | "data"
  | "communication";

export interface PlatformsData {
  platforms: Platform[];
  categories: Category[];
  lastUpdated: string;
}
