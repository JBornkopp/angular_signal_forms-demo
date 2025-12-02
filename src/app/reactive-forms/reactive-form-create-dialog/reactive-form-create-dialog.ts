import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatHint, MatInput, MatLabel } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovieGenre, movieGenres } from '../../shared/entities/movie-genre';
import { MatOption, MatSelect } from '@angular/material/select';
import { StreamingService, streamingServices } from '../../shared/entities/streaming-service';
import { PriorityLevel, priorityLevels } from '../../shared/entities/priority-levels';

export type ReactiveFormsCreatedMovie = ReturnType<
  ReactiveFormCreateDialog['movieForm']['getRawValue']
>;

@Component({
  selector: 'app-reactive-form-create-dialog',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatLabel,
    MatInput,
    MatHint,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
  ],
  templateUrl: './reactive-form-create-dialog.html',
  styleUrl: './reactive-form-create-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveFormCreateDialog {
  private readonly dialogRef = inject(MatDialogRef<ReactiveFormCreateDialog>);
  private readonly fb = inject(FormBuilder);

  protected movieForm = this.fb.group({
    title: this.fb.nonNullable.control('', [Validators.required]),
    genre: this.fb.control<MovieGenre | null>(null, [Validators.required]),
    streamingService: this.fb.control<StreamingService | null>(null, [Validators.required]),
    runtime: this.fb.control<number | null>(null, [Validators.min(1)]),
    priority: this.fb.control<PriorityLevel | null>(null, [Validators.required]),
  });

  protected onCreate(): void {
    if (this.movieForm.valid) {
      this.dialogRef.close(this.movieForm.getRawValue());
    }
  }

  protected readonly movieGenres = movieGenres;
  protected readonly streamingServices = streamingServices;
  protected readonly priorityLevels = priorityLevels;
}
