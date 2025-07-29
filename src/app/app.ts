import { Component, computed, effect, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('crud');
  darkMode = signal(false);
  collapsed = signal(false);

  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));

  ngOnInit() {
    this.initDarkModePreference();
  }

  private initDarkModePreference(): void {
    const prefersDark = window.matchMedia?.(
      '(prefers-color-scheme: dark)'
    ).matches;
    if (prefersDark) {
      this.darkMode.set(true);
    }
  }

  toggleDarkMode = effect(() => {
    if (this.darkMode()) {
      document.body.classList.add('darkMode');
      document.body.classList.remove('lightMode');
    } else {
      document.body.classList.add('lightMode');
      document.body.classList.remove('darkMode');
    }
  });
}
