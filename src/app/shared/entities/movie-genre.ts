export const movieGenres = [
  'Action',
  'Comedy',
  'Drama',
  'Horror',
  'Science Fiction',
  'Fantasy',
  'Romance',
  'Thriller',
  'Mystery',
  'Documentary',
] as const;
export type MovieGenre = (typeof movieGenres)[number];

export function isMovieGenre(value: string): value is MovieGenre {
  return movieGenres.includes(value as MovieGenre);
}
