import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionTitle } from './accordion-title';

describe('AccordionTitle', () => {
  let component: AccordionTitle;
  let fixture: ComponentFixture<AccordionTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionTitle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordionTitle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
