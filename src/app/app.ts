import { Component, signal } from '@angular/core';
import { Sidebar } from './components/sidebar/sidebar';

@Component({
  imports: [Sidebar],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('mail-sender-app');
}
