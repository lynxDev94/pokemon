import { notFound } from "next/navigation";
import { PokemonCard } from "@/components/pokemon-card";
import { isValidPokemonName } from "@/lib/normalize";
import { fetchPokemon } from "@/lib/pokeapi";

type Props = { params: Promise<{ name: string }> };

export default async function PokemonPage({ params }: Props) {
  const { name } = await params;

  if (!isValidPokemonName(name)) notFound();

  const result = await fetchPokemon(name);

  if (result.status === "not-found") notFound();
  if (result.status === "failed") {
    throw new Error(`Could not load "${name}" from PokeAPI`);
  }

  return (
    <main>
      <PokemonCard pokemon={result.pokemon} />
    </main>
  );
}
