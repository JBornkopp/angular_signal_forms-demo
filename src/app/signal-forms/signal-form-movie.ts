import { SignalFormCreatedMovie } from './signal-forms-create-dialog/signal-form-created-movie';

export interface SignalFormMovie extends SignalFormCreatedMovie {
  rating: number | null;
  watched: boolean;
}
