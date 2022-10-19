export function map<TArg, TRet>(handler: (item: TArg, index: number) => TRet): ((col: Iterable<TArg>) => Generator<TRet>);
export function map<TArg, TRet>(handler: (item: TArg, index: number) => TRet, collection: Iterable<TArg>): Generator<TRet>;
export function map<TArg, TRet>(handler: (item: TArg, index: number) => TRet, collection?: Iterable<TArg>) {
  function* mapProcesser(collection: Iterable<TArg>) {
    let index = 0;
    for (const item of collection) {
      yield handler(item, index);
      index++;
    }
  }
  if (collection === undefined) {
    return mapProcesser;
  }
  return mapProcesser(collection);
}