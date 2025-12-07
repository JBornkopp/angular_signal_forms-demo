import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-page-header',
  imports: [MatButton],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeader {
  public title = input.required<string>();
  public hasChanges = input<boolean>(false);
  public addEntry = output();
  public save = output();

  protected onAddEntry(): void {
    this.addEntry.emit();
  }

  protected onSave(): void {
    this.save.emit();
  }
}
