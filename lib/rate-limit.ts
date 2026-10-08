// In-memory sliding window rate limiter
interface RateLimitRecord {
  timestamps: number[];
}

const memoryStore = new Map<string, RateLimitRecord>();

// Clean up stale records periodically
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    memoryStore.forEach((record, key) => {
      record.timestamps = record.timestamps.filter((ts) => now - ts < 60000);
      if (record.timestamps.length === 0) {
        memoryStore.delete(key);
      }
    });
  }, 60000);
}

export function checkRateLimit(
  identifier: string,
  limit: number = 15,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetMs: number } {
  const now = Date.now();
  let record = memoryStore.get(identifier);

  if (!record) {
    record = { timestamps: [] };
    memoryStore.set(identifier, record);
  }

  // Filter out timestamps outside current window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= limit) {
    const oldestTimestamp = record.timestamps[0];
    const resetMs = windowMs - (now - oldestTimestamp);
    return {
      allowed: false,
      remaining: 0,
      resetMs: Math.max(0, resetMs),
    };
  }

  record.timestamps.push(now);
  return {
    allowed: true,
    remaining: limit - record.timestamps.length,
    resetMs: windowMs,
  };
}
