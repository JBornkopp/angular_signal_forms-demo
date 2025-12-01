import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-reactive-form-rating',
  imports: [NgClass, MatIcon],
  templateUrl: './reactive-form-rating.html',
  styleUrl: './reactive-form-rating.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ReactiveFormRating,
      multi: true,
    },
  ],
})
export class ReactiveFormRating implements ControlValueAccessor {
  public maxRating = input(5);
  protected rating = signal(0);
  protected hoveredRating = signal<number | null>(null);
  private disabled = signal(false);

  protected ratingArray = computed(() => Array(this.maxRating()).fill(''));
  protected hoveredRatingOrSelectedRating = computed(() => {
    const hovered = this.hoveredRating();
    const selected = this.rating();
    return hovered !== null ? hovered : selected;
  });

  public onChange: any = () => {};
  public onTouch: any = () => {};

  public writeValue(newRating: number): void {
    this.rating.set(newRating);
  }
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  public setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected setRating(newRating: number): void {
    this.rating.set(newRating);
  }

  protected startHover(index: number): void {
    this.hoveredRating.set(index);
  }

  protected endHover(): void {
    this.hoveredRating.set(null);
  }
}
