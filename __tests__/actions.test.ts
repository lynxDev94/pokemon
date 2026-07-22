import { redirect } from "next/navigation";
import { searchPokemon } from "@/lib/actions";

jest.mock("next/navigation", () => ({ redirect: jest.fn() }));

function submit(value?: string) {
  const data = new FormData();
  if (value !== undefined) data.set("q", value);
  return searchPokemon(data);
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("searchPokemon", () => {
  it.each([
    ["pikachu", "/pokemon/pikachu"],
    ["  Pikachu  ", "/pokemon/pikachu"],
    ["Mr. Mime", "/pokemon/mr-mime"],
    ["25", "/pokemon/25"],
  ])("redirects %j to %j", async (input, destination) => {
    await submit(input);

    expect(redirect).toHaveBeenCalledWith(destination);
  });

  it("redirects for a misspelled name and lets the page decide", async () => {
    await submit("pikchu");

    expect(redirect).toHaveBeenCalledWith("/pokemon/pikchu");
  });

  it.each(["", "   ", "!!!", "a".repeat(51)])(
    "does not redirect for %j",
    async (input) => {
      await submit(input);

      expect(redirect).not.toHaveBeenCalled();
    },
  );

  it("does not redirect when the field is missing", async () => {
    await submit();

    expect(redirect).not.toHaveBeenCalled();
  });
});
