import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'reactive-forms',
    loadComponent: () =>
      import('./reactive-forms/reactive-forms-page').then((m) => m.ReactiveFormsPage),
  },
  {
    path: 'signal-forms',
    loadComponent: () => import('./signal-forms/signal-forms-page').then((m) => m.SignalFormsPage),
  },
  {
    path: '',
    redirectTo: 'reactive-forms',
    pathMatch: 'full',
  },
];
