import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveSelectBox } from './reactive-select-box';

describe('ReactiveSelectBox', () => {
  let component: ReactiveSelectBox;
  let fixture: ComponentFixture<ReactiveSelectBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveSelectBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveSelectBox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
