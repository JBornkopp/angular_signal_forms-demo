import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalSelectBox } from './signal-select-box';

describe('SignalSelectBox', () => {
  let component: SignalSelectBox;
  let fixture: ComponentFixture<SignalSelectBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalSelectBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalSelectBox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
