import { toPokemonView, type PokemonView } from "./pokemon";

const API_BASE = "https://pokeapi.co/api/v2/pokemon";
const TIMEOUT_MS = 5_000;
const REVALIDATE_SECONDS = 86_400;

export type FetchPokemonResult =
  | { status: "found"; pokemon: PokemonView }
  | { status: "not-found" }
  | { status: "failed" };

export async function fetchPokemon(name: string): Promise<FetchPokemonResult> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE}/${encodeURIComponent(name)}`, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      next: { revalidate: REVALIDATE_SECONDS },
    });
  } catch {
    return { status: "failed" };
  }

  if (response.status === 404) return { status: "not-found" };
  if (!response.ok) return { status: "failed" };

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    return { status: "failed" };
  }

  const pokemon = toPokemonView(body);

  if (pokemon === null) return { status: "failed" };

  return { status: "found", pokemon };
}
