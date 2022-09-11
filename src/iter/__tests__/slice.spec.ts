import { describe, it, expect } from "vitest";
import { slice } from "../slice";

describe("slice", () => {
  function *gen<T>(arg: Iterable<T>) { for (const i of arg) { yield i; }}

  it("slices an array", () => {
    const res = slice(0, 3, [1, 2, 3, 4, 5]);
    expect(res).toEqual([1, 2, 3]);
  });

  it("slices an array to negative end", () => {
    const res = slice(0, -3, [1, 2, 3, 4, 5]);
    expect(res).toEqual([1, 2]);
  });

  it("slices an array from end", () => {
    const res = slice(-3, null, [1, 2, 3, 4, 5]);
    expect(res).toEqual([3, 4, 5]);
  });

  it("slices an iterable", () => {
    const res = slice(0, 3, gen([1, 2, 3, 4, 5]));
    expect(res).toEqual([1, 2, 3]);
  });

  it("slices an iterable to negative end", () => {
    const res = slice(0, -3, gen([1, 2, 3, 4, 5]));
    expect(res).toEqual([1, 2]);
  });

  it("slices an iterable from end", () => {
    const res = slice(-3, null, gen([1, 2, 3, 4, 5]));
    expect(res).toEqual([3, 4, 5]);
  });

  it("curries if lacks arguments", () => {
    const arr = [1, 2, 3, 4, 5];
    const s1 = slice(0);
    const s2 = slice(0, 3);
    expect(s1(3)(arr)).toEqual(s2(arr));
  });
});