export function getLoadingMessageIndex(
  elapsedMs: number,
  intervalMs: number,
  messageCount: number,
): number {
  if (messageCount <= 0) return 0;
  if (intervalMs <= 0) return messageCount - 1;
  return Math.min(Math.floor(elapsedMs / intervalMs), messageCount - 1);
}
