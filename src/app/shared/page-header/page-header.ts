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
  public addEntry = output();

  protected onAddEntry(): void {
    this.addEntry.emit();
  }
}
