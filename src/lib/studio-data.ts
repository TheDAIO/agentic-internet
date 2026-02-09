import type { StudiosData, Studio } from "@/types/studio";
import studiosJson from "../../data/studios.json";

const data = studiosJson as StudiosData;

export function getStudios(): Studio[] {
  return data.studios;
}

export function getStudio(id: string): Studio | undefined {
  return data.studios.find((s) => s.id === id);
}

export function getLastUpdatedStudios(): string {
  return data.lastUpdated;
}
