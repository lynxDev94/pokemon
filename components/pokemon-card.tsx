import Image from "next/image";
import type { PokemonView } from "@/lib/pokemon";
import styles from "./pokemon-card.module.scss";

function toDisplayName(name: string): string {
  return name.replace(/(^|-)(\w)/g, (segment) => segment.toUpperCase());
}

export function PokemonCard({ pokemon }: { pokemon: PokemonView }) {
  const displayName = toDisplayName(pokemon.name);

  return (
    <article className={styles.card}>
      <h1 className={styles.name}>{displayName}</h1>

      {pokemon.imageUrl ? (
        <Image
          className={styles.image}
          src={pokemon.imageUrl}
          alt={displayName}
          width={475}
          height={475}
          priority
        />
      ) : (
        <p className={styles.placeholder}>No image available</p>
      )}
    </article>
  );
}
