import { sound } from './audio';

export interface ScheduleItem {
  id: string;
  timeStart: string;
  timeEnd: string;
  title: string;
  speaker?: string;
  speakerRole?: string;
  stage: string;
  track: 'KEYNOTE' | 'SERVERLESS' | 'GENAI & LLMS' | 'SECURITY' | 'DEVOPS' | 'COMMUNITY' | 'WORKSHOP';
  level?: string;
  abstract: string;
  highlights: string[];
}

export const SCHEDULE_DATA: ScheduleItem[] = [
  {
    id: 'slot-01',
    timeStart: '08:00 AM',
    timeEnd: '09:30 AM',
    title: 'Registration, Breakfast & Networking',
    stage: 'Seasons 24 Reception & Expo Lawn',
    track: 'COMMUNITY',
    abstract: 'QR check-in, official attendee badge pickup, and welcome swag kits. Fuel up with hot breakfast buffet, chai, and coffee while networking across the photo and community zones.',
    highlights: ['QR Check-in & Badge Pickup', 'Official Welcome Kit', 'Breakfast Buffet & Chai/Coffee', 'Networking & Photo Zone']
  },
  {
    id: 'slot-02',
    timeStart: '09:30 AM',
    timeEnd: '09:45 AM',
    title: 'Opening Ceremony',
    stage: 'Main Auditorium (Hall 1)',
    track: 'COMMUNITY',
    abstract: 'Cinematic event opener, welcome address, and official introduction to AWS Student Builder Group (SBG) BSIOTR and AWS Student Community Day Pune 2026.',
    highlights: ['Cinematic Event Opener', 'Introduction to AWS SBG BSIOTR', 'SCD Pune 2026 Vision & Roadmap']
  },
  {
    id: 'slot-03',
    timeStart: '09:45 AM',
    timeEnd: '10:00 AM',
    title: 'Inaugural Address & Guest Felicitation',
    speaker: 'Invited AWS Dignitaries',
    speakerRole: 'AWS Leadership & Institutional Guests',
    stage: 'Main Auditorium (Hall 1)',
    track: 'KEYNOTE',
    level: 'ALL LEVELS',
    abstract: 'Official address by invited AWS representative and institutional leadership, followed by guest introduction, lighting of the lamp, and felicitation ceremony.',
    highlights: ['Invited AWS Representative Address', 'Institutional Leadership Remarks', 'Dignitary Introduction & Felicitation']
  },
  {
    id: 'slot-04',
    timeStart: '10:00 AM',
    timeEnd: '10:45 AM',
    title: 'Keynote 01 — The Next Era of Cloud Computing',
    speaker: 'AWS Leader / Senior Solutions Architect',
    speakerRole: 'Amazon Web Services',
    stage: 'Main Auditorium (Hall 1)',
    track: 'KEYNOTE',
    level: 'L200 - FOUNDATIONAL',
    abstract: 'Exploring the architectural shifts shaping modern software: hyper-scale infrastructure, cloud-native developer tooling, and how student builders can lead the next wave of cloud evolution.',
    highlights: ['Hyper-Scale Cloud Paradigms', 'Next-Gen Developer Tooling', 'Transitioning from Localhost to Global Scale']
  },
  {
    id: 'slot-05',
    timeStart: '10:45 AM',
    timeEnd: '11:30 AM',
    title: 'Technical Session 02 — Beyond Chatbots: Engineering AI Agents',
    speaker: 'AI / GenAI Practitioner',
    speakerRole: 'Applied AI & LLM Systems Specialist',
    stage: 'Main Auditorium (Hall 1)',
    track: 'GENAI & LLMS',
    level: 'L300 - ADVANCED',
    abstract: 'Deep dive into autonomous multi-agent systems, practical Retrieval-Augmented Generation (RAG) implementations, function calling, and grounding with Amazon Bedrock foundation models.',
    highlights: ['Autonomous AI Agent Workflows', 'Enterprise RAG & Vector Embeddings', 'Amazon Bedrock Practical Implementations']
  },
  {
    id: 'slot-06',
    timeStart: '11:30 AM',
    timeEnd: '11:45 AM',
    title: 'Tea, Coffee & Networking Break',
    stage: 'Expo Atrium & Checkpoint Corridor',
    track: 'COMMUNITY',
    abstract: 'Grab hot chai, coffee, and refreshments. Explore the 5 interactive Cloud Checkpoint Zones and connect with peer builders, AWS heroes, and mentors.',
    highlights: ['Hot Chai & Coffee Service', '5 Cloud Checkpoint Demos', 'Informal Peer Networking']
  },
  {
    id: 'slot-07',
    timeStart: '11:45 AM',
    timeEnd: '12:30 PM',
    title: 'Community Panel — From Campus to Cloud: Building Your Future',
    speaker: 'Panel Moderator + 4–5 Leaders',
    speakerRole: 'AWS Community Builders & Industry Architects',
    stage: 'Main Auditorium (Hall 1)',
    track: 'COMMUNITY',
    level: 'ALL LEVELS',
    abstract: 'An interactive panel exploring high-impact cloud career trajectories, bridging academic theory with production engineering, open-source contributions, and cloud communities.',
    highlights: ['Campus to Cloud Transition', 'Certifications vs Real-World Production Code', 'Open Source & Community Growth']
  },
  {
    id: 'slot-08',
    timeStart: '12:30 PM',
    timeEnd: '01:15 PM',
    title: 'Technical Session 03 — Architecting for Scale on AWS',
    speaker: 'Cloud Architect',
    speakerRole: 'Distributed Systems & Serverless Specialist',
    stage: 'Main Auditorium (Hall 1)',
    track: 'SERVERLESS',
    level: 'L300 - ADVANCED',
    abstract: 'Production blueprints for planetary scale: event-driven architectures with Amazon EventBridge, serverless compute with AWS Lambda, and designing resilient, fault-tolerant distributed systems.',
    highlights: ['High-Throughput Serverless Patterns', 'Resilient Asynchronous Pipelines', 'Multi-AZ Resilience & Disaster Recovery']
  },
  {
    id: 'slot-09',
    timeStart: '01:15 PM',
    timeEnd: '02:15 PM',
    title: 'Lunch & Community Networking',
    stage: 'Seasons 24 Dining Bay & Grand Lawn',
    track: 'COMMUNITY',
    abstract: 'Full multi-cuisine catered buffet lunch for all registered delegates. Dedicated networking time, sponsor booth interactions, and resume drop at hiring desks.',
    highlights: ['Catered Buffet Lunch', 'Sponsor Booth Walkthrough', 'Hiring & Mentorship Networking']
  },
  {
    id: 'slot-10',
    timeStart: '02:15 PM',
    timeEnd: '03:00 PM',
    title: 'Technical Session 04 — Beyond Containers: Cloud Native Engineering',
    speaker: 'Docker Captain / CNCF Platform Lead',
    speakerRole: 'Cloud Native & Platform Engineer',
    stage: 'Main Auditorium (Hall 1)',
    track: 'DEVOPS',
    level: 'L300 - ADVANCED',
    abstract: 'Modern cloud-native engineering at scale: multi-cluster Kubernetes on Amazon EKS, auto-scaling spot compute with Karpenter, and declarative GitOps delivery pipelines with ArgoCD.',
    highlights: ['Amazon EKS & Karpenter Autoscaling', 'Declarative GitOps with ArgoCD', 'Zero-Downtime Rolling Deployments']
  },
  {
    id: 'slot-11',
    timeStart: '03:00 PM',
    timeEnd: '03:45 PM',
    title: 'Technical Session 05 — Securing the Modern Cloud',
    speaker: 'Cloud Security Architect',
    speakerRole: 'CyberSecurity & Cloud Defense Lead',
    stage: 'Main Auditorium (Hall 1)',
    track: 'SECURITY',
    level: 'L300 - ADVANCED',
    abstract: 'Practical defense-in-depth: Zero Trust security models, automated threat detection using Amazon GuardDuty, least-privilege IAM engineering, and automated incident response runbooks.',
    highlights: ['Zero Trust Security Architecture', 'Amazon GuardDuty Threat Telemetry', 'Automated Security Remediation']
  },
  {
    id: 'slot-12',
    timeStart: '03:45 PM',
    timeEnd: '04:00 PM',
    title: 'Tea, Coffee & Networking Break',
    stage: 'Expo Atrium & Checkpoint Corridor',
    track: 'COMMUNITY',
    abstract: 'Afternoon tea, coffee, and refreshments. Transition back to the main auditorium for the final technical session and recognition ceremonies.',
    highlights: ['Afternoon Refreshments', 'Final Checkpoint Zone Verification', 'Auditorium Transition']
  },
  {
    id: 'slot-13',
    timeStart: '04:00 PM',
    timeEnd: '04:45 PM',
    title: 'Technical Session 06 — From Prototype to Production',
    speaker: 'Senior Cloud / AI Production Engineer',
    speakerRole: 'Production Reliability & Systems Lead',
    stage: 'Main Auditorium (Hall 1)',
    track: 'DEVOPS',
    level: 'L300 - ADVANCED',
    abstract: 'The end-to-end playbook for production reliability: continuous delivery pipelines, real-time observability with OpenTelemetry and Amazon CloudWatch, and resilience engineering.',
    highlights: ['CI/CD Pipeline Architecture', 'AWS Distro for OpenTelemetry', 'Production Reliability & SRE Best Practices']
  },
  {
    id: 'slot-14',
    timeStart: '04:45 PM',
    timeEnd: '05:10 PM',
    title: 'AWS Student Builders Community Recognition',
    speaker: 'Current & Former SBG Leaders',
    speakerRole: 'AWS Student Builder Group Leaders & Alumni',
    stage: 'Main Auditorium (Hall 1)',
    track: 'COMMUNITY',
    level: 'ALL LEVELS',
    abstract: 'Welcoming participating and alumni SBG leaders, short experience reflections, community appreciation awards, and official SBG leadership group photograph.',
    highlights: ['SBG Leaders Appreciation', 'Community Milestones & Retrospective', 'Leadership Group Photograph']
  },
  {
    id: 'slot-15',
    timeStart: '05:10 PM',
    timeEnd: '05:30 PM',
    title: 'Closing Ceremony & Grand Group Photo',
    speaker: 'Organizing Council & Volunteers',
    speakerRole: 'AWS SCD Pune 2026 Core Team',
    stage: 'Main Auditorium (Hall 1)',
    track: 'KEYNOTE',
    level: 'ALL LEVELS',
    abstract: 'Official acknowledgements, volunteer felicitation, verified event highlights, vote of thanks, and the grand 300+ student builder commemorative group photograph.',
    highlights: ['Volunteer & Organizing Team Felicitation', 'Special Sponsor Acknowledgements', 'Grand 300+ Builder Final Group Photo']
  }
];

