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

  it("flow creates a piping function", () => {
    const processer = flow(
      (x) => x * 2,
      (x) => String(x)
    );

    const res1 = processer(2);
    const res2 = processer(3);

    expect(res1).toBe("4");
    expect(res2).toBe("6");
  });
});