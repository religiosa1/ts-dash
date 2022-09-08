import { describe, expect, it } from "vitest";
import { curry } from "../curry";

describe("curry", () => {
  it("returns a curried function", () => {
    const sum = curry((a, b) => a + b);
    const res1 = sum(2, 3);
    const res2 = sum(2)(3);
    expect(res1).toEqual(res2);
  });

  // TODO. No way to determine variadic args?
  // it("correctly handles variadic functions", () => {
  //   const sum = curry((a, ...b) => a + b.reduce((acc, cur) => acc + cur, 0));
  //   const res1 = sum(1);
  //   expect(res1).toBe("function");
  //   const res1_1 = res1(1);
  //   expect(res1_1).toEqual(2);
  //   const res1_2 = res1(1, 1);
  //   expect(res1_2).toEqual(3);
  //   const res2 = sum(1, 1);
  //   expect(res2).toEqual(2);
  //   const res3 = sum(1, 1, 1);
  //   expect(res3).toEqual(3);
  // });
});

