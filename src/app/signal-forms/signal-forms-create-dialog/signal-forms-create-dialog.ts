import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { NullableFieldCoercionPipe } from '../singal-forms-nullable-field.pipe';
import { SignalFormCreatedMovie } from './signal-form-created-movie';
import { Field, form, min, required } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { MatError, MatFormField, MatHint, MatInput, MatLabel } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { priorityLevels } from '../../shared/entities/priority-levels';
import { streamingServices } from '../../shared/entities/streaming-service';
import { movieGenres } from '../../shared/entities/movie-genre';

@Component({
  selector: 'app-signal-forms-create-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    Field,
    MatError,
    MatHint,
    NullableFieldCoercionPipe
  ],
  templateUrl: './signal-forms-create-dialog.html',
  styleUrl: './signal-forms-create-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsCreateDialog {
  private createdMovie = signal<SignalFormCreatedMovie>({
    title: '',
    genre: null,
    priority: null,
    runtime: null,
    streamingService: null,
  });
  protected movieForm = form(this.createdMovie, (schemaPath) => {
    // title
    required(schemaPath.title, { message: 'Title is required' });

    // genre
    required(schemaPath.genre, { message: 'Genre is required' });

    // streamingService
    required(schemaPath.streamingService, { message: 'Streaming Service is required' });

    // priority
    required(schemaPath.priority, { message: 'Priority is required' });

    // runtime
    min(schemaPath.runtime, 1, { message: 'Runtime must be at least 1 minute' });
  });

  protected onCreate(): void {}

  protected readonly priorityLevels = priorityLevels;
  protected readonly streamingServices = streamingServices;
  protected readonly movieGenres = movieGenres;
}
