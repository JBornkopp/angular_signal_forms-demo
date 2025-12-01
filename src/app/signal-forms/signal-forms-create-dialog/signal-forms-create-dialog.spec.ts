import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalFormsCreateDialog } from './signal-forms-create-dialog';

describe('SignalFormsCreateDialog', () => {
  let component: SignalFormsCreateDialog;
  let fixture: ComponentFixture<SignalFormsCreateDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalFormsCreateDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalFormsCreateDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
