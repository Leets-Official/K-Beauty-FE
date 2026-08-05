const recommendationQueries = {
  all: ['recommendations'] as const,
  current: () => [...recommendationQueries.all, 'current'] as const,
  shared: (shareToken: string) => [...recommendationQueries.all, 'shared', shareToken] as const,
};

export { recommendationQueries };
