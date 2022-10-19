import type { Curried } from "../curry";

export function reduce<TCol, TRet>(
  reducer: (previous: TRet, current: TCol, index: number) => TRet,
): Curried<(initValue: TRet, collection: Iterable<TCol>) => TRet>;
export function reduce<TCol, TRet>(
  reducer: (previous: TRet, current: TCol, index: number) => TRet,
  initValue: TRet
): (collection: Iterable<TCol>) => TRet;
export function reduce<TCol, TRet>(
  reducer: (previous: TRet, current: TCol, index: number) => TRet,
  initValue: TRet,
  collection: Iterable<TCol>
): TRet;
export function reduce<TCol, TRet>(
  reducer: (previous: TRet, current: TCol, index: number) => TRet,
  initValue?: TRet,
  collection?: Iterable<TCol>
) {
  const reduceProcesser = (init: TRet, collection?: Iterable<TCol>) => {
    const colReducer = (collection: Iterable<TCol>) => {
      let index = 0;
      let accum: TRet = init;
      for (const item of collection) {
        accum = reducer(accum, item, index);
        index++;
      }
      return accum;
    };
    if (collection === undefined) {
      return colReducer;
    }
    return colReducer(collection);
  }
  if (collection !== undefined) {
    return reduceProcesser(initValue!, collection);
  }
  if (initValue !== undefined) {
    return reduceProcesser(initValue);
  }
  return reduceProcesser;
}