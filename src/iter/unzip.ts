export type ArrayOfArrays<T extends readonly any[]> = {
  [K in keyof T]: Array<T[K]>;
}

export function unzip<T extends any[]>(iterableOfTuples: Iterable<[...T]>): ArrayOfArrays<T> {
  const retval = [] as ArrayOfArrays<T>;
  for (const tuple of iterableOfTuples) {
    for (let i=0; i<tuple.length; i++) {
      if (!Array.isArray(retval[i])) {
        retval[i] = [];
      }
      retval[i].push(tuple[i]);
    }
  }
  return retval;
}