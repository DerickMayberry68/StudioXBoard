import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./board/board').then(m => m.BoardComponent) },
  { path: '**', redirectTo: '' }
];
