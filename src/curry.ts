// whole implementation is based on jcalz answer here:
// https://stackoverflow.com/questions/63903982/how-to-write-curry-and-compose-in-typescript-4
type SameLength<T extends any[]> = Extract<{ [K in keyof T]: any }, any[]>

export type CurriedFn<TArgs extends any[], TRet> =
  <P extends Partial<TArgs>>(...args: P) => P extends TArgs
    ? TRet
    : TArgs extends [...SameLength<P>, ...infer TRest]
    ? TRest extends any[]
      ? CurriedFn<TRest, TRet>
      : never
    : never;

export type Curried<Fn extends (...args: any[]) => any> =
  Fn extends (...args: infer TArgs) => infer TRet ? CurriedFn<TArgs, TRet> : never;

/**
 * Takes a function that receives multiple arguments and returns a "curried"
 * version of that function that can take any number of those arguments and
 * if they are less than needed a new function that takes the rest of them will be returned
 *
 * Notice: type system won't work with generic functions, as Typescript lacks higher kinded types.
 */
export function curry<
  TArgs extends any[],
  TReturn
>(fn: (...args: TArgs) => TReturn): CurriedFn<TArgs, TReturn> {
  return (...args: any[]): any => {
    if (args.length < fn.length) {
      return curry((fn as any).bind(undefined, ...args));
    }
    return fn(...args as any);
  };
}