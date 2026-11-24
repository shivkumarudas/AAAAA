import { sound } from './audio';

export interface SponsorPartnerItem {
  id: string;
  name: string;
  category: 'SPONSOR' | 'COMMUNITY_PARTNER';
  tier: string;
  logoUrl: string;
  websiteUrl: string;
}

export interface FAQEntry {
  id: string;
  category: 'REGISTRATION' | 'LOGISTICS' | 'TECHNICAL' | 'GENERAL';
  question: string;
  answer: string;
}

export const OFFICIAL_SPONSORS: SponsorPartnerItem[] = [
  {
    id: 'sp-aws',
    name: 'Amazon Web Services',
    category: 'SPONSOR',
    tier: 'TITLE SPONSOR',
    logoUrl: '/logos/aws-full.svg',
    websiteUrl: 'https://aws.amazon.com/'
  },
  {
    id: 'sp-postman',
    name: 'Postman',
    category: 'SPONSOR',
    tier: 'SPONSOR',
    logoUrl: '/logos/postman.svg',
    websiteUrl: 'https://www.postman.com/'
  },
  {
    id: 'sp-mongo',
    name: 'MongoDB',
    category: 'SPONSOR',
    tier: 'SPONSOR',
    logoUrl: '/logos/mongodb.svg',
    websiteUrl: 'https://www.mongodb.com/'
  }
];

export const COMMUNITY_PARTNERS: SponsorPartnerItem[] = [
  {
    id: 'cp-awsug',
    name: 'AWS User Group Pune',
    category: 'COMMUNITY_PARTNER',
    tier: 'COMMUNITY PARTNER',
    logoUrl: '/logos/aws-ug-pune.png',
    websiteUrl: 'https://www.awsugpune.in/'
  },
  {
    id: 'cp-cncf',
    name: 'CNCF (Cloud Native)',
    category: 'COMMUNITY_PARTNER',
    tier: 'COMMUNITY PARTNER',
    logoUrl: '/logos/cncf.svg',
    websiteUrl: 'https://www.cncf.io/'
  }
];

export const FAQ_LIST: FAQEntry[] = [
  {
    id: 'faq-2',
    category: 'LOGISTICS',
    question: 'Where and when will the conference take place?',
    answer: 'The event takes place on 27 December 2026, 08:00 AM – 05:30 PM IST at Seasons 24, Wagholi, Pune, Maharashtra. The venue is located along the Pune-Ahmednagar highway, well connected by direct PMT transit, ride shares, and cabs from Pune Railway Station (15 km) and Pune International Airport (11 km).'
  },
  {
    id: 'faq-3',
    category: 'TECHNICAL',
    question: 'Do I need prior AWS cloud experience to attend?',
    answer: 'Not at all. We host parallel beginner-friendly tracks starting from cloud fundamentals and local dev loops (Zone 00: Localhost), alongside advanced architectures in Generative AI (Amazon Bedrock) and Kubernetes (Amazon EKS).'
  },
  {
    id: 'faq-4',
    category: 'LOGISTICS',
    question: 'Will there be food, beverages, and conference swag?',
    answer: 'Yes. All verified attendees receive catered lunch, morning coffee/tea, evening snacks, and an official AWS SCD Pune 2026 swag pack with t-shirts, stickers, notebooks, and sponsor giveaways.'
  },
  {
    id: 'faq-5',
    category: 'GENERAL',
    question: 'Will attendees receive certificates of participation?',
    answer: 'Yes! All attendees who check in at the venue and complete the post-event feedback survey will receive a digitally verifiable AWS Community Day Pune certificate of participation for LinkedIn and portfolios.'
  },
  {
    id: 'faq-6',
    category: 'TECHNICAL',
    question: 'Should I bring my laptop and charger?',
    answer: 'We strongly recommend bringing your laptop! Both Track A and Track B include hands-on breakout sessions, live cloud debugging challenges, and an on-site cloud trivia hackathon with exciting awards.'
  },
  {
    id: 'faq-7',
    category: 'GENERAL',
    question: 'How can my college or club partner with AWS SCD Pune 2026?',
    answer: 'Student clubs and university technical societies can register as Community Outreach Partners by contacting partner@awsugpune.in. Partner campuses receive reserved ticket allocations and community recognitions.'
  }
];

