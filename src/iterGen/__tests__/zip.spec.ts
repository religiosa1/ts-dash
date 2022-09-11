import { describe, it, expect } from "vitest";
import { zip } from "../zip";

describe("zip", () => {
  it("zips collections from arguments into collection of tuples", () => {
    const res = zip(
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    );
    expect(Array.from(res)).toEqual([ [1, 4, 7], [2, 5, 8], [3, 6, 9] ]);
  });

  it("trims resulting collection to the shortest collection", () => {
    const res = zip(
      [1, 2, 3],
      [4, 5],
      [7, 8, 9]
    );
    expect(Array.from(res)).toEqual([ [1, 4, 7], [2, 5, 8] ]);
  });

  it("works with generale iterables", () => {
    const res = zip(
      "qwe",
      "asd",
    );
    expect(Array.from(res)).toEqual([ ["q", "a"], ["w", "s"], ["e", "d"] ]);
  });
});