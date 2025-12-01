import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsPage } from './reactive-forms-page';

describe('ReactiveFormsPage', () => {
  let component: ReactiveFormsPage;
  let fixture: ComponentFixture<ReactiveFormsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveFormsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
