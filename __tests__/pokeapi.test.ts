import { fetchPokemon } from "@/lib/pokeapi";

const ARTWORK = "https://raw.githubusercontent.com/PokeAPI/sprites/artwork/25.png";

const body = {
  name: "pikachu",
  sprites: { other: { "official-artwork": { front_default: ARTWORK } } },
};

function respondWith(response: unknown) {
  global.fetch = jest.fn().mockResolvedValue(response) as unknown as typeof fetch;
}

function failWith(error: Error) {
  global.fetch = jest.fn().mockRejectedValue(error) as unknown as typeof fetch;
}

afterEach(() => {
  jest.restoreAllMocks();
});

describe("fetchPokemon", () => {
  it("returns the pokemon on success", async () => {
    respondWith({ status: 200, ok: true, json: async () => body });

    await expect(fetchPokemon("pikachu")).resolves.toEqual({
      status: "found",
      pokemon: { name: "pikachu", imageUrl: ARTWORK },
    });
  });

  it("returns not-found on 404", async () => {
    respondWith({ status: 404, ok: false });

    await expect(fetchPokemon("nope")).resolves.toEqual({ status: "not-found" });
  });

  it("returns failed on a server error", async () => {
    respondWith({ status: 500, ok: false });

    await expect(fetchPokemon("pikachu")).resolves.toEqual({ status: "failed" });
  });

  it("returns failed when the request never completes", async () => {
    failWith(new Error("aborted"));

    await expect(fetchPokemon("pikachu")).resolves.toEqual({ status: "failed" });
  });

  it("returns failed, not not-found, when the body has an unexpected shape", async () => {
    respondWith({ status: 200, ok: true, json: async () => ({ unexpected: true }) });

    await expect(fetchPokemon("pikachu")).resolves.toEqual({ status: "failed" });
  });
});
