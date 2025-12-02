import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-accordion-title',
  imports: [],
  templateUrl: './accordion-title.html',
  styleUrl: './accordion-title.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionTitle {
  public isExpanded = input<boolean>(false);
}
