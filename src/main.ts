import './style.css';
import { sound } from './audio';
import { themeController } from './theme';
import { HeroVariableController } from './hero-variable';
import { TickerController } from './ticker';
import { TransitController } from './transit';
import { BusTransitController } from './busTransit';
import { OverviewController } from './overview';
import { SpeakersController } from './speakers';
import { ScheduleController } from './schedule';
import { PassGeneratorController } from './passGenerator';
import { PassTiersController } from './passTiers';
import { VenueController } from './venue';
import { EcosystemController } from './ecosystem';

document.addEventListener('DOMContentLoaded', () => {
  // 0. Initialize theme controls
  themeController.init();

  // 1. Audio sound toggle
  const soundBtn = document.getElementById('sound-toggle-btn');
  const soundLabel = document.getElementById('sound-status-label');

  const updateSoundUI = () => {
    const isEnabled = sound.isEnabled();
    if (soundLabel) {
      soundLabel.textContent = isEnabled ? 'ON [AUDIO]' : 'OFF [MUTED]';
    }
    if (soundBtn) {
      soundBtn.classList.toggle('is-active', isEnabled);
    }
  };

  if (soundBtn) {
    updateSoundUI();
    soundBtn.addEventListener('click', () => {
      sound.toggle();
      updateSoundUI();
    });
  }

  // 1.5. PMPML Header Bus Horn interaction
  const pmpmlHornBtn = document.getElementById('btn-pmpml-horn');
  const pmpmlBusObj = document.getElementById('header-pmpml-bus');
  const triggerBusHorn = () => {
    sound.playBusHorn();
    if (pmpmlBusObj) {
      pmpmlBusObj.classList.add('is-honking');
      setTimeout(() => pmpmlBusObj.classList.remove('is-honking'), 600);
    }
  };
  if (pmpmlHornBtn) pmpmlHornBtn.addEventListener('click', triggerBusHorn);
  if (pmpmlBusObj) pmpmlBusObj.addEventListener('click', triggerBusHorn);

  // 2. Live UTC & Local IST Clocks
  const updateClocks = () => {
    const now = new Date();
    const utcString = now.toUTCString().split(' ')[4] + ' UTC';
    const headerClock = document.getElementById('header-utc-clock');
    const footerClock = document.getElementById('footer-live-clock');

    const istTimeStr = now.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    if (headerClock) headerClock.textContent = utcString;
    if (footerClock) footerClock.textContent = `PUNE LOCAL TIME: ${istTimeStr} IST`;
  };
  updateClocks();
  setInterval(updateClocks, 1000);

  // 3. Navigation Drawer Toggle
  const menuToggle = document.getElementById('menu-drawer-toggle');
  const menuDrawer = document.getElementById('menu-drawer');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-nav-item');

  const openDrawer = () => {
    if (menuDrawer) {
      menuDrawer.classList.add('is-open');
      menuDrawer.setAttribute('aria-hidden', 'false');
      menuToggle?.setAttribute('aria-expanded', 'true');
      sound.playClick(600, 0.04);
    }
  };

  const closeDrawer = () => {
    if (menuDrawer) {
      menuDrawer.classList.remove('is-open');
      menuDrawer.setAttribute('aria-hidden', 'true');
      menuToggle?.setAttribute('aria-expanded', 'false');
      sound.playClick(500, 0.03);
    }
  };

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // 4. Initialize Hero Proximity Variable Typography
  const heroEl = document.getElementById('hero');
  if (heroEl) {
    new HeroVariableController(heroEl);
  }

  // 5. Initialize Identity Ticker
  const tickerEl = document.getElementById('ticker');
  if (tickerEl) {
    new TickerController(tickerEl);
  }

  // 5.5. Initialize Pune City Transit Runway (Pune Metro & PMPML Expressway)
  const transitEl = document.getElementById('pune-transit');
  if (transitEl) {
    new TransitController(transitEl);
  }

  // 6. Initialize Event Overview, Countdown & Attendee Perks
  const overviewEl = document.getElementById('overview');
  if (overviewEl) {
    new OverviewController(overviewEl);
  }

  // 7. Initialize AWS SCD Speakers & Keynotes
  const speakersEl = document.getElementById('speakers');
  if (speakersEl) {
    new SpeakersController(speakersEl);
  }

  // 8. Initialize 08:00 AM – 05:30 PM Master Schedule
  const scheduleEl = document.getElementById('schedule');
  if (scheduleEl) {
    new ScheduleController(scheduleEl);
  }

  // 9. Initialize AWS SCD Attendee Pass Generator
  const passEl = document.getElementById('pass-generator');
  if (passEl) {
    new PassGeneratorController(passEl);
  }

  // 10. Initialize KonfHub Pass & Registration Tiers
  const passesEl = document.getElementById('passes');
  if (passesEl) {
    new PassTiersController(passesEl);
  }

  // 11. Initialize Venue & Wayfinding (Seasons 24 Wagholi)
  const venueEl = document.getElementById('venue');
  if (venueEl) {
    new VenueController(venueEl);
  }

  // 12. Initialize AWS SCD Ecosystem & FAQ Terminal
  const ecoEl = document.getElementById('ecosystem');
  if (ecoEl) {
    new EcosystemController(ecoEl);
  }

  // 12.5. Initialize PMPML Pune City e-Bus Express Runway (Above Footer)
  const busEl = document.getElementById('pune-bus');
  if (busEl) {
    new BusTransitController(busEl);
  }

  // Header Get Pass Button triggers Passes Section
  const headerTrialBtn = document.getElementById('header-trial-trigger');
  const drawerTrialBtn = document.getElementById('drawer-trial-btn');

  const triggerPassSection = () => {
    closeDrawer();
    const passSection = document.getElementById('passes');
    if (passSection) {
      passSection.scrollIntoView({ behavior: 'smooth' });
      sound.playClick(720, 0.04);
    }
  };

  if (headerTrialBtn) headerTrialBtn.addEventListener('click', triggerPassSection);
  if (drawerTrialBtn) drawerTrialBtn.addEventListener('click', triggerPassSection);



  // 13. Back to Top Button
  const backToTopBtn = document.getElementById('btn-back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      sound.playClick(800, 0.04);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Smooth keyboard anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          sound.playClick(700, 0.02);
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});
