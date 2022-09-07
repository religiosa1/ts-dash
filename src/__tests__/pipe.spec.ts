import { describe, it, expect } from "vitest";
import { pipe, flow } from "../pipe";

describe("pipe/flow", () => {
  it("successfully pipes a value through handlers", () => {
    const result = pipe(
      2,
      (x) => x * 2,
      (x) => String(x)
    );

    expect(result).toBe("4");
  });

  it("controls pipe handlers argument types", () => {
    pipe(
      2,
      (x: number) => x * 2,
      (x: number) => String(x)
    );

    pipe(
      2,
      (x: number) => x * 2,
      // @ts-expect-error
      (x: string) => String(x)
    );
  });

// const b = flow(
//   (arg: number) => arg,
//   (arg: number) => String(arg)
// );
});