export const priorityLevels = ['Must Watch', 'Maybe', 'If bored', 'Probably Never'] as const;
export type PriorityLevel = (typeof priorityLevels)[number];
