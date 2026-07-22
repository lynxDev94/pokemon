import { toPokemonView } from "@/lib/pokemon";

const ARTWORK = "https://raw.githubusercontent.com/PokeAPI/sprites/artwork/25.png";
const SPRITE = "https://raw.githubusercontent.com/PokeAPI/sprites/25.png";

function complete() {
  return {
    name: "pikachu",
    sprites: {
      front_default: SPRITE,
      other: { "official-artwork": { front_default: ARTWORK } },
    },
  };
}

describe("toPokemonView", () => {
  it("prefers official artwork", () => {
    expect(toPokemonView(complete())).toEqual({ name: "pikachu", imageUrl: ARTWORK });
  });

  it("falls back to the default sprite when artwork is missing", () => {
    const data = complete();
    data.sprites.other["official-artwork"].front_default = null as unknown as string;

    expect(toPokemonView(data)?.imageUrl).toBe(SPRITE);
  });

  it("returns a null image when there is no sprite at all", () => {
    expect(toPokemonView({ name: "pikachu" })).toEqual({
      name: "pikachu",
      imageUrl: null,
    });
  });

  it("ignores fields we do not use", () => {
    const withExtras = { ...complete(), types: ["electric"], weight: 60 };

    expect(toPokemonView(withExtras)?.name).toBe("pikachu");
  });

  it.each([null, undefined, "pikachu", {}, { name: "" }])("rejects %p", (input) => {
    expect(toPokemonView(input)).toBeNull();
  });
});
