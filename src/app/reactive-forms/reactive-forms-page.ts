import { AccordionContent, AccordionGroup, AccordionPanel, AccordionTrigger } from '@angular/aria/accordion';
import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { AccordionTitle } from '../shared/accordion-title/accordion-title';
import { ReactiveFormRating } from './reactive-form-rating/reactive-form-rating';
import { PageHeader } from '../shared/page-header/page-header';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ReactiveFormsCreatedMovie,
  ReactiveFormCreateDialog,
} from './reactive-form-create-dialog/reactive-form-create-dialog';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MovieGenre, movieGenres } from '../shared/entities/movie-genre';
import { StreamingService, streamingServices } from '../shared/entities/streaming-service';
import { PriorityLevel, priorityLevels } from '../shared/entities/priority-levels';
import { MatError, MatFormField, MatHint, MatInput, MatLabel } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { LocalStorage } from '../shared/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export type ReactiveMovieFormEntry = ReturnType<ReactiveFormsPage['createMovieForm']>;
export type ReactiveMovieFormEntryValue = ReturnType<ReactiveMovieFormEntry['getRawValue']>;

@Component({
  selector: 'app-reactive-forms-page',
  imports: [
    ReactiveFormRating,
    PageHeader,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatCheckbox,
    MatIcon,
    MatError,
    AccordionGroup,
    AccordionTrigger,
    AccordionTitle,
    AccordionPanel,
    AccordionContent
  ],
  templateUrl: './reactive-forms-page.html',
  styleUrl: './reactive-forms-page.scss',
})
export class ReactiveFormsPage implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly localStorage = inject(LocalStorage);
  private readonly snackBar = inject(MatSnackBar);

  private readonly localStorageKey = 'reactive-forms';
  private readonly movieFormArrayInitialValue: ReactiveMovieFormEntry[] = [];
  protected readonly movieFormArray = this.fb.nonNullable.array<ReactiveMovieFormEntry>(
    this.movieFormArrayInitialValue,
  );

  protected readonly priorityLevels = priorityLevels;
  protected readonly streamingServices = streamingServices;
  protected readonly movieGenres = movieGenres;

  protected readonly autExpandedFormEntry = signal<number>(0)

  public ngOnInit(): void {
    const previouslySaved = this.localStorage.readEntry<ReactiveMovieFormEntryValue[]>(
      this.localStorageKey,
    );
    if (previouslySaved) {
      previouslySaved.forEach((entry) => this.movieFormArray.push(this.createMovieForm(entry)));
      // todo: check if this can be omitted
      this.cdr.detectChanges();
    }
  }

  // explicitly set no return type do derive form array type from here
  private createMovieForm(
    created: ReactiveFormsCreatedMovie & { watched: boolean; rating: number | null },
  ) {
    return this.fb.nonNullable.group({
      title: this.fb.nonNullable.control(created.title, [Validators.required]),
      genre: this.fb.control<MovieGenre | null>(created.genre, [Validators.required]),
      streamingService: this.fb.control<StreamingService | null>(created.streamingService, [
        Validators.required,
      ]),
      runtime: this.fb.control<number | null>(created.runtime, [Validators.min(1)]),
      priority: this.fb.control<PriorityLevel | null>(created.priority, [Validators.required]),
      watched: this.fb.nonNullable.control<boolean>(created.watched),
      rating: this.fb.control<number | null>(created.rating, [ratingAppliedWatchedValidator()]),
    });
  }

  private createAndAddMovieFormEntry(created: ReactiveFormsCreatedMovie): void {
    this.movieFormArray.push(this.createMovieForm({ ...created, watched: false, rating: null }));
    // todo: check if this can be omitted
    this.cdr.detectChanges();
    this.autExpandedFormEntry.set(this.movieFormArray.length -1);
  }

  protected onAddEntry(): void {
    this.dialog
      .open(ReactiveFormCreateDialog)
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: ReactiveFormsCreatedMovie | undefined) => {
        if (result !== undefined) {
          this.createAndAddMovieFormEntry(result);
        }
      });
  }

  protected onSave(): void {
    this.localStorage.writeEntry(this.localStorageKey, this.movieFormArray.getRawValue());
    this.snackBar.open('Saved all entries to local storage!', '', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  protected onDelete(index: number, title: string): void {
    this.movieFormArray.removeAt(index);
    this.snackBar.open(`${title} was removed!`, '', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
  }

  protected createPanelId(entryIndex: number): string {
    return `reactive-panel-${entryIndex}`;
  }
}

export function ratingAppliedWatchedValidator(): ValidatorFn {
  return (control: AbstractControl<number | null>): ValidationErrors | null => {
    if (control.getRawValue() === null) {
      return null;
    }

    const parent = control.parent;
    if (!parent) {
      return null;
    }

    const watched: boolean | undefined = parent.get('watched')?.getRawValue();
    if (watched === false) {
      return { 'rating-applied-but-not-watched': true };
    }
    return null;
  };
}
