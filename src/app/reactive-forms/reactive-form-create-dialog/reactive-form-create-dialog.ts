import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-reactive-form-create-dialog',
  imports: [MatButton, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle],
  templateUrl: './reactive-form-create-dialog.html',
  styleUrl: './reactive-form-create-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveFormCreateDialog {
  protected onCreate(): void {}
}
