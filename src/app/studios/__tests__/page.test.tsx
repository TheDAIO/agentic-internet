import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import StudiosPage from "../page";

describe("StudiosPage", () => {
  it("renders headline", () => {
    const { container } = render(<StudiosPage />);
    const h1 = container.querySelector("h1");
    expect(h1?.textContent).toContain("Autonomous Product");
    expect(h1?.textContent).toContain("Studios");
  });

  it("renders all 4 studios as table rows", () => {
    const { container } = render(<StudiosPage />);
    const rows = container.querySelectorAll("tbody tr");
    expect(rows.length).toBe(4);
  });

  it("classification legend is visible", () => {
    const { container } = render(<StudiosPage />);
    expect(container.textContent).toContain("Key");
    expect(container.textContent).toContain("Autonomous");
    expect(container.textContent).toContain("Visible");
    expect(container.textContent).toContain("Opaque");
  });
});
