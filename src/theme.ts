export type ThemeName = 'modern' | 'cyber' | 'kraft' | 'sunset';

export class ThemeController {
  private currentTheme: ThemeName = 'modern';

  constructor() {
    const saved = localStorage.getItem('scd_theme') as ThemeName | null;
    if (saved && ['modern', 'cyber', 'kraft', 'sunset'].includes(saved)) {
      this.currentTheme = saved;
    } else {
      this.currentTheme = 'modern';
    }
    this.applyTheme(this.currentTheme);

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initControls());
    } else {
      this.initControls();
    }
  }

  public setTheme(theme: ThemeName) {
    this.currentTheme = theme;
    localStorage.setItem('scd_theme', theme);
    this.applyTheme(theme);
    this.updateControlsUI();
  }

  public getTheme(): ThemeName {
    return this.currentTheme;
  }

  public init() {
    this.initControls();
  }

  private applyTheme(theme: ThemeName) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  private initControls() {
    // Header theme buttons or dropdown
    const buttons = document.querySelectorAll<HTMLButtonElement>('[data-theme-btn]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const t = btn.getAttribute('data-theme-btn') as ThemeName;
        if (t) this.setTheme(t);
      });
    });

    this.updateControlsUI();
  }

  private updateControlsUI() {
    const buttons = document.querySelectorAll<HTMLButtonElement>('[data-theme-btn]');
    buttons.forEach(btn => {
      const t = btn.getAttribute('data-theme-btn');
      btn.classList.toggle('is-active', t === this.currentTheme);
    });

    const activeThemeLabel = document.getElementById('current-theme-name');
    if (activeThemeLabel) {
      const displayNames: Record<ThemeName, string> = {
        modern: 'MODERN IVORY',
        cyber: 'CYBER MIDNIGHT',
        kraft: 'CLASSIC KRAFT',
        sunset: 'PUNE SUNSET'
      };
      activeThemeLabel.textContent = displayNames[this.currentTheme] || this.currentTheme.toUpperCase();
    }
  }
}

export const themeController = new ThemeController();
