import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormValueControl } from '@angular/forms/signals';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-signal-form-rating',
  imports: [NgClass, MatIcon],
  templateUrl: './signal-form-rating.html',
  styleUrl: './signal-form-rating.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignalFormRating implements FormValueControl<number | null> {
  public value = model<number | null>(null);
  public disabled = input<boolean>(false);
  public dirty = model<boolean>(false);
  public touched = model<boolean>(false);
  public maxRating = input(5);

  protected hoveredRating = signal<number | null>(null);

  protected ratingArray = computed(() => Array(this.maxRating()).fill(''));
  protected hoveredRatingOrSelectedRating = computed(() => {
    const hovered = this.hoveredRating();
    const selected = this.value();
    return hovered !== null ? hovered : selected !== null ? selected : 0;
  });

  protected setRating(newRating: number | null): void {
    if (!this.disabled()) {
      this.value.set(newRating);
      this.dirty.set(true);
      this.touched.set(true);
    }
  }

  protected startHover(index: number): void {
    if (!this.disabled()) {
      this.hoveredRating.set(index);
    }
  }

  protected endHover(): void {
    if (!this.disabled()) {
      this.hoveredRating.set(null);
    }
  }
}
