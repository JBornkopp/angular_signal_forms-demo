import { Option } from '@angular/aria/listbox';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-select-box-entry',
  imports: [
    Option
  ],
  templateUrl: './select-box-entry.html',
  styleUrl: './select-box-entry.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectBoxEntry {
  public value = input.required<string>();

  // todo: add selected state
}
