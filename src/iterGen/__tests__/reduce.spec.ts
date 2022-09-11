import { describe, it, expect } from "vitest";
import { reduce } from "../reduce";

describe("reduce", () => {
  it("reduces", () => {
    const res = reduce((acc, cur) => acc + cur, 0, [1, 2, 3]);
    expect(res).toEqual(6);
  });

  it("supplies indexes to the reducer", () => {
    const res = reduce((acc, _, idx) => {
      acc.push(idx);
      return acc;
    }, [] as number[], [ 1, 2, 3 ]);
    expect(res).toEqual([ 0, 1, 2]);
  });

  it("curries indexes to the reducer", () => {
    const data = [ 1, 2, 3];
    const r = reduce((acc: number, cur: number) => acc + cur);
    // TODO
    // const res1 = r(0, data);
    // expect(res1).toEqual(6);
    const res2 = r(0)(data);
    expect(res2).toEqual(6);
  });
});