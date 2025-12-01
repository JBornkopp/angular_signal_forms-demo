import { Component, DestroyRef, inject } from '@angular/core';
import { PageHeader } from '../shared/page-header/page-header';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SignalFormsCreateDialog } from './signal-forms-create-dialog/signal-forms-create-dialog';

@Component({
  selector: 'app-signal-forms-page',
  imports: [PageHeader],
  templateUrl: './signal-forms-page.html',
  styleUrl: './signal-forms-page.scss',
})
export class SignalFormsPage {
  private readonly dialog = inject(MatDialog);
  private readonly destroRef = inject(DestroyRef);

  protected onAddEntry(): void {
    this.dialog
      .open(SignalFormsCreateDialog)
      .afterOpened()
      .pipe(takeUntilDestroyed(this.destroRef))
      .subscribe((result) => {
        // todo: handle creation result
      });
  }
}
