import { sound } from './audio';

export interface MetricCard {
  value: string;
  tag: string;
  desc: string;
}

export const METRICS_DATA: MetricCard[] = [
  {
    value: '300+',
    tag: '[DELEGATES]',
    desc: 'STUDENT BUILDERS & DEVELOPERS'
  },
  {
    value: '7',
    tag: '[CONTENT]',
    desc: 'KEYNOTES, TALKS & PANEL DISCUSSION'
  },
  {
    value: '1',
    tag: '[PERKS]',
    desc: 'EXCLUSIVE AWS SWAG & BUILDER KIT'
  },
  {
    value: '8+',
    tag: '[DURATION]',
    desc: 'HOURS OF CONTINUOUS IMMERSION'
  }
];

export class OverviewController {
  private container: HTMLElement;
  private timerInterval: number | null = null;
  // Target: 27 December 2026, 08:00 AM IST (Indian Standard Time UTC+05:30)
  private targetDate: number = new Date('2026-12-27T08:00:00+05:30').getTime();

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
    this.startCountdown();
    this.bindEvents();
  }

  private startCountdown(): void {
    const update = () => {
      const now = Date.now();
      const diff = Math.max(0, this.targetDate - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const daysEl = this.container.querySelector('#countdown-days');
      const hoursEl = this.container.querySelector('#countdown-hours');
      const minsEl = this.container.querySelector('#countdown-mins');
      const secsEl = this.container.querySelector('#countdown-secs');

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
    };

    update();
    this.timerInterval = window.setInterval(update, 1000);
  }

  private bindEvents(): void {
    const cards = this.container.querySelectorAll('.metric-card, .overview-countdown-terminal');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        sound.playHover(460, 0.02);
      });
      card.addEventListener('click', () => {
        sound.playClick(680, 0.03);
      });
    });

    const ctaBtns = this.container.querySelectorAll('.overview-cta-btn');
    ctaBtns.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        sound.playHover(520, 0.02);
      });
      btn.addEventListener('click', () => {
        sound.playClick(750, 0.04);
      });
    });
  }

  public destroy(): void {
    if (this.timerInterval !== null) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="overview-inner">
        <!-- Section Metadata Header -->
        <div class="section-meta-header">
          <div class="overview-header-tagline mono">
            EVENT ROADMAP &amp; OVERVIEW
          </div>
          <h2 class="section-headline">BUILT FOR STUDENT BUILDERS.</h2>
          <p class="section-sub">
            Join 300+ student developers, cloud architects, and tech leaders at Seasons 24, Wagholi for Pune's premier community-driven cloud conference on 27 December 2026. One unified stage. Zero track conflicts.
          </p>
        </div>

        <!-- Live Monospaced Countdown Terminal (The Original First Terminal) -->
        <div class="overview-countdown-panel mono" aria-label="Live Event Countdown to 27 December 2026">
          <div class="countdown-panel-top">
            <span class="countdown-label">
              <span class="status-pulse-dot"></span> LIVE COUNTDOWN // TARGET: 27 DEC 2026, 08:00 AM IST
            </span>
            <span class="countdown-location">VENUE: SEASONS 24, WAGHOLI, PUNE</span>
          </div>

          <div class="countdown-display-grid">
            <div class="countdown-digit-block">
              <span class="countdown-number" id="countdown-days">--</span>
              <span class="countdown-unit">DAYS</span>
            </div>
            <div class="countdown-sep">:</div>
            <div class="countdown-digit-block">
              <span class="countdown-number" id="countdown-hours">--</span>
              <span class="countdown-unit">HOURS</span>
            </div>
            <div class="countdown-sep">:</div>
            <div class="countdown-digit-block">
              <span class="countdown-number" id="countdown-mins">--</span>
              <span class="countdown-unit">MINUTES</span>
            </div>
            <div class="countdown-sep">:</div>
            <div class="countdown-digit-block">
              <span class="countdown-number" id="countdown-secs">--</span>
              <span class="countdown-unit">SECONDS</span>
            </div>
          </div>
        </div>

        <!-- 4 Impact Metrics Cards (High Contrast White Blocks) -->
        <div class="overview-metrics-grid mono" aria-label="Conference Impact Metrics">
          ${METRICS_DATA.map(m => `
            <div class="metric-card">
              <div class="metric-value">${m.value}</div>
              <div class="metric-tag">${m.tag}</div>
              <div class="metric-desc">${m.desc}</div>
            </div>
          `).join('')}
        </div>

        <!-- Quick Section Actions -->
        <div class="overview-actions-row">
          <a href="#schedule" class="btn-brutalist btn-secondary overview-cta-btn">
            EXPLORE 15-SLOT SCHEDULE [v]
          </a>
        </div>
      </div>
    `;
  }
}
