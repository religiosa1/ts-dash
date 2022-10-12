/** Special error class, if abort reason is nullish.  */
export class AbortError extends Error {
  name: "AbortError";
  constructor(message: string = "signal is aborted without reason") {
    super(message);
    this.name = "AbortError";
  }
}

interface PauseOpts {
  signal?: AbortSignal
}
/**
 * Promisified abortable timeout.
 * @param timeout timeout duration in ms
 * @param [opts.signal] optional AbortController
 * @returns Promise, resolved when timeout is passed, rejected if aborted (in the same way as fetch() is)
 */
export function pause(timeout: number, { signal }: PauseOpts = {}) {
  return new Promise<void>((res, rej) => {
    try {
      let to: ReturnType<typeof setTimeout> | null;
      const abortHandler = (e: Event) => {
        if (to) {
          clearTimeout(to);
          to = null;
        }
        rej((e?.target as AbortSignal)?.reason ?? new AbortError())
      };

      to = setTimeout(() => {
        to = null;
        if (signal?.onabort instanceof Function) {
          signal.removeEventListener("abort", abortHandler);
        }
        res();
      }, timeout);

      if (signal?.onabort instanceof Function) {
        signal.addEventListener("abort", abortHandler);
      }
    } catch(e) {
      rej(e);
    }
  });
}