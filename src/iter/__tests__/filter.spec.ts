import { describe, it, expect } from "vitest";
import { filter } from "../filter";

describe("filter", () => {
  it("filters items from a collection based on predicate", () => {
    const res = filter((x) => x % 2, [1, 2, 3, 4]);
    expect(Array.from(res)).toEqual([1, 3]);
  });

  it("curries if collection isn't supplied", () => {
    const f = filter((x: number) => x % 2);
    const res = f([1, 2, 3, 4]);
    expect(Array.from(res)).toEqual([1, 3]);
  });

  it("works with generable iterable", () => {
    const gen = {
      *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
      }
    }
    const result = filter((x) => x % 2, gen);
    expect(Array.from(result)).toEqual([ 1, 3 ]);
  });
});