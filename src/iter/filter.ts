export function filter<TArg>(predicate: (item: TArg, index: number) => unknown): ((col: Iterable<TArg>) => TArg[]);
export function filter<TArg>(predicate: (item: TArg, index: number) => unknown, collection?: Iterable<TArg>): TArg[];
export function filter<TArg>(predicate: (item: TArg, index: number) => unknown, collection?: Iterable<TArg>) {
  function filterProcesser(collection: Iterable<TArg>) {
    const array = [];
    let index = 0;
    for (const item of collection) {
      if (predicate(item, index)) {
        array.push(item);
      }
      index++;
    }
    return array;
  }
  if (collection === undefined) {
    return filterProcesser;
  }
  return filterProcesser(collection);
}