export const streamingServices = [
  'Netflix',
  'Amazon Prime Video',
  'Disney+',
  'Apple TV',
  'RTL +',
  'Joyn',
  'WOW',
] as const;
export const streamingServiceValues = Object.values(streamingServices);
export type StreamingService = (typeof streamingServices)[number];

export function isStreamingService(value: string): value is StreamingService {
  return streamingServices.includes(value as StreamingService);
}
