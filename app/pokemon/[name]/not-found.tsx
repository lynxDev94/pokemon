import Link from "next/link";
import styles from "./states.module.scss";

export default function PokemonNotFound() {
  return (
    <main>
      <div className={styles.status}>
        <h1>Pokémon not found</h1>
        <p className={styles.message}>
          We could not find that Pokémon. Check the spelling and try again.
        </p>
        <Link href="/" className={styles.action}>
          Back to search
        </Link>
      </div>
    </main>
  );
}
