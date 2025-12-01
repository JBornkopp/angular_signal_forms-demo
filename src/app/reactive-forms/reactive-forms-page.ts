import { Component } from '@angular/core';
import { ReactiveFormRating } from './reactive-form-rating/reactive-form-rating';

@Component({
  selector: 'app-reactive-forms-page',
  imports: [ReactiveFormRating],
  templateUrl: './reactive-forms-page.html',
  styleUrl: './reactive-forms-page.scss',
})
export class ReactiveFormsPage {}
