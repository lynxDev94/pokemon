export type PokemonView = {
  name: string;
  imageUrl: string | null;
};

function asUrl(value: unknown): string | null {
  return typeof value === "string" && value !== "" ? value : null;
}

export function toPokemonView(data: unknown): PokemonView | null {
  const p = data as {
    name?: unknown;
    sprites?: {
      front_default?: unknown;
      other?: { "official-artwork"?: { front_default?: unknown } };
    };
  } | null;

  if (!p || typeof p.name !== "string" || p.name === "") return null;

  const artwork = p.sprites?.other?.["official-artwork"]?.front_default;

  return {
    name: p.name,
    imageUrl: asUrl(artwork) ?? asUrl(p.sprites?.front_default),
  };
}
