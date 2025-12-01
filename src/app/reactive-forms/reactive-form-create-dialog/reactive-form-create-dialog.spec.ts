import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormCreateDialog } from './reactive-form-create-dialog';

describe('ReactiveFormCreateDialog', () => {
  let component: ReactiveFormCreateDialog;
  let fixture: ComponentFixture<ReactiveFormCreateDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormCreateDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveFormCreateDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
