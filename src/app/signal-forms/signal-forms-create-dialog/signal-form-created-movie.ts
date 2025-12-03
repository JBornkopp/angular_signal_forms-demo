import { MovieGenre } from '../../shared/entities/movie-genre';
import { StreamingService } from '../../shared/entities/streaming-service';
import { PriorityLevel } from '../../shared/entities/priority-levels';

export interface SignalFormCreatedMovie {
  title: string;
  genre: MovieGenre | null;
  streamingService: StreamingService | null;
  runtime: number | null;
  priority: PriorityLevel | null;
}
