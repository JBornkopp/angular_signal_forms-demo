import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { SelectBox } from '../../shared/select-box/select-box';

@Component({
  selector: 'app-signal-select-box',
  imports: [SelectBox],
  templateUrl: './signal-select-box.html',
  styleUrl: './signal-select-box.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalSelectBox<Type> implements FormValueControl<Type | null> {
  public entries = input.required<Type[]>();
  public value = model<Type | null>(null);
  public touched = model(false);

  protected mappedValue = computed(() => {
    const currentValue = this.value();
    return currentValue !== null ? [currentValue] : [];
  });

  protected onSelectedEntryChange(newValue: Type[]): void {
    this.touched.set(true);
    this.value.set(newValue.length > 0 ? newValue[0] : null);
  }
}
