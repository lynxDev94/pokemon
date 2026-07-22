import Link from "next/link";

export default function PokemonNotFound() {
  return (
    <main>
      <h1>Pokémon not found</h1>
      <p>We could not find that Pokémon. Check the spelling and try again.</p>
      <Link href="/">Back to search</Link>
    </main>
  );
}
