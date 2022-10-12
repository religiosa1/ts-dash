import { it, describe, beforeEach, afterEach, expect, vi } from "vitest";
import { pause } from "../pause";

describe("pause", () => {
  beforeEach(() => { vi.useFakeTimers() });
  afterEach(() => { vi.useRealTimers() });

  it("waits for specified amount of time", async () => {
    const t1 = Date.now();
    pause(5000).then(() => {
      const t2 = Date.now();
      expect(t2 - t1).toBe(5000);
    });
    vi.advanceTimersByTime(5000);
  });

  it("aborts with the correct error.name", () => {
    const controller = new AbortController();
    const prms = pause(5000, { signal: controller.signal })
    controller.abort();
    expect(prms).rejects.toEqual({ name: "AbortError" });
  });

  it("aborts with the provided reason", () => {
    const controller = new AbortController();
    const prms = pause(5000, { signal: controller.signal })
    controller.abort("test");
    expect(prms).rejects.toBe("test");
  });
});