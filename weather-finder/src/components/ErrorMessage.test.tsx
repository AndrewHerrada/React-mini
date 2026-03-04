import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ErrorMessage } from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("renders the provided message", () => {
    render(<ErrorMessage message="Ciudad no encontrada." />);
    expect(screen.getByText("Ciudad no encontrada.")).toBeInTheDocument();
  });

  it('has role="alert" for accessibility', () => {
    render(<ErrorMessage message="Error de red." />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders the warning icon", () => {
    render(<ErrorMessage message="Error." />);
    expect(screen.getByText("⚠️")).toBeInTheDocument();
  });
});
