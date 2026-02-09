export type AutonomyLevel = "human-led" | "human-in-the-loop" | "autonomous";
export type Visibility = "opaque" | "visible";

export interface StudioAutonomy {
  ideaGeneration: AutonomyLevel;
  development: AutonomyLevel;
  distribution: AutonomyLevel;
}

export interface StudioTransparency {
  code: Visibility;
  logs: Visibility;
}

export interface StudioProduct {
  name: string;
  description: string;
  url?: string;
}

export interface Studio {
  id: string;
  name: string;
  description: string;
  type: string;
  creator?: string;
  website?: string;
  x: string;
  token?: {
    name: string;
    address: string;
    chain?: string;
  };
  products: StudioProduct[];
  autonomy: StudioAutonomy;
  transparency: StudioTransparency;
  notable: string[];
  dateAdded: string;
}

export interface StudiosData {
  studios: Studio[];
  lastUpdated: string;
}
