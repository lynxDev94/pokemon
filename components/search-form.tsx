import { searchPokemon } from "@/lib/actions";
import styles from "./search-form.module.scss";

export function SearchForm() {
  return (
    <form action={searchPokemon} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="q">
          Pokémon name
        </label>
        <input
          className={styles.input}
          id="q"
          name="q"
          type="text"
          placeholder="pikachu"
          autoComplete="off"
          required
        />
      </div>
      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  );
}
