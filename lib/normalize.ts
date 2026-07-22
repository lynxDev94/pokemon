const MAX_NAME_LENGTH = 50;
const VALID_NAME = /^[a-z0-9-]+$/;

export function normalizePokemonName(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isValidPokemonName(name: string): boolean {
  return name.length > 0 && name.length <= MAX_NAME_LENGTH && VALID_NAME.test(name);
}
