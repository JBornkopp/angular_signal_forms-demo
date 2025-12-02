import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBoxEntry } from './select-box-entry';

describe('SelectBoxEntry', () => {
  let component: SelectBoxEntry;
  let fixture: ComponentFixture<SelectBoxEntry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectBoxEntry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectBoxEntry);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