export class ScheduleController {
  private container: HTMLElement;
  private activeTrackFilter: string = 'ALL';
  private expandedIds: Set<string> = new Set();

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
  }

  private filterSessions(): ScheduleItem[] {
    if (this.activeTrackFilter === 'ALL') return SCHEDULE_DATA;
    return SCHEDULE_DATA.filter(item => item.track === this.activeTrackFilter);
  }

  private render() {
    const sessions = this.filterSessions();
    const tracks: string[] = ['ALL', 'KEYNOTE', 'SERVERLESS', 'GENAI & LLMS', 'SECURITY', 'DEVOPS', 'COMMUNITY'];

    this.container.innerHTML = `
      <div class="schedule-section-wrapper">
        <div class="section-meta-header">
          <span class="section-tag mono">CONFERENCE TIMELINE</span>
          <h2 class="section-headline">08:00 AM to 05:30 PM. Every minute packed.</h2>
          <p class="section-sub">
            The official master schedule for AWS Student Community Day 2026 at Seasons 24, Wagholi, Pune. Featuring opening keynotes, technical deep-dives, community panels, and builder recognition.
          </p>
        </div>

        <!-- Sleek Horizontal Telemetry Strip -->
        <div class="schedule-telemetry-strip mono">
          <span class="st-item"><strong class="st-lbl">DATE:</strong> 27 DEC 2026</span>
          <span class="st-sep">//</span>
          <span class="st-item"><strong class="st-lbl">CONFERENCE HOURS:</strong> <span class="text-accent">08:00 AM – 05:30 PM IST</span></span>
          <span class="st-sep">//</span>
          <span class="st-item"><strong class="st-lbl">VENUE:</strong> SEASONS 24, WAGHOLI, PUNE</span>
          <span class="st-sep">//</span>
          <span class="st-item"><strong class="st-lbl">STAGE:</strong> 1 UNIFIED MAIN STAGE</span>
        </div>

        <!-- Filter Chips Bar -->
        <div class="schedule-filter-bar mono" role="tablist" aria-label="Schedule Filter Chips">
          <span class="filter-label">FILTER TRACK:</span>
          ${tracks.map(t => {
            const isActive = this.activeTrackFilter === t;
            return `
              <button 
                class="schedule-filter-chip ${isActive ? 'is-active' : ''}" 
                data-track="${t}"
                role="tab"
                aria-selected="${isActive}">
                ${t === 'ALL' ? '[ALL SESSIONS]' : `[${t}]`}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Flight-Board Compact Ledger Table (Minimal & Spacious) -->
        <div class="flightboard-container mono">
          <!-- Flightboard Table Header (Desktop) -->
          <div class="flightboard-table-header">
            <div class="fb-col fb-col-time">TIMING (IST)</div>
            <div class="fb-col fb-col-title">SESSION &amp; SPEAKER</div>
            <div class="fb-col fb-col-track">TRACK</div>
            <div class="fb-col fb-col-action">DETAILS</div>
          </div>

          <!-- Flightboard Rows -->
          <div class="flightboard-body">
            ${sessions.map((item) => {
              const isExpanded = this.expandedIds.has(item.id);
              return `
                <article class="flightboard-row ${isExpanded ? 'is-expanded' : ''}" id="${item.id}" data-slot-id="${item.id}">
                  <div class="fb-row-main" role="button" tabindex="0" aria-expanded="${isExpanded}" title="Click to view session details">
                    <div class="fb-col-time">
                      <span class="fb-time-range mono">${item.timeStart} — ${item.timeEnd}</span>
                    </div>

                    <div class="fb-col-title">
                      <h4 class="fb-session-heading">${item.title}</h4>
                      ${item.speaker ? `
                        <div class="fb-session-speaker mono">
                          ${item.speaker}${item.speakerRole ? ` · ${item.speakerRole}` : ''}
                        </div>
                      ` : ''}
                    </div>

                    <div class="fb-col-track">
                      <span class="badge-track mono">[${item.track}]</span>
                    </div>

                    <div class="fb-col-action">
                      <span class="fb-expand-indicator mono">${isExpanded ? '[-]' : '[+]'}</span>
                    </div>
                  </div>

                  <!-- Collapsible Abstract Drawer -->
                  <div class="flightboard-drawer ${isExpanded ? 'is-open' : ''}" id="drawer-${item.id}">
                    <p class="drawer-abstract">${item.abstract}</p>
                    ${item.highlights && item.highlights.length ? `
                      <div class="drawer-highlights">
                        <span class="hl-tag">KEY TOPICS:</span>
                        ${item.highlights.map(h => `<span class="hl-item">* ${h}</span>`).join(' ')}
                      </div>
                    ` : ''}
                  </div>
                </article>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private attachEvents() {
    // Track filter chips
    const filterBtns = this.container.querySelectorAll<HTMLButtonElement>('.schedule-filter-chip');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const track = btn.getAttribute('data-track');
        if (track) {
          this.activeTrackFilter = track;
          sound.playClick(650, 0.04);
          this.render();
        }
      });
    });

    // Row click toggle for abstract drawer
    const rowMains = this.container.querySelectorAll<HTMLElement>('.fb-row-main');
    rowMains.forEach(rowMain => {
      const row = rowMain.closest('.flightboard-row');
      if (!row) return;
      const id = row.getAttribute('data-slot-id');
      if (!id) return;

      const toggleAction = (e?: Event) => {
        if (e) e.stopPropagation();
        const drawer = row.querySelector('.flightboard-drawer');
        const icon = row.querySelector('.fb-expand-indicator');
        const isOpen = this.expandedIds.has(id);

        if (isOpen) {
          this.expandedIds.delete(id);
          row.classList.remove('is-expanded');
          if (drawer) drawer.classList.remove('is-open');
          if (icon) icon.textContent = '[+]';
          rowMain.setAttribute('aria-expanded', 'false');
          sound.playClick(450, 0.03);
        } else {
          this.expandedIds.add(id);
          row.classList.add('is-expanded');
          if (drawer) drawer.classList.add('is-open');
          if (icon) icon.textContent = '[-]';
          rowMain.setAttribute('aria-expanded', 'true');
          sound.playClick(750, 0.04);
        }
      };

      rowMain.addEventListener('click', toggleAction);
      rowMain.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleAction();
        }
      });
    });
  }
}
