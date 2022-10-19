export function map<TArg, TRet>(handler: (item: TArg, index: number) => TRet): ((col: Iterable<TArg>) => TRet[]);
export function map<TArg, TRet>(handler: (item: TArg, index: number) => TRet, collection: Iterable<TArg>): TRet[];
export function map<TArg, TRet>(handler: (item: TArg, index: number) => TRet, collection?: Iterable<TArg>) {
  function mapProcesser(collection: Iterable<TArg>) {
    const array = [];
    let index = 0;
    for (const item of collection) {
      array.push(handler(item, index));
      index++;
    }
    return array;
  }
  if (collection === undefined) {
    return mapProcesser;
  }
  return mapProcesser(collection);
}