# General typescript helper functions

Collection of stuff one can need in almost every project.

- enum helpers: getting enum values, avoiding reverse mapping
- strictly typed pipe/flow functions for functional programming
- strictly typed curry function
- strictly typed, curried, pipe-friendly iterator helpers (map, filter, reduce, zip, slice)
- error handling functions
- promisifed abortable timeout

## Installation

TODO

## Usage:
### Enum helpers

Getting enum values, filtering out reverse-mapping auto-generated by TS
with the correct types inferrence.

```ts
import { enumValues, numericValues } from "ts-dash";

enum Test {
  foo,
  bar,
  biz = "zib",
  baz = "zab"
};

// Get all values from enum
// inferred type === Test[]
// value === [ Test.foo, Test.bar, Test.biz, Test.baz ]
const vals = enumValues(Test);

// Get all numeric values from enum
// inferred type === (Test.foo | Test.bar)[]
// value === [ Test.foo, Test.bar ]
const numVals = numericValues(Test);

// Get all string values from enum
// inferred type === (Test.biz | Test.baz)[]
// value === [ Test.biz, Test.baz ]
const stringVals = stringValues(Test);
```
### Pipe/flow
Strictly recursively typed pipe/flow function-helpers
(while we're waiting on [pipe operator proposal](https://github.com/tc39/proposal-pipeline-operator#pipe-operator--for-javascript))

#### pipe
Moves the initial arg through the pipeline of functions.
Each function must accept a single arg and return the value for the next one.

```ts
pipe(
  2,
  (x: number) => x * 2,
  (x: number) => String(x)
); // returns "4", inferred return type is string
```
Type-checking is fully there:
```ts
pipe(
  2,
  // no input type -- imlicit any
  (x) => Number(x * 2),
  // @ts-expect-error
  // Types of parameters 'x' and 'a' are incompatible.
  // Type 'number' is not assignable to type 'string'.
  (x: string) => String(x)
);
```

#### flow
If instead of piping a ready value through the functions, you want to create a
new one, you can reuse later, there's flow:

```ts
const processer = flow(
  (x) => x * 2,
  (x) => String(x)
);

const res1 = processer(2); // "4"
const res2 = processer(3); // "6"
```

### Curry
Strictly-typed auto-currying function.
Please notice, this won't work with generic functions, so you'll have to
curry them manually.

```ts
function reduce<TCol, TRet>(
  reducer: (previous: TRet, current: TCol, index: number) => TRet,
  initValue: TRet,
  collection: Iterable<TCol>
): TRet;
// Curry with reducer and initial value
function reduce<TCol, TRet>(
  reducer: (previous: TRet, current: TCol, index: number) => TRet,
  initValue: TRet
): (collection: Iterable<TCol>) => TRet;
// Reducer only curry
function reduce<TCol, TRet>(
  reducer: (previous: TRet, current: TCol, index: number) => TRet,
): Curried<(initValue: TRet, collection: Iterable<TCol>) => TRet>;
```

### iterator-helpers

Your good old map, filter, reduce, zip and slice, but curried and having
the lambda handler as the first param, which makes them much more suitable
for usage in pipe/flow function or as callback handler.

here is an example, how it can be used in pipe (using curry):

```ts
import { pipe, map, filter } from "ts-dash";

// yes, this can be done without any pipe, it's just an example
pipe(
  [1, 2, 3, 4, 5, 6],
  map((i) => i * 2),
  filter((i) => i % 3 === 0)
); // [6, 12]
```

#### map

```ts
function map<TArg, TRet>(
  handler: (item: TArg, index: number) => TRet,
  collection: Iterable<TArg>
): TRet[];

// curried
function map<TArg, TRet>(
  handler: (item: TArg, index: number) => TRet
): ((col: Iterable<TArg>) => TRet[]);
```

#### filter

```ts
function filter<TArg>(
  predicate: (item: TArg, index: number) => unknown,
  collection: Iterable<TArg>
): TArg[];

// curried
function filter<TArg>(
  predicate: (item: TArg, index: number) => unknown
): ((col: Iterable<TArg>) => TArg[]);
```

#### reduce
```ts
function reduce<TCol, TRet>(
  reducer: (previous: TRet, current: TCol, index: number) => TRet,
  initValue: TRet,
  collection: Iterable<TCol>
): TRet;

// Curry with init value
function reduce<TCol, TRet>(
  reducer: (previous: TRet, current: TCol, index: number) => TRet,
  initValue: TRet
): (collection: Iterable<TCol>) => TRet;

// Curry without init value
function reduce<TCol, TRet>(
  reducer: (previous: TRet, current: TCol, index: number) => TRet,
): (initValue: TRet) => (collection: Iterable<TCol>) => TRet;
```

Example:

```ts
import { reduce } from "ts-dash";

reduce((acc, cur) => acc + cur, 0, [1, 2, 3]); // 6

// Curried variants
const sum = reduce((acc, cur) => acc + cur, 0);
sum([1, 2, 3]); // 6

const sum2 = reduce((acc, cur) => acc + cur);
sum2(3, [1, 2, 3]); // 9
sum2(3)([1, 2, 3]); // 9
```

#### zip
Converting tuple of collectitons into array of tuples.
When some collection is ended, zip exits.

```ts
type ArrayOfIterables<T extends readonly any[]> = {
  [K in keyof T]: Iterable<T[K]>;
}

export function zip<T extends readonly any[]>(...collections: ArrayOfIterables<T>): Array<[...T]>;
```

Example:

```ts
zip([
  [1, 2, 3],
  ["a", "b", "c", "redundant"],
]); // returns [[1, "a"], [2, "b"], [3, "c"]]
```

#### unzip
Converting array of tuples into tuple of arrays

```ts
type ArrayOfArrays<T extends readonly any[]> = {
  [K in keyof T]: Array<T[K]>;
}

function unzip<T extends any[]>(iterableOfTuples: Iterable<[...T]>): ArrayOfArrays<T>;
```

Example:
```ts
unzip([
  [1, "a"],
  [2, "b"],
  [3, "c"]
]); // returns [[1, 2, 3], ["a", "b", "c"]]
```

### Error helpers

#### attempt

Call the passed action, returning a tuple of result/error.
Think of it, as of an inliner of try-catch.

```ts
export function attempt<TRet, TDef = undefined>(
  action: () => TRet,
  defaultValue?: ((err: unknown) => TDef) | TDef
): [ value?: TRet | TDef, error?: unknown | undefined ];
```

Example
```ts
 const [ value, error ] = attempt(() => JSON.parse(data));
 if (error) {
   // do something
 } else {
   // do something with value
 }
 ```

Optional second arg can be either as default value if error happened, or
a function, receiving that error and returning the value based on it.

### pause

Promisified abortable timeout.

```ts

import { pause, AbortError } from "ts-dash";

await pause(3000);

// OR

const a = new AbortController();
pause(2000, { signal: a.signal })
  .then(() => ... )
  .catch((err) => {
    if (err.name === "AbortError") {
      ...
    }
  })
a.abort();
// OR using a special AbortError helper, so your err.name is set correctly.
a.abort(new AbortError("I'm tired of waiting"))
```

## Contributing
If you have any ideas or suggestions or want to report a bug, feel free to
write in the issues section or create a PR.

## License
ts-dash is MIT licensed.