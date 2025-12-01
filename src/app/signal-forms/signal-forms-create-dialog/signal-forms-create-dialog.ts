import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-signal-forms-create-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButton, MatDialogClose],
  templateUrl: './signal-forms-create-dialog.html',
  styleUrl: './signal-forms-create-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsCreateDialog {
  protected onCreate(): void {}
}
