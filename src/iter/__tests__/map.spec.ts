import { describe, it, expect } from "vitest";
import { map } from "../map";

describe("map", () => {
  it("maps values", () => {
    const result = map((x) => x * 2, [ 1, 2, 3 ]);
    expect(Array.from(result)).toEqual([ 2, 4, 6 ]);
  });

  it("curries, if collection is not provided", () => {
    const m = map((x: number) => x * 2);
    const result = m([ 1, 2, 3 ]);
    expect(Array.from(result)).toEqual([ 2, 4, 6 ]);
  });

  it("curried function is reusable", () => {
    const m = map((x: number) => x * 2);
    const result1 = m([ 1, 2, 3 ]);
    const result2 = m([ 3, 2, 1 ]);
    expect(Array.from(result1)).toEqual([ 2, 4, 6 ]);
    expect(Array.from(result2)).toEqual([ 6, 4, 2 ]);
  });

  it("curried function index reset when reused", () => {
    const m = map((_, idx) => idx);
    const result1 = m([ 1, 2, 3 ]);
    const result2 = m([ 3, 2, 1 ]);
    expect(Array.from(result1)).toEqual([ 0, 1, 2 ]);
    expect(Array.from(result2)).toEqual([ 0, 1, 2 ]);
  });

  it("supplies indexes to mapper function", () => {
    const result = map((_, idx) => idx, [ 1, 2, 3]);
    expect(Array.from(result)).toEqual([0, 1, 2]);
  });

  it("works correctly with generable iterable", () => {
    const gen = function*() {
      yield 1;
      yield 2;
      yield 3;
    }
    const result = map((x) => x * 2, gen());
    expect(Array.from(result)).toEqual([ 2, 4, 6 ]);
  });
});