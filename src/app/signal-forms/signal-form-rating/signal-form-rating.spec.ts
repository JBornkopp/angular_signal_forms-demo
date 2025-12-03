import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormRating } from './reactive-form-rating';

describe('ReactiveFormRating', () => {
  let component: ReactiveFormRating;
  let fixture: ComponentFixture<ReactiveFormRating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormRating]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveFormRating);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
