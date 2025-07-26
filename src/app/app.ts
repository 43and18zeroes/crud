import { Component, computed, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('crud');

  collapsed = signal(false);

  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));
}
