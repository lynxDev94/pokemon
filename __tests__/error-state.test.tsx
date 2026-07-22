import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PokemonError from "@/app/pokemon/[name]/error";

function renderError(reset = jest.fn()) {
  render(<PokemonError error={new Error("PokeAPI returned 500")} reset={reset} />);
  return reset;
}

describe("PokemonError", () => {
  it("offers a retry that re-runs the request", async () => {
    const reset = renderError();

    await userEvent.click(screen.getByRole("button", { name: /try again/i }));

    expect(reset).toHaveBeenCalledTimes(1);
  });

  it("reads as a failure rather than a missing pokemon", () => {
    renderError();

    expect(screen.getByRole("heading")).toHaveTextContent(/something went wrong/i);
    expect(screen.queryByText(/not found/i)).not.toBeInTheDocument();
  });

  it("does not leak the underlying error to the visitor", () => {
    renderError();

    expect(screen.queryByText(/PokeAPI/)).not.toBeInTheDocument();
    expect(screen.queryByText(/500/)).not.toBeInTheDocument();
  });
});
