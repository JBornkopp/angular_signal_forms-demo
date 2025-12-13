import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { SelectBox } from '../../shared/select-box/select-box';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-reactive-select-box',
  imports: [SelectBox],
  templateUrl: './reactive-select-box.html',
  styleUrl: './reactive-select-box.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ReactiveSelectBox,
      multi: true,
    },
  ],
})
export class ReactiveSelectBox<Type> implements ControlValueAccessor {
  public entries = input.required<Type[]>();
  protected value = signal<Type[]>([]);
  private onChange: (value: Type | null) => void = () => {};
  private onTouched: () => void = () => {};

  public writeValue(newValue: Type | null): void {
    this.value.set(newValue ? [newValue] : []);
  }
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  protected onValueChange(newValue: Type[]) {
    this.value.set(newValue);
    this.onTouched();
    this.onChange(newValue.length > 0 ? newValue[0] : null);
  }
}
