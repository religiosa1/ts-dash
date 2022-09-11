#!/usr/bin/env node

/**
 * Comparing performance of:
 * - generator based iter functions
 * - vs regular array based iter functions
 * - vs native iter functions
 * */

import { PerformanceObserver, performance } from 'node:perf_hooks';
import { iter, iterGen } from "../dist/index.es.js";

const dummyData1 = Array.from({ length: 20_000 }, () => Math.random());
const dummyData2 = Array.from({ length: 200_000 }, () => Math.random());
const dummyData3 = Array.from({ length: 2_000_000 }, () => Math.random());
const mapperFunc = (x) => x * 2;

const obs = new PerformanceObserver((items) => {
  console.log(items.getEntries());
  performance.clearMarks();
});

obs.observe({ type: 'measure' });

function* enumerate(iterable) {
  let index = 0;
  for (const item of iterable) {
    yield [ item, index++ ];
  }
}

for (const [data, index] of enumerate([ dummyData1, dummyData2, dummyData3 ])) {
  const mark = `iter map ${index}`;
  const markGen = `iterGen map ${index}`;
  performance.mark(mark);
  iter.map(mapperFunc, data);
  performance.measure(mark, mark);

  performance.mark(markGen);
  Array.from(iterGen.map(mapperFunc, data));
  performance.measure(markGen, markGen);
}

