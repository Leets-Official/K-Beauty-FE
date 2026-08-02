export function getLoadingProgress(elapsedMs: number, durationMs: number): number {
  if (durationMs <= 0) return 100;
  return Math.min(Math.max((elapsedMs / durationMs) * 100, 0), 100);
}
