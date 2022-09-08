// TODO fix types

type TupleOfLength<T extends readonly any[]> = Extract<{ [K in keyof T]: any }, any[]>

export type CurriedFn<TArgs extends readonly any[], TReturn> = <
  TCurrentArgs extends TArgs extends [infer TFirstArg, ...infer TRest]
    ?[TFirstArg, ...Partial<TRest>]
    : never
>(...args: TCurrentArgs) => TCurrentArgs extends TArgs
  ? TReturn
  : TArgs extends [...TupleOfLength<TCurrentArgs>, ...infer TRest]
  ? CurriedFn<TRest, TReturn>
  : never;

/**
 * Takes a function that receives multiple arguments and returns a "curried"
 * version of that function that can take any number of those arguments and
 * if they are less than needed a new function that takes the rest of them will be returned
 */
export function curry<
  TArgs extends readonly any[],
  TReturn
>(fn: (...args: TArgs) => TReturn): CurriedFn<TArgs, TReturn> {
  return function curried(...args) {
    if (args.length < fn.length){
        return curried.bind(undefined, ...args)
    }
    return fn(...args);
  };
}