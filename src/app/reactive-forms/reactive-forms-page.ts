import { Component, DestroyRef, inject } from '@angular/core';
import { ReactiveFormRating } from './reactive-form-rating/reactive-form-rating';
import { MatButton } from '@angular/material/button';
import { PageHeader } from '../shared/page-header/page-header';
import { MatDialog } from '@angular/material/dialog';
import { SignalFormsCreateDialog } from '../signal-forms/signal-forms-create-dialog/signal-forms-create-dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormCreateDialog } from './reactive-form-create-dialog/reactive-form-create-dialog';

@Component({
  selector: 'app-reactive-forms-page',
  imports: [ReactiveFormRating, PageHeader],
  templateUrl: './reactive-forms-page.html',
  styleUrl: './reactive-forms-page.scss',
})
export class ReactiveFormsPage {
  private readonly dialog = inject(MatDialog);
  private readonly destroRef = inject(DestroyRef);

  protected onAddEntry(): void {
    this.dialog
      .open(ReactiveFormCreateDialog)
      .afterOpened()
      .pipe(takeUntilDestroyed(this.destroRef))
      .subscribe((result) => {
        // todo: handle creation result
      });
  }
}
