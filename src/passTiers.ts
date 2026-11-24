import { sound } from './audio';
import confetti from 'canvas-confetti';

export interface SinglePassDetails {
  title: string;
  badge: string;
  edition: string;
  date: string;
  hours: string;
  venue: string;
  capacity: string;
  konfhubUrl: string;
}

export interface TicketTier {
  id: string;
  name: string;
  price: string;
  badge: string;
  tagline: string;
  isPopular?: boolean;
  inclusions: string[];
  konfhubUrl: string;
}

export const OFFICIAL_PASS: SinglePassDetails = {
  title: 'PASS',
  badge: 'OFFICIAL ADMISSION: IN-PERSON DELEGATE',
  edition: 'PUNE BUILDER SPECIAL // EDITION 2026',
  date: '27 DECEMBER 2026',
  hours: '08:00 AM – 05:30 PM IST',
  venue: 'SEASONS 24, WAGHOLI, PUNE',
  capacity: '300 STUDENT BUILDERS',
  konfhubUrl: 'https://konfhub.com/aws-scd-pune-2026'
};

export const TICKET_TIERS: TicketTier[] = [
  {
    id: 'tier-early',
    name: 'Student Early Bird Pass',
    price: '₹299',
    badge: 'EARLY BIRD // STUDENT SPECIAL',
    tagline: 'Complete all-day admission for enrolled college, diploma & polytechnic students.',
    isPopular: true,
    inclusions: [
      'Full-Day In-Person Admission to all 8 Keynotes & 15 Sessions',
      'Official Physical Laminate Pass & Woven AWS SBG Lanyard',
      'Exclusive AWS SBG Developer Swag Kit, Stickers & Notebook',
      'Hot Morning Breakfast, Delicious Buffet Lunch & Evening High-Tea',
      'Verified Credly Digital Attendee Certificate & Credential',
      'Hands-on Access to Sponsor Tech Demos & Expo Atrium'
    ],
    konfhubUrl: 'https://konfhub.com/aws-scd-pune-2026'
  },
  {
    id: 'tier-regular',
    name: 'Student Regular Pass',
    price: '₹399',
    badge: 'GENERAL ADMISSION',
    tagline: 'Standard delegate admission for students post early-bird allocation.',
    isPopular: false,
    inclusions: [
      'Full-Day In-Person Admission to all 8 Keynotes & AI Tracks',
      'Official Physical Laminate Pass & Woven AWS SBG Lanyard',
      'Complete AWS SBG Builder Swag Pack & Die-Cut Stickers',
      'Hot Morning Breakfast, Delicious Buffet Lunch & Evening High-Tea',
      'Verified Credly Digital Participation Credential',
      'Networking Lounge & Student Community Showcase Access'
    ],
    konfhubUrl: 'https://konfhub.com/aws-scd-pune-2026'
  },
  {
    id: 'tier-pro',
    name: 'Professional Builder Pass',
    price: '₹499',
    badge: 'INDUSTRY & WORKING PROS',
    tagline: 'Dedicated all-access admission for working engineers, alumni & industry leaders.',
    isPopular: false,
    inclusions: [
      'Full-Day All-Access Admission with Fast-Track Gate Entry',
      'Reserved Priority Seating Rows in Main Keynote Auditorium',
      'Premium Developer Swag Kit & Executive Builder Goodies',
      'Hot Breakfast, Executive Buffet Lunch & High-Tea Service',
      'Verified Credly Professional Cloud Credential',
      'Direct 1-on-1 Mentorship & Networking with Speakers'
    ],
    konfhubUrl: 'https://konfhub.com/aws-scd-pune-2026'
  }
];

