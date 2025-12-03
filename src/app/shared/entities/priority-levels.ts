export const priorityLevels = ['Must Watch', 'Maybe', 'If bored', 'Probably Never'] as const;
export type PriorityLevel = (typeof priorityLevels)[number];

export function isPriorityLevel(value: string): value is PriorityLevel {
  return priorityLevels.includes(value as PriorityLevel);
}
