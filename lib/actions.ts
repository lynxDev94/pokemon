"use server";

import { redirect } from "next/navigation";
import { isValidPokemonName, normalizePokemonName } from "./normalize";

export async function searchPokemon(formData: FormData) {
  const raw = formData.get("q");
  if (typeof raw !== "string") return;

  const name = normalizePokemonName(raw);
  if (!isValidPokemonName(name)) return;

  redirect(`/pokemon/${name}`);
}