export class PassTiersController {
  private container: HTMLElement;
  private isTorn: boolean = false;
  private isDragging: boolean = false;
  private startY: number = 0;
  private startX: number = 0;
  private currentProgress: number = 0;
  private lastSoundProgress: number = 0;
  private autoRejoinTimeout: number | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
  }

  private render() {
    const pass = OFFICIAL_PASS;

    this.container.innerHTML = `
      <div class="passes-section-wrapper">
        <!-- Section Header (Clean, No Numbering) -->
        <div class="section-meta-header">
          <span class="section-tag mono">TICKETS &amp; REGISTRATION</span>
          <h2 class="section-headline">Official Admission Pass. Powered by KonfHub.</h2>
          <p class="section-sub">
            One single pass. All-inclusive in-person admission to all keynotes, technical sessions, and community networking at Seasons 24, Wagholi on 27 December 2026.
          </p>
        </div>

        <!-- 1. The Physical Perforated Ticket Stub Card (Clean without admission privileges checklist) -->
        <div class="ticket-stub-wrapper">
          <div class="ticket-stub-card mono" id="ticket-stub-card">
            <!-- Main Ticket Body (Left) -->
            <div class="ticket-main-body">
              <div class="ticket-ragged-edge-left" aria-hidden="true"></div>

              <div class="ticket-top-meta">
                <span class="ticket-badge-pill">[${pass.badge}]</span>
              </div>

              <div class="ticket-title-row">
                <div class="ticket-title-group">
                  <span class="ticket-eyebrow">AWS STUDENT COMMUNITY DAY 2026</span>
                  <h3 class="ticket-giant-title">${pass.title}</h3>
                  <span class="ticket-subheading">All-Access In-Person Delegate Admission</span>
                </div>
                <div class="ticket-price-pill" id="ticket-price-pill">
                  <span class="price-status">ALL-INCLUSIVE ADMISSION</span>
                  <span class="price-platform">[POWERED BY KONFHUB]</span>
                </div>
              </div>

              <!-- Event Parameters Matrix (Exact match to official pass) -->
              <div class="ticket-parameters-matrix">
                <div class="param-cell">
                  <span class="param-lbl">DATE:</span>
                  <strong class="param-val">${pass.date}</strong>
                </div>
                <div class="param-cell">
                  <span class="param-lbl">HOURS:</span>
                  <strong class="param-val">${pass.hours}</strong>
                </div>
                <div class="param-cell">
                  <span class="param-lbl">VENUE:</span>
                  <strong class="param-val">${pass.venue}</strong>
                </div>
                <div class="param-cell">
                  <span class="param-lbl">CAPACITY:</span>
                  <strong class="param-val">${pass.capacity}</strong>
                </div>
              </div>

              <!-- Action CTAs inside pass -->
              <div class="ticket-actions-row">
                <a 
                  href="${pass.konfhubUrl}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn-brutalist btn-accent btn-ticket-konfhub"
                  id="btn-konfhub-direct-link">
                  REGISTER PASS ON KONFHUB [EXTERNAL &rarr;]
                </a>
                <a href="#pass-generator" class="btn-brutalist btn-secondary btn-ticket-badge">
                  CUSTOMIZE YOUR BADGE FIRST [&darr;]
                </a>
              </div>
            </div>

            <!-- Vertical Perforation Divider with Physical Semi-Circle Punches -->
            <div 
              class="ticket-perforation-divider" 
              id="ticket-perforation"
              tabindex="0"
              role="button"
              aria-label="Tear admission ticket stub to register on KonfHub"
              title="Click or drag down to tear ticket stub">
              <div class="punch-notch punch-top"></div>
              <div class="perforation-dashed-line">
                <div class="perforation-rip-fill" id="rip-fill"></div>
              </div>
              <div class="perforation-label mono">
                <span class="label-txt">TEAR HERE</span>
                <span class="label-drag-hint">[PULL &darr;]</span>
              </div>
              <div class="tear-hint-pill mono" id="tear-hint-pill">
                [CLICK OR DRAG TO TEAR]
              </div>
              <div class="punch-notch punch-bottom"></div>
            </div>

            <!-- Tear-off Verification Stub (Right) -->
            <div class="ticket-stub-aside" id="ticket-stub-aside">
              <div class="stub-ragged-edge" aria-hidden="true"></div>

              <div class="stub-header">
                <span class="stub-label">GATE ACCESS STUB</span>
                <span class="stub-serial">#SCD26-PUN-00127</span>
              </div>

              <div class="stub-barcode-box">
                <div class="ascii-barcode">
||| | |||| | || ||||| | ||| ||| | ||
||| | |||| | || ||||| | ||| ||| | ||
||| | |||| | || ||||| | ||| ||| | ||
                </div>
                <span class="barcode-num">* 27-12-2026-SEASONS-24 *</span>
              </div>

              <div class="stub-specs-list">
                <div class="stub-row">
                  <span>PASS:</span>
                  <strong>ALL-ACCESS</strong>
                </div>
                <div class="stub-row">
                  <span>CITY:</span>
                  <strong>PUNE, IN</strong>
                </div>
                <div class="stub-row">
                  <span>GATE:</span>
                  <strong>LOCAL-01</strong>
                </div>
                <div class="stub-row">
                  <span>STATUS:</span>
                  <strong class="text-accent" id="stub-status-val">READY</strong>
                </div>
              </div>

              <div class="stub-verified-badge">
                <span>[VERIFIED: OFFICIAL KONFHUB ENGINE]</span>
              </div>

              <button 
                type="button" 
                class="btn-brutalist btn-accent w-full text-center stub-cta-btn"
                id="btn-stub-konfhub-link">
                TEAR &amp; REGISTER &rarr;
              </button>
            </div>

            <!-- Claimed Souvenir Stub Receipt Placeholder (revealed when stub tears off) -->
            <div class="ticket-stub-claimed mono" id="ticket-stub-claimed" aria-hidden="true">
              <div class="claimed-header">
                <span class="claimed-tag">[STATUS: TICKET TORN]</span>
                <span class="claimed-serial">#SCD26-PUN-00127</span>
              </div>
              <div class="claimed-body">
                <div class="claimed-barcode-icon">
                  ||| | |||| | || ||||| | |||
                </div>
                <strong class="claimed-title">ADMISSION STUB DETACHED</strong>
                <p class="claimed-desc">
                  Delegate admission submitted. Redirecting to official KonfHub registration...
                </p>
                <a 
                  href="${pass.konfhubUrl}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn-brutalist btn-accent claimed-action-btn"
                  id="btn-reopen-konfhub">
                  OPEN KONFHUB REGISTRATION [->]
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Sub-Header Divider for Tickets & Price with Details -->
        <div class="ticket-tiers-section-divider">
          <div class="divider-line"></div>
          <span class="divider-badge mono">✨ TICKETS &amp; PRICE WITH FULL DETAILS</span>
          <div class="divider-line"></div>
        </div>

        <!-- 3. Ticket Tiers & Price with Details Grid (₹299, ₹399, ₹499) -->
        <div class="ticket-tiers-grid">
          ${TICKET_TIERS.map(tier => `
            <div class="ticket-tier-card ${tier.isPopular ? 'is-featured-tier' : ''}" id="${tier.id}">
              ${tier.isPopular ? `<div class="tier-popular-ribbon mono">★ MOST POPULAR</div>` : ''}
              
              <div class="tier-card-header">
                <span class="tier-badge mono">${tier.badge}</span>
                <div class="tier-price-row">
                  <span class="tier-price">${tier.price}</span>
                  <span class="tier-price-unit mono">/ DELEGATE</span>
                </div>
                <h3 class="tier-title">${tier.name}</h3>
                <p class="tier-tagline">${tier.tagline}</p>
              </div>

              <!-- Tier Inclusions / Privileges List -->
              <div class="tier-inclusions-wrap">
                <span class="tier-inclusions-title mono">INCLUDED PRIVILEGES:</span>
                <ul class="tier-inclusions-list">
                  ${tier.inclusions.map(inc => `
                    <li>
                      <span class="inc-check">✓</span>
                      <span class="inc-text">${inc}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <!-- CTA Action -->
              <div class="tier-cta-wrap">
                <a 
                  href="${tier.konfhubUrl}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn-modern ${tier.isPopular ? 'btn-glow-primary' : 'btn-glass-secondary'} w-full text-center btn-tier-claim"
                  data-price="${tier.price}">
                  <span>CLAIM PASS ON KONFHUB (${tier.price})</span>
                  <span class="arr">&rarr;</span>
                </a>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- 4. Event Parameter Coordinates Footnote Bar -->
        <div class="ticket-meta-footer-bar mono">
          <div class="meta-item">
            <span class="meta-icon">📅</span>
            <span>DATE: <strong>27 DEC 2026</strong></span>
          </div>
          <div class="meta-item">
            <span class="meta-icon">⏰</span>
            <span>HOURS: <strong>08:00 AM – 05:30 PM IST</strong></span>
          </div>
          <div class="meta-item">
            <span class="meta-icon">📍</span>
            <span>VENUE: <strong>SEASONS 24, WAGHOLI, PUNE</strong></span>
          </div>
          <div class="meta-item">
            <span class="meta-icon">🔒</span>
            <span>ENGINE: <strong>KONFHUB SECURE CHECKOUT</strong></span>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private attachEvents() {
    // Direct link on main ticket body
    const directKonfhubBtn = this.container.querySelector<HTMLAnchorElement>('#btn-konfhub-direct-link');
    if (directKonfhubBtn) {
      directKonfhubBtn.addEventListener('click', () => {
        sound.playSuccess();
        confetti({
          particleCount: 70,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#FD0B03', '#010101', '#DCD4C2', '#5C413C']
        });
      });
    }

    // Badge generator scroll anchor
    const badgeLink = this.container.querySelector<HTMLAnchorElement>('.btn-ticket-badge');
    if (badgeLink) {
      badgeLink.addEventListener('click', (e) => {
        e.preventDefault();
        sound.playClick(680, 0.03);
        const target = document.getElementById('pass-generator');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Tier claim buttons audio & celebration
    this.container.querySelectorAll<HTMLAnchorElement>('.btn-tier-claim').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playSuccess();
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#9333EA', '#FF9900', '#00D8F6', '#FFFFFF']
        });
      });
    });

    // Auto-rejoin smoothly if user switches back to this tab from KonfHub
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.isTorn) {
        window.setTimeout(() => {
          if (this.isTorn) {
            this.rejoinTicket();
          }
        }, 200);
      }
    });

    // Clicking anywhere on the claimed receipt (except the Konfhub button) also rejoins immediately
    const claimedReceipt = this.container.querySelector<HTMLElement>('#ticket-stub-claimed');
    if (claimedReceipt) {
      claimedReceipt.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.closest('#btn-reopen-konfhub')) return;
        this.rejoinTicket();
      });
    }

    this.setupTearInteractions();
  }

  private setupTearInteractions() {
    const perf = this.container.querySelector<HTMLElement>('#ticket-perforation');
    const stub = this.container.querySelector<HTMLElement>('#ticket-stub-aside');
    const ripFill = this.container.querySelector<HTMLElement>('#rip-fill');
    const card = this.container.querySelector<HTMLElement>('#ticket-stub-card');
    const stubCta = this.container.querySelector<HTMLElement>('#btn-stub-konfhub-link');

    if (!perf || !stub || !card) return;

    // Hover audio tick
    perf.addEventListener('pointerenter', () => {
      if (!this.isTorn && !this.isDragging) {
        sound.playClick(880, 0.015);
      }
    });

    // Simple Click on perforation divider (tears if intact, rejoins if torn)
    perf.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.isTorn) {
        this.rejoinTicket();
      } else if (!this.isDragging) {
        this.triggerTear();
      }
    });

    // Keyboard support (Enter or Space)
    perf.addEventListener('keydown', (e: KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !this.isTorn) {
        e.preventDefault();
        this.triggerTear();
      }
    });

    // Click on right-side stub button also activates tear sequence
    if (stubCta) {
      stubCta.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.isTorn) {
          this.triggerTear();
        }
      });
    }

    // Pointer Dragging (works across mouse, pen, and touch swipe)
    perf.addEventListener('pointerdown', (e: PointerEvent) => {
      if (this.isTorn) return;
      this.isDragging = true;
      this.startY = e.clientY;
      this.startX = e.clientX;
      this.currentProgress = 0;
      this.lastSoundProgress = 0;

      try {
        perf.setPointerCapture(e.pointerId);
      } catch {}

      card.classList.add('is-tearing');
      stub.style.transition = 'none';
      sound.playClick(650, 0.02);
    });

    perf.addEventListener('pointermove', (e: PointerEvent) => {
      if (!this.isDragging || this.isTorn) return;

      const rect = perf.getBoundingClientRect();
      const isHorizontal = window.innerWidth <= 960;
      const totalLength = isHorizontal ? rect.width : rect.height;
      const dragDist = isHorizontal ? (e.clientX - this.startX) : (e.clientY - this.startY);

      // Drag progress bounded [0, 1]
      this.currentProgress = Math.min(1, Math.max(0, dragDist / (totalLength * 0.7)));

      // Update rip fill line
      if (ripFill) {
        if (isHorizontal) {
          ripFill.style.width = `${this.currentProgress * 100}%`;
          ripFill.style.height = '100%';
        } else {
          ripFill.style.height = `${this.currentProgress * 100}%`;
          ripFill.style.width = '100%';
        }
      }

      // Tilt and separate stub dynamically
      if (isHorizontal) {
        const transY = this.currentProgress * 24;
        const rot = this.currentProgress * 3;
        stub.style.transform = `translate3d(0, ${transY}px, 0) rotate(${rot}deg)`;
      } else {
        const transX = this.currentProgress * 28;
        const transY = this.currentProgress * 16;
        const rot = this.currentProgress * 4.5;
        stub.style.transform = `translate3d(${transX}px, ${transY}px, 0) rotate(${rot}deg)`;
      }
      stub.style.boxShadow = `${8 + this.currentProgress * 16}px ${8 + this.currentProgress * 16}px 0px rgba(1, 1, 1, ${0.3 + this.currentProgress * 0.4})`;

      // Audio ticks on progress increments
      if (this.currentProgress - this.lastSoundProgress >= 0.14) {
        this.lastSoundProgress = this.currentProgress;
        sound.playClick(580 + this.currentProgress * 480, 0.025);
      }

      // Dragged past 72%: automatically complete the tear!
      if (this.currentProgress >= 0.72) {
        this.isDragging = false;
        try {
          perf.releasePointerCapture(e.pointerId);
        } catch {}
        this.triggerTear();
      }
    });

    const finishDrag = (e: PointerEvent) => {
      if (!this.isDragging || this.isTorn) return;
      this.isDragging = false;
      try {
        perf.releasePointerCapture(e.pointerId);
      } catch {}

      if (this.currentProgress >= 0.45) {
        this.triggerTear();
      } else {
        // Snap back to intact
        card.classList.remove('is-tearing');
        stub.style.transition = 'transform 0.32s cubic-bezier(0.2, 0.9, 0.3, 1), box-shadow 0.32s ease';
        stub.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
        stub.style.boxShadow = '';
        if (ripFill) {
          ripFill.style.height = '0%';
          ripFill.style.width = '0%';
        }
        setTimeout(() => {
          if (!this.isTorn) {
            stub.style.transition = '';
          }
        }, 340);
      }
    };

    perf.addEventListener('pointerup', finishDrag);
    perf.addEventListener('pointercancel', finishDrag);
  }

  private clearAutoRejoin() {
    if (this.autoRejoinTimeout !== null) {
      window.clearTimeout(this.autoRejoinTimeout);
      this.autoRejoinTimeout = null;
    }
  }

  private triggerTear() {
    if (this.isTorn) return;
    this.isTorn = true;

    const card = this.container.querySelector<HTMLElement>('#ticket-stub-card');
    const stub = this.container.querySelector<HTMLElement>('#ticket-stub-aside');
    const ripFill = this.container.querySelector<HTMLElement>('#rip-fill');
    const claimedReceipt = this.container.querySelector<HTMLElement>('#ticket-stub-claimed');
    const pricePill = this.container.querySelector<HTMLElement>('#ticket-price-pill');
    const stubStatus = this.container.querySelector<HTMLElement>('#stub-status-val');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Procedural paper tear audio + celebration chime
    sound.playPaperTear();
    sound.playSuccess();

    // Celebratory confetti burst
    confetti({
      particleCount: 85,
      spread: 75,
      origin: { y: 0.62 },
      colors: ['#FD0B03', '#010101', '#DCD4C2', '#5C413C']
    });

    // Update status labels
    if (stubStatus) {
      stubStatus.textContent = 'CLAIMED';
    }
    if (pricePill) {
      pricePill.innerHTML = `
        <span class="price-status text-accent">[TICKET TORN // CLAIMED]</span>
        <span class="price-platform">[POWERED BY KONFHUB]</span>
      `;
    }

    if (card) {
      card.classList.remove('is-rejoining');
      card.classList.add('is-tearing');
    }
    if (ripFill) {
      ripFill.style.height = '100%';
      ripFill.style.width = '100%';
    }

    // Direct user to official KonfHub registration in a new window/tab
    let popupBlocked = false;
    try {
      const opened = window.open(OFFICIAL_PASS.konfhubUrl, '_blank', 'noopener,noreferrer');
      if (!opened || opened.closed || typeof opened.closed === 'undefined') {
        popupBlocked = true;
      }
    } catch {
      popupBlocked = true;
    }

    const onTornComplete = () => {
      if (card) {
        card.classList.remove('is-tearing');
        card.classList.add('is-torn');
      }
      if (stub) {
        stub.style.transition = '';
      }
      if (claimedReceipt) {
        claimedReceipt.classList.add('show-claimed');
        claimedReceipt.setAttribute('aria-hidden', 'false');
        const descEl = claimedReceipt.querySelector<HTMLElement>('.claimed-desc');
        if (descEl) {
          if (popupBlocked) {
            descEl.textContent = 'Admission stub detached. Browser popup blocked; click the button below to register:';
          } else {
            descEl.textContent = 'Delegate admission submitted. KonfHub registration opened in new tab...';
          }
        }
      }

      // Automatically rejoin the ticket cleanly after 2.8 seconds
      this.clearAutoRejoin();
      this.autoRejoinTimeout = window.setTimeout(() => {
        this.rejoinTicket();
      }, 2800);
    };

    if (prefersReducedMotion) {
      onTornComplete();
      return;
    }

    // Detach stub with momentum animation
    setTimeout(onTornComplete, 180);
  }

  public rejoinTicket() {
    this.clearAutoRejoin();
    if (!this.isTorn) return;

    const card = this.container.querySelector<HTMLElement>('#ticket-stub-card');
    const stub = this.container.querySelector<HTMLElement>('#ticket-stub-aside');
    const ripFill = this.container.querySelector<HTMLElement>('#rip-fill');
    const claimedReceipt = this.container.querySelector<HTMLElement>('#ticket-stub-claimed');
    const pricePill = this.container.querySelector<HTMLElement>('#ticket-price-pill');
    const stubStatus = this.container.querySelector<HTMLElement>('#stub-status-val');

    // Play crisp tactile snap audio
    sound.playClick(940, 0.035);

    // Hide claimed overlay
    if (claimedReceipt) {
      claimedReceipt.classList.remove('show-claimed');
      claimedReceipt.setAttribute('aria-hidden', 'true');
    }

    // Trigger rejoining animation
    if (card) {
      card.classList.remove('is-torn');
      card.classList.add('is-rejoining');
    }

    if (ripFill) {
      ripFill.style.transition = 'height 0.4s ease, width 0.4s ease';
      ripFill.style.height = '0%';
      ripFill.style.width = '0%';
    }

    if (pricePill) {
      pricePill.innerHTML = `
        <span class="price-status">[TICKET RE-ATTACHED // READY]</span>
        <span class="price-platform">[POWERED BY KONFHUB]</span>
      `;
    }

    setTimeout(() => {
      this.isTorn = false;
      this.isDragging = false;
      this.currentProgress = 0;
      this.lastSoundProgress = 0;

      if (stubStatus) {
        stubStatus.textContent = 'READY';
      }
      if (pricePill) {
        pricePill.innerHTML = `
          <span class="price-status">ALL-INCLUSIVE ADMISSION</span>
          <span class="price-platform">[POWERED BY KONFHUB]</span>
        `;
      }
      if (card) {
        card.classList.remove('is-rejoining', 'is-tearing');
      }
      if (stub) {
        stub.style.transform = '';
        stub.style.boxShadow = '';
        stub.style.transition = '';
      }
      if (ripFill) {
        ripFill.style.transition = '';
      }
    }, 550);
  }
}
