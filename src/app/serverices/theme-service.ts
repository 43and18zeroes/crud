import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private _currentTheme: BehaviorSubject<Theme>;
  private readonly THEME_KEY = 'appTheme';

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    // Initialisierung des Themes basierend auf localStorage oder Systempräferenz
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme: Theme = savedTheme || (prefersDark ? 'dark' : 'light');

    this._currentTheme = new BehaviorSubject<Theme>(initialTheme);
    this.applyTheme(initialTheme); // Initial das Theme anwenden
  }

  get currentTheme$() {
    return this._currentTheme.asObservable();
  }

  get currentTheme(): Theme {
    return this._currentTheme.value;
  }

  setTheme(theme: Theme): void {
    if (this._currentTheme.value === theme) {
      return; // Theme ist bereits gesetzt, keine Änderung notwendig
    }
    this.applyTheme(theme);
    this._currentTheme.next(theme);
    localStorage.setItem(this.THEME_KEY, theme);
  }

  toggleTheme(): void {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  private applyTheme(theme: Theme): void {
    const body = document.body;
    if (theme === 'dark') {
      this.renderer.addClass(body, 'my-dark-theme');
      this.renderer.removeClass(body, 'my-light-theme');
    } else {
      this.renderer.addClass(body, 'my-light-theme');
      this.renderer.removeClass(body, 'my-dark-theme');
    }
  }
}
