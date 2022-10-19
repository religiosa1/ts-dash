/** Getting values of an enum
 * Any non-const enum (numeric, string or heterogeneous) can be used, reversed mapping values
 * auto generated by typescript are filtered out.
 */
export function enumValues<T extends object>(e: T): Array<T[keyof T]> {
  return Object.values(e).filter((v) => (
    typeof v === "number"
    || (typeof v === "string" && !(v in e))
  )) as Array<T[keyof T]>;
}

export type Numeric<T> = {
  [K in keyof T]: T[K] extends number ? T[K] : never;
}

/** Getting numeric values of an enum */
export function numericValues<T extends object>(e: T): Array<Numeric<T>[keyof Numeric<T>]> {
  return Object.values(e).filter((v) => typeof v === "number");
}

export type Stringic<T> = {
  [K in keyof T]: T[K] extends string ? T[K] : never;
}

/** Getting string values of an enum */
export function stringValues<T extends object>(e: T): Array<Stringic<T>[keyof Stringic<T>]> {
  return Object.values(e).filter((v) => typeof v === "string" && !(v in e));
}
