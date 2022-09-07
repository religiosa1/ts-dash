export type PipeFn<TArg = any, TRet = any> = (a: TArg) => TRet;

export type LastPipeItem<
  TFns extends readonly PipeFn[]
> = TFns extends [PipeFn<infer A, infer R>, ...infer Rest]
  ? Rest extends [PipeFn, ...any]
    ? LastPipeItem<Rest>
    : PipeFn<A, R>
  : never;

export type PipeResult<TFns extends readonly PipeFn[]> = ReturnType<LastPipeItem<TFns>>

export type PipeArgs<TInit, T extends readonly PipeFn[]> = T extends [PipeFn<infer A, infer R>, ...infer Rest]
  ? Rest extends [PipeFn, ...any]
      ? [PipeFn<TInit, R>, ...PipeArgs<A, Rest>]
      : [PipeFn<TInit, R>]
  : T;

export type PipeInit<T extends readonly PipeFn[]> = T extends [PipeFn<infer A, any>, ...any[]]
  ? A
  : never;

export function pipe<
  TInit,
  TFns extends readonly PipeFn[]
>(x: TInit, ...fns: PipeArgs<TInit, TFns>): PipeResult<TFns> {
  return fns.reduce((v, f) => f(v), x) as PipeResult<TFns>;
}

export function flow<TFns extends readonly PipeFn[]>(...fns: TFns): (arg: PipeInit<TFns>) => PipeResult<TFns>{
  return (arg) => fns.reduce((v, f) => f(v), arg) as PipeResult<TFns> ;
}
