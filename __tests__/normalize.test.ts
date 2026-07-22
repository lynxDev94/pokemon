import { isValidPokemonName, normalizePokemonName } from "@/lib/normalize";

describe("normalizePokemonName", () => {
  it.each([
    ["  PIKACHU  ", "pikachu"],
    ["Mr. Mime", "mr-mime"],
    ["Farfetch'd", "farfetchd"],
    ["ho-oh", "ho-oh"],
    ["25", "25"],
  ])("normalises %j to %j", (raw, expected) => {
    expect(normalizePokemonName(raw)).toBe(expected);
  });

  it.each(["", "   ", "!!!"])("leaves nothing usable from %j", (raw) => {
    expect(normalizePokemonName(raw)).toBe("");
  });

  it("never produces characters that are unsafe in a url path", () => {
    expect(normalizePokemonName("../../etc/passwd?x=1")).toMatch(/^[a-z0-9-]*$/);
  });
});

describe("isValidPokemonName", () => {
  it("accepts a normalised name", () => {
    expect(isValidPokemonName("mr-mime")).toBe(true);
  });

  it("rejects an empty name", () => {
    expect(isValidPokemonName("")).toBe(false);
  });

  it("rejects names over 50 characters", () => {
    expect(isValidPokemonName("a".repeat(51))).toBe(false);
  });

  it.each(["Pikachu", "mr mime", "pika/chu"])("rejects unnormalised %j", (name) => {
    expect(isValidPokemonName(name)).toBe(false);
  });
});
