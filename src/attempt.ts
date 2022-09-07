/**
 * Call the passed action, returning a tuple of result/error.
 * Think of it, as of an inliner of try-catch.
 * @param action
 * @param errorValue either a fixed value returned as error, or a function to map error value
 * @returns [ value, error ] tuple
 *
 * @example
 * const [ value, error ] = attempt(() => JSON.parse(data));
 * if (error) {
 *   // do something
 * }
 * // do something with value
 */
export function attempt<TRet, TErr>(
  action: () => TRet,
  errorValue?: ((err: unknown) => TErr) | TErr
): [ value?: TRet, error?: TErr ] {
  let value: TRet | undefined;
  let error: TErr | undefined;
  try {
    value = action();
  } catch(e) {
    if (errorValue == null) {
      error = e as TErr;
    } else if (errorValue instanceof Function) {
      error = errorValue(e);
    } else {
      error = errorValue
    }
  }
  return [ value, error ];
}