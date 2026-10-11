import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-sidebar',
  styleUrl: './sidebar.css',
  templateUrl: './sidebar.html',
})
export class Sidebar {
  protected readonly isCollapsed = signal(false);

  protected toggleSidebar(): void {
    this.isCollapsed.update((collapsed) => !collapsed);
  }
}
