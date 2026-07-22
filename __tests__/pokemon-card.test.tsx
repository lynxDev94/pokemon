import { render, screen } from "@testing-library/react";
import { PokemonCard } from "@/components/pokemon-card";

const IMAGE = "https://raw.githubusercontent.com/PokeAPI/sprites/artwork/25.png";

describe("PokemonCard", () => {
  it("shows the name capitalised", () => {
    render(<PokemonCard pokemon={{ name: "mr-mime", imageUrl: IMAGE }} />);

    expect(screen.getByRole("heading")).toHaveTextContent("Mr-Mime");
  });

  it("labels the image with the pokemon name", () => {
    render(<PokemonCard pokemon={{ name: "pikachu", imageUrl: IMAGE }} />);

    expect(screen.getByRole("img", { name: "Pikachu" })).toBeInTheDocument();
  });

  it("shows a placeholder instead of a broken image when there is no artwork", () => {
    render(<PokemonCard pokemon={{ name: "pikachu", imageUrl: null }} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText(/no image available/i)).toBeInTheDocument();
  });
});
