import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalFormsPage } from './signal-forms-page';

describe('SignalFormsPage', () => {
  let component: SignalFormsPage;
  let fixture: ComponentFixture<SignalFormsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalFormsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalFormsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
