import { Combobox, ComboboxInput, ComboboxPopupContainer } from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { afterRenderEffect, ChangeDetectionStrategy, Component, computed, input, viewChild, viewChildren } from '@angular/core';
import { SelectBoxEntry } from './select-box-entry/select-box-entry';

@Component({
  selector: 'app-select-box',
  imports: [
    Combobox,
    ComboboxInput,
    ComboboxPopupContainer,
    CdkConnectedOverlay,
    Listbox,
    SelectBoxEntry
  ],
  templateUrl: './select-box.html',
  styleUrl: './select-box.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectBox {
  public entries = input.required<string[]>();

  /** The string that is displayed in the combobox. */
  protected readonly displayValue = computed(() => {
    const values = this.selectBox()?.values() || [];
    return values.length ? values[0] : 'Select an entry';
  });

  // todo add selection change

  /** The selectBox popup. */
  protected selectBox = viewChild<Listbox<string>>(Listbox);
  /** The options available in the selectBox. */
  protected options = viewChildren<Option<string>>(Option);
  /** A reference to the ng aria combobox. */
  protected combobox = viewChild<Combobox<string>>(Combobox);

  constructor() {
    // Scrolls to the active item when the active option changes.
    // The slight delay here is to ensure animations are done before scrolling.
    afterRenderEffect(() => {
      const option = this.options().find((opt) => opt.active());
      setTimeout(() => option?.element.scrollIntoView({block: 'nearest'}), 50);
    });
    // Resets the listbox scroll position when the combobox is closed.
    afterRenderEffect(() => {
      if (!this.combobox()?.expanded()) {
        setTimeout(() => this.selectBox()?.element.scrollTo(0, 0), 150);
      }
    });
  }
}
