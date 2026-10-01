'use strict';

const target = String(process.env.STRESS_TARGET || 'https://flambeau-shop.vercel.app').replace(/\/$/, '');
const levels = [10, 25, 50];
const paths = ['/api/health', '/api/products'];

async function request(path) {
  const started = performance.now();
  try {
    const response = await fetch(target + path, {
      headers: { 'User-Agent': 'flambeau-safe-stress-test/1.0' }
    });
    await response.arrayBuffer();
    return {
      ok: response.ok,
      status: response.status,
      durationMs: performance.now() - started
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      durationMs: performance.now() - started,
      error: error.message
    };
  }
}

function percentile(values, p) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.ceil((p / 100) * sorted.length) - 1);
  return sorted[Math.max(0, index)];
}

async function runLevel(path, concurrency) {
  const started = performance.now();
  const results = await Promise.all(
    Array.from({ length: concurrency }, () => request(path))
  );
  const elapsed = performance.now() - started;
  const durations = results.map((item) => item.durationMs);
  const successful = results.filter((item) => item.ok).length;

  return {
    path,
    concurrency,
    successful,
    failed: results.length - successful,
    successRate: Math.round((successful / results.length) * 10000) / 100,
    totalMs: Math.round(elapsed),
    avgMs: Math.round(durations.reduce((a, b) => a + b, 0) / durations.length),
    p95Ms: Math.round(percentile(durations, 95)),
    maxMs: Math.round(Math.max(...durations)),
    statuses: results.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {})
  };
}

(async () => {
  console.log('Safe read-only stress test:', target);
  console.log('No orders will be created.\n');

  let failed = false;

  for (const path of paths) {
    for (const level of levels) {
      const result = await runLevel(path, level);
      console.log(JSON.stringify(result));
      if (result.successRate < 100) failed = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  if (failed) process.exitCode = 1;
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
