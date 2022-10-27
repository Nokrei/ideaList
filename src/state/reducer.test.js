import { sortIdeas } from "./reducer";

// we need a funcion that sorts ideas by title

const alpha = {
  title: "alpha",
  description: "first idea description",
  createdAt: new Date(Date.UTC(96, 1, 2, 3, 4, 5)),
  id: 2,
};

const bravo = {
  title: "bravo",
  description: "third idea description",
  createdAt: new Date(Date.UTC(0, 0, 0, 0, 0, 0)),
  id: 3,
};

const delta = {
  title: "delta",
  description: "third idea description",
  createdAt: new Date(),
  id: 1,
};

const dummyIdeas = [delta, alpha, bravo];

describe("SortIdeas function", () => {
  it("should sort alphabetically by title", () => {
    const result = sortIdeas([bravo, delta, alpha], "title");

    expect(result).toStrictEqual([alpha, bravo, delta]);
  });

  it("should sort reverse alphabetically by title", () => {
    const expected = [delta, bravo, alpha];

    const result = sortIdeas(dummyIdeas, "title", true);

    expect(result).toStrictEqual(expected);
  });

  it("should sort by id", () => {
    const result = sortIdeas([alpha, bravo, delta], "id");

    expect(result).toStrictEqual([delta, alpha, bravo]);
  });

  it("should sort by id descending", () => {
    const result = sortIdeas([alpha, bravo, delta], "id", true);

    expect(result).toStrictEqual([bravo, alpha, delta]);
  });

  it("should return an array if ideas is empty", () => {
    const result = sortIdeas();

    expect(result).toStrictEqual([]);
  });
});
