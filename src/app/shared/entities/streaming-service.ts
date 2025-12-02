export const streamingServices = [
  'Netflix',
  'Amazon Prime Video',
  'Disney+',
  'Apple TV',
  'RTL +',
  'Joyn',
  'WOW',
] as const;
export type StreamingService = (typeof streamingServices)[number];
