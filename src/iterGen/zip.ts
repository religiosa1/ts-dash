type ArrayOfIterables<T extends readonly any[]> = {
  [K in keyof T]: Iterable<T[K]>;
}

export function* zip<T extends readonly any[]>(collections: ArrayOfIterables<T>): Generator<[...T]> {
  const iters = collections.map(i => i[Symbol.iterator]());
  for(;;) {
    const seq = [];
    for (const iter of iters) {
      const item = iter.next();
      if (item.done) {
        return;
      }
      seq.push(item.value);
    }
    yield (seq as [...T]);
  }
}