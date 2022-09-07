import { it, describe, expect } from "vitest";
import { numericValues, stringValues, enumValues } from "../enum";

describe("enum", () => {
  enum Test {
    foo,
    bar,
    biz = "zib",
    baz = "zab"
  };

  it("numericValues returns numeric values form enum", () =>{
    expect(numericValues(Test)).toEqual([ Test.foo, Test.bar ]);
  });

  it("stringValues returns string values form enum", () =>{
    expect(stringValues(Test)).toEqual([ Test.biz, Test.baz ]);
  });

  it("enumValues returns all values form enum without reverse mapping", () =>{
    expect(enumValues(Test)).toEqual([ Test.foo, Test.bar, Test.biz, Test.baz ]);
  });
});
