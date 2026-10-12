import { Routes } from '@angular/router';
import { Mailform } from '../components/mailform/mailform';

export const routes: Routes = [
  { path: '', redirectTo: 'mailform', pathMatch: 'full' },
  { path: 'mailform', component: Mailform },
];
