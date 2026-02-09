import { describe, it, expect } from "vitest";
import { getStudios, getStudio, getLastUpdatedStudios } from "../studio-data";

describe("studio-data", () => {
  it("returns all 4 studios", () => {
    const studios = getStudios();
    expect(studios).toHaveLength(4);
  });

  it("returns correct studio by ID", () => {
    const studio = getStudio("clawd-bot");
    expect(studio).toBeDefined();
    expect(studio!.name).toBe("clawd.atg.eth");
  });

  it("returns undefined for unknown ID", () => {
    const studio = getStudio("nonexistent");
    expect(studio).toBeUndefined();
  });

  it("lastUpdated returns a valid date string", () => {
    const lastUpdated = getLastUpdatedStudios();
    expect(lastUpdated).toBeTruthy();
    const date = new Date(lastUpdated);
    expect(date.getTime()).not.toBeNaN();
  });

  it("each studio has required fields", () => {
    const studios = getStudios();
    for (const studio of studios) {
      expect(studio.id).toBeTruthy();
      expect(studio.name).toBeTruthy();
      expect(studio.description).toBeTruthy();
      expect(studio.type).toBeTruthy();
      expect(studio.x).toBeTruthy();
      expect(studio.autonomy).toBeDefined();
      expect(studio.autonomy.ideaGeneration).toBeTruthy();
      expect(studio.autonomy.development).toBeTruthy();
      expect(studio.autonomy.distribution).toBeTruthy();
      expect(studio.transparency).toBeDefined();
      expect(studio.transparency.code).toBeTruthy();
      expect(studio.transparency.logs).toBeTruthy();
    }
  });
});
