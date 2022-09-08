export function filter<TArg>(predicate: (item: TArg, index: number) => unknown): ((col: Iterable<TArg>) => Generator<TArg>);
export function filter<TArg>(predicate: (item: TArg, index: number) => unknown, collection?: Iterable<TArg>): Generator<TArg>;
export function filter<TArg>(predicate: (item: TArg, index: number) => unknown, collection?: Iterable<TArg>) {
  function* filterProcesser(collection: Iterable<TArg>) {
    let index = 0;
    for (const item of collection) {
      if (predicate(item, index)) {
        yield item;
      }
      index++;
    }
  }
  if (collection === undefined) {
    return filterProcesser;
  }
  return filterProcesser(collection);
}