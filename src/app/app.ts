import { Component, computed, effect, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { Theme, ThemeService } from './serverices/theme-service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    MatToolbarModule,
    MatIconModule,
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    MatSlideToggleModule,
    AsyncPipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('crud');

  darkMode = signal(false);

  collapsed = signal(false);

  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));

  applyDarkMode = effect(() => {
    const darkMode = this.darkMode();
    document.body.classList.toggle('darkMode', darkMode);
  });
  currentTheme$!: Observable<Theme>;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.currentTheme$ = this.themeService.currentTheme$;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
