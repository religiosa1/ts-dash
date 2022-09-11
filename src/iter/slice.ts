export function slice(start: number): ((end: number | null) => <T>(collection: Iterable<T>) => T[]);
export function slice(start: number, end: number | null): (<T>(collection: Iterable<T>) => T[]);
export function slice<T>(start: number, end: number | null, collection: Iterable<T>): T[];
export function slice<T>(start: number, end?: number | null, collection?: Iterable<T>) {
  const sliceProcesser = (end: number | null) => <TL>(collection: Iterable<TL>) => {
    if (
      Array.isArray(collection) ||
      typeof collection === "string"
    ) {
      return collection.slice(start, end ?? undefined);
    }

    if (
      typeof start === "number" &&
      start >= 0 &&
      typeof end === "number" && end >= 0 &&
      start < end
    ) {
      const accum = [];
      let index = 0;
      for (const item of collection) {
        if (index >= start && index < end) {
          accum.push(item);
        } else {
          break;
        }
        index++;
      }
      return accum;
    }
    return Array.from(collection).slice(start, end ?? undefined);
  }

  if (collection !== undefined) {
    return sliceProcesser(end!)(collection);
  }
  if (end !== undefined) {
    return sliceProcesser(end);
  }
  return sliceProcesser;
}
