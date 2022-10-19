import { describe, it, expect } from "vitest";
import { unzip } from "../unzip";

describe("unzip", () => {
  it("unzips an array", () => {
    const ar: Array<[ number, string ]> = [ [1, "a"], [2, "b"], [3, "c"] ];
    const res = unzip(ar);
    expect(res).toEqual([
      [1, 2, 3],
      ["a", "b", "c"]
    ]);
  });
});