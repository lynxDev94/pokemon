"use client";

import styles from "./states.module.scss";

export default function PokemonError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main>
      <div className={styles.status}>
        <h1>Something went wrong</h1>
        <p className={styles.message}>
          We could not load that Pokémon right now. This is usually temporary.
        </p>
        <button type="button" className={styles.action} onClick={reset}>
          Try again
        </button>
      </div>
    </main>
  );
}