export class EcosystemController {
  private container: HTMLElement;
  private openFaqIds: Set<string> = new Set(['faq-2']);
  private activeCategory: string = 'ALL';

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
  }

  private render() {
    const categories = ['ALL', 'LOGISTICS', 'TECHNICAL', 'GENERAL'];
    const filteredFaq = this.activeCategory === 'ALL' 
      ? FAQ_LIST 
      : FAQ_LIST.filter(f => f.category === this.activeCategory);

    this.container.innerHTML = `
      <div class="ecosystem-section-wrapper">
        <div class="section-meta-header">
          <span class="section-tag mono">ECOSYSTEM &amp; FIELD PROTOCOLS</span>
          <h2 class="section-headline">Partners, Sponsors & Field Protocols.</h2>
          <p class="section-sub">
            Supported by premier cloud technology leaders and academic partners for AWS Student Community Day 2026.
          </p>
        </div>

        <!-- 1. SPONSORS & COMMUNITY PARTNERS SHOWCASE -->
        <div class="sponsors-showcase-block mono">
          <!-- Tier A: Official Sponsors -->
          <div class="sponsors-subgroup">
            <div class="block-header">
              <span class="header-tag">OFFICIAL SPONSORS</span>
              <span class="header-meta">TITLE · CLOUD · DEV TOOLS</span>
            </div>

            <div class="sponsors-logo-grid sponsors-grid-tier">
              ${OFFICIAL_SPONSORS.map(item => `
                <a 
                  href="${item.websiteUrl}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="sponsor-logo-card tier-${item.tier.toLowerCase().replace(/[^a-z]/g, '')}" 
                  title="${item.name}">
                  <div class="logo-frame">
                    <img src="${item.logoUrl}" alt="${item.name}" class="sponsor-logo-img logo-${item.id}" loading="lazy" />
                  </div>
                  <span class="logo-brand-label mono">${item.name}</span>
                </a>
              `).join('')}
            </div>
          </div>

          <!-- Divider Between Sponsors & Community Partners -->
          <div class="sponsors-tier-divider"></div>

          <!-- Tier B: Community Partners -->
          <div class="sponsors-subgroup">
            <div class="block-header">
              <span class="header-tag">COMMUNITY PARTNERS</span>
              <span class="header-meta">ECOSYSTEM · TECH COMMUNITIES</span>
            </div>

            <div class="sponsors-logo-grid community-grid-tier">
              ${COMMUNITY_PARTNERS.map(item => `
                <a 
                  href="${item.websiteUrl}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="sponsor-logo-card tier-communitypartner" 
                  title="${item.name}">
                  <div class="logo-frame">
                    <img src="${item.logoUrl}" alt="${item.name}" class="sponsor-logo-img logo-${item.id}" loading="lazy" />
                  </div>
                  <span class="logo-brand-label mono">${item.name}</span>
                </a>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- 2. FAQ TERMINAL ACCORDION -->
        <div class="faq-terminal-block mono">
          <div class="faq-terminal-top">
            <div class="terminal-title">
              <span>ATTENDEE FIELD PROTOCOLS & FAQ</span>
              <span class="terminal-status">[${filteredFaq.length} ENTRIES LOGGED]</span>
            </div>
            
            <div class="faq-category-filters">
              ${categories.map(cat => `
                <button 
                  class="btn-faq-cat ${this.activeCategory === cat ? 'is-active' : ''}" 
                  data-cat="${cat}">
                  ${cat}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="faq-accordion-container">
            ${filteredFaq.map(f => {
              const isOpen = this.openFaqIds.has(f.id);
              return `
                <div class="faq-item ${isOpen ? 'is-open' : ''}" id="faq-item-${f.id}">
                  <button class="faq-question-btn" data-id="${f.id}">
                    <div class="q-left">
                      <span class="q-prefix">[Q]</span>
                      <span class="q-cat">[${f.category}]</span>
                      <strong class="q-text">${f.question}</strong>
                    </div>
                    <span class="q-toggle-marker">${isOpen ? '[-]' : '[+]'}</span>
                  </button>

                  ${isOpen ? `
                    <div class="faq-answer-drawer">
                      <div class="a-left">
                        <span class="a-prefix text-accent">[A]</span>
                        <p class="a-text">${f.answer}</p>
                      </div>
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>

          <div class="faq-terminal-footer">
            <span>NEED FURTHER CLARIFICATION? CONTACT ORGANIZERS: <a href="mailto:awssbgbsiotr@gmail.com" class="faq-contact-email"><strong>awssbgbsiotr@gmail.com</strong></a></span>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private attachEvents() {
    // Category filters
    const catBtns = this.container.querySelectorAll<HTMLButtonElement>('.btn-faq-cat');
    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-cat');
        if (cat && cat !== this.activeCategory) {
          this.activeCategory = cat;
          sound.playClick(680, 0.03);
          this.render();
        }
      });
    });

    // Accordion toggle
    const questionBtns = this.container.querySelectorAll<HTMLButtonElement>('.faq-question-btn');
    questionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (!id) return;
        if (this.openFaqIds.has(id)) {
          this.openFaqIds.delete(id);
          sound.playClick(550, 0.03);
        } else {
          this.openFaqIds.add(id);
          sound.playClick(750, 0.03);
        }
        this.render();
      });
    });
  }
}
