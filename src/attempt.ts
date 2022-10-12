/**
 * Call the passed action, returning a tuple of result/error.
 * Think of it, as of an inliner of try-catch.
 * @param action
 * @param defaultValue value if error happened or a function generating this value from error
 * @returns [ value, error ] tuple
 *
 * @example
 * const [ value, error ] = attempt(() => JSON.parse(data));
 * if (error) {
 *   // do something
 * } else {
 *   // do something with value
 * }
 */
export function attempt<TRet, TDef = undefined>(
  action: () => TRet,
  defaultValue?: ((err: unknown) => TDef) | TDef
): [ value?: TRet | TDef, error?: unknown | undefined ] {
  let value: TRet | TDef;
  let error: unknown | undefined;
  try {
    value = action();
  } catch(e) {
    error = e;
    if (defaultValue instanceof Function) {
      value = defaultValue(e);
    } else if (defaultValue !== undefined) {
      value = defaultValue;
    }
  }
  return [ value!, error ];
}