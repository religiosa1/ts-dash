type ArrayOfIterables<T extends readonly any[]> = {
  [K in keyof T]: Iterable<T[K]>;
}

export function zip<T extends readonly any[]>(collections: ArrayOfIterables<T>): Array<[...T]> {
  const iters = collections.map(i => i[Symbol.iterator]());
  const array = [];
  for(;;) {
    const seq = [];
    for (const iter of iters) {
      const item = iter.next();
      if (item.done) {
        return array;
      }
      seq.push(item.value);
    }
    array.push(seq as [...T]);
  }
}