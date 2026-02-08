import type { PlatformsData, Platform, Category } from "@/types/platform";
import platformsJson from "../../data/platforms.json";

const data = platformsJson as PlatformsData;

export function getPlatforms(): Platform[] {
  return data.platforms;
}

export function getCategories(): Category[] {
  return data.categories;
}

export function getLastUpdated(): string {
  return data.lastUpdated;
}

export function getPlatformsByCategory(category: Category): Platform[] {
  return data.platforms.filter((p) => p.category === category);
}

export function searchPlatforms(query: string): Platform[] {
  const q = query.toLowerCase();
  return data.platforms.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  data.platforms.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
