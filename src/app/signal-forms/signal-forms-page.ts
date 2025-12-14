import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { PageHeader } from '../shared/page-header/page-header';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SignalFormRating } from './signal-form-rating/signal-form-rating';
import { SignalFormsCreateDialog } from './signal-forms-create-dialog/signal-forms-create-dialog';
import {
  applyEach,
  customError,
  Field,
  form,
  min,
  required,
  validate,
} from '@angular/forms/signals';
import { SignalFormMovie } from './signal-form-movie';
import {
  AccordionContent,
  AccordionGroup,
  AccordionPanel,
  AccordionTrigger,
} from '@angular/aria/accordion';
import { AccordionTitle } from '../shared/accordion-title/accordion-title';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatError, MatFormField, MatHint, MatInput, MatLabel } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { SignalFormCreatedMovie } from './signal-forms-create-dialog/signal-form-created-movie';
import { LocalStorage } from '../shared/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { movieGenreValues } from '../shared/entities/movie-genre';
import { SignalSelectBox } from './signal-select-box/signal-select-box';
import { streamingServiceValues } from '../shared/entities/streaming-service';
import { priorityLevelValues } from '../shared/entities/priority-levels';
import { NullableFieldCoercionPipe } from './singal-forms-nullable-field.pipe';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-signal-forms-page',
  imports: [
    PageHeader,
    AccordionContent,
    AccordionGroup,
    AccordionPanel,
    AccordionTitle,
    AccordionTrigger,
    FormsModule,
    MatIcon,
    MatFormField,
    MatLabel,
    Field,
    MatError,
    MatInput,
    SignalSelectBox,
    MatHint,
    MatCheckbox,
    NullableFieldCoercionPipe,
    SignalFormRating
  ],
  templateUrl: './signal-forms-page.html',
  styleUrl: './signal-forms-page.scss',
})
export class SignalFormsPage {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly localStorage = inject(LocalStorage);
  private readonly snackBar = inject(MatSnackBar);

  private readonly localStorageKey = 'signal-forms';

  protected movies = signal<{ movies: SignalFormMovie[] }>({ movies: [] });
  private savedMoviesValue = signal<SignalFormMovie[]>([]);
  protected hasChanges = computed(() => !isEqual(this.movies().movies, this.savedMoviesValue()));
  protected movieForm = form(this.movies, (schemaPath) => {
    applyEach(schemaPath.movies, (schemaPath) => {
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

      // rating
      validate(schemaPath.rating, ({ value, valueOf }) => {
        if (valueOf(schemaPath.watched) === false) {
          return customError({ message: 'Rating can only be set if the movie has been watched' });
        }
        return undefined;
      });
    });
  });

  constructor() {
    const previouslySaved = this.localStorage.readEntry<SignalFormMovie[]>(this.localStorageKey);
    if (previouslySaved) {
      this.movies.set({ movies: previouslySaved });
      this.savedMoviesValue.set(previouslySaved);
    }
    effect(() => {
      this.localStorage.writeEntry(this.localStorageKey, this.savedMoviesValue());
    });
  }

  protected onAddEntry(): void {
    this.dialog
      .open(SignalFormsCreateDialog)
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: SignalFormCreatedMovie | undefined) => {
        if (result !== undefined) {
          this.movies.update((prevValue) => ({
            movies: [...prevValue.movies, { ...result, rating: null, watched: false }],
          }));
        }
      });
  }

  protected onDelete(index: number) {
    this.movies.update((movies) => ({ movies: movies.movies.splice(index, 1) }));
    const title = this.movies().movies[index].title;
    this.snackBar.open(`${title} was removed!`, '', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  protected onSave(): void {
    this.savedMoviesValue.set(this.movies().movies);
  }

  protected readonly movieGenreValues = movieGenreValues;
  protected readonly streamingServiceValues = streamingServiceValues;
  protected readonly priorityLevelValues = priorityLevelValues;
}
