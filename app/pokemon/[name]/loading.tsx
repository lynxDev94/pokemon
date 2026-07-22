import styles from "./states.module.scss";

export default function Loading() {
  return (
    <main>
      <div className={styles.status}>
        <p role="status" className={styles.message}>
          Loading Pokémon…
        </p>
        <div className={styles.skeleton} />
      </div>
    </main>
  );
}
