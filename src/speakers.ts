import { sound } from './audio';

export interface SpeakerSession {
  id: string;
  name: string;
  badge: string;
  role: string;
  affiliation: string;
  topic: string;
  time: string;
  track: 'GenAI' | 'Serverless' | 'Architecture' | 'DevOps' | 'Security' | 'Community';
  location: string;
  description: string;
  tags: string[];
  slotId: string;
}

export const SESSIONS_DATA: SpeakerSession[] = [
  {
    id: 'spk-01',
    name: 'Keynote Speaker 01',
    badge: 'AWS LEADER',
    role: 'Principal Solutions Architect & Cloud Strategist',
    affiliation: 'Amazon Web Services India',
    topic: 'Opening Keynote: Cloud Evolution & The Student Builder Era',
    time: '10:00 - 10:45 AM IST',
    track: 'Architecture',
    location: 'MAIN AUDITORIUM (HALL 1)',
    description: 'A comprehensive opening roadmap into modern cloud computing architectures, cloud economics, and how student developers can build global resilience from Pune.',
    tags: ['Cloud Architecture', 'AWS Well-Architected', 'Student Builders'],
    slotId: 'slot-04'
  },
  {
    id: 'spk-02',
    name: 'AI Systems Practitioner',
    badge: 'AI SPECIALIST',
    role: 'Head of Applied AI & LLM Systems',
    affiliation: 'Applied Generative AI Labs',
    topic: 'Beyond Chatbots: Engineering Production AI Agents & LLM RAG',
    time: '10:45 - 11:30 AM IST',
    track: 'GenAI',
    location: 'MAIN AUDITORIUM (HALL 1)',
    description: 'End-to-end hands-on demonstration constructing multi-agent architectures, enterprise RAG, and foundation model tooling with Amazon Bedrock.',
    tags: ['Amazon Bedrock', 'Generative AI', 'AI Agents', 'RAG'],
    slotId: 'slot-05'
  },
  {
    id: 'spk-03',
    name: 'Serverless Cloud Specialist',
    badge: 'AWS COMMUNITY HERO',
    role: 'Senior Serverless Specialist',
    affiliation: 'Serverless Labs // Pune UG',
    topic: 'Event-Driven Microservices: Zero to 10M Requests with AWS Lambda & EventBridge',
    time: '12:30 - 01:15 PM IST',
    track: 'Serverless',
    location: 'MAIN AUDITORIUM (HALL 1)',
    description: 'Deep dive into event-driven design patterns, cold start mitigations, asynchronous decoupling with Amazon EventBridge, and cost-effective scaling.',
    tags: ['AWS Lambda', 'EventBridge', 'DynamoDB', 'Microservices'],
    slotId: 'slot-08'
  },
  {
    id: 'spk-04',
    name: 'DevOps & Platform Lead',
    badge: 'PLATFORM LEAD',
    role: 'Lead Platform Engineer & SRE',
    affiliation: 'HyperScale Cloud Pune',
    topic: 'Containerization & GitOps with Amazon EKS and ArgoCD',
    time: '02:15 - 03:00 PM IST',
    track: 'DevOps',
    location: 'MAIN AUDITORIUM (HALL 1)',
    description: 'Demystifying production Kubernetes workflows on Amazon EKS, progressive rollouts with ArgoCD, Karpenter node autoscaling, and container security scanners.',
    tags: ['Amazon EKS', 'Kubernetes', 'Karpenter', 'GitOps'],
    slotId: 'slot-10'
  },
  {
    id: 'spk-05',
    name: 'Cloud Security Architect',
    badge: 'SECURITY CISO',
    role: 'Chief Information Security Officer',
    affiliation: 'CyberShield Pune Enclave',
    topic: 'Zero Trust Cloud Security & Threat Detection with AWS GuardDuty',
    time: '03:00 - 03:45 PM IST',
    track: 'Security',
    location: 'MAIN AUDITORIUM (HALL 1)',
    description: 'Real-world defensive blueprints implementing Zero Trust architectures, IAM policy boundaries, runtime anomaly detection with GuardDuty, and automated remediation via Step Functions.',
    tags: ['Zero Trust', 'IAM', 'GuardDuty', 'Security'],
    slotId: 'slot-11'
  },
  {
    id: 'spk-06',
    name: 'SRE & Reliability Lead',
    badge: 'COMMUNITY BUILDER',
    role: 'AWS Community Builder & SRE',
    affiliation: 'OpenCloud Collective',
    topic: 'From Prototype to Production: Reliability & SRE on AWS',
    time: '04:00 - 04:45 PM IST',
    track: 'Community',
    location: 'MAIN AUDITORIUM (HALL 1)',
    description: 'The end-to-end playbook for production reliability: continuous delivery pipelines, real-time observability with OpenTelemetry and Amazon CloudWatch, and resilience engineering.',
    tags: ['CI/CD', 'OpenTelemetry', 'CloudWatch', 'SRE'],
    slotId: 'slot-13'
  },
  {
    id: 'spk-07',
    name: 'Data & Analytics Architect',
    badge: 'DATA & AI LEAD',
    role: 'Lead Data & Distributed Systems Architect',
    affiliation: 'Enterprise Cloud Intelligence',
    topic: 'Petabyte-Scale Streaming & Analytics on Amazon Redshift Serverless',
    time: '01:45 - 02:15 PM IST',
    track: 'Architecture',
    location: 'MAIN AUDITORIUM (HALL 1)',
    description: 'Architecting modern petabyte-scale data lakes, streaming ingestion with Amazon Kinesis, and unified analytics powered by generative business intelligence.',
    tags: ['Amazon Redshift', 'Kinesis', 'Data Lakes', 'Generative BI'],
    slotId: 'slot-09'
  },
  {
    id: 'spk-08',
    name: 'Closing Keynote Speaker',
    badge: 'KEYNOTE PIONEER',
    role: 'Community Leader & AWS Ambassador',
    affiliation: 'Global AWS Builder Network',
    topic: 'Valedictory Keynote: Scaling Student Builders into Global Cloud Leaders',
    time: '04:45 - 05:15 PM IST',
    track: 'Community',
    location: 'MAIN AUDITORIUM (HALL 1)',
    description: 'Inspiring closing keynote exploring community-led innovation, open-source cloud projects, building generational impact, and the path forward for Pune builders.',
    tags: ['Community', 'Cloud Leadership', 'Global Scale', 'Valedictory'],
    slotId: 'slot-14'
  }
];

export class SpeakersController {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
  }

  private render() {
    this.container.innerHTML = `
      <div class="speakers-section-wrapper">
        <div class="section-meta-header">
          <span class="section-tag mono">FEATURED KEYNOTES &amp; SPEAKERS</span>
          <h2 class="section-headline">THE ARCHITECTS & VISIONARIES.</h2>
          <p class="section-sub">
            8 confirmed keynote leaders, AWS heroes, and technical specialists delivering production cloud architectures on 27 December 2026 at Seasons 24, Wagholi. One unified stage.
          </p>
        </div>

        <!-- Speaker Cards Grid (Total 8 Speakers with Mystery ? Reveal Frame) -->
        <div class="speakers-grid">
          ${SESSIONS_DATA.map(s => `
            <div class="speaker-card" id="card-${s.id}">
              <!-- Mystery ? Placeholder Frame (Revealing Later) -->
              <div class="speaker-photo-frame speaker-mystery-frame" title="Speaker reveal dropping soon!">
                <div class="mystery-avatar-container">
                  <div class="mystery-cyber-grid"></div>
                  <div class="mystery-qmark-wrap">
                    <span class="mystery-qmark">?</span>
                  </div>
                  <div class="mystery-reveal-badge mono">
                    <span class="reveal-beacon">●</span>
                    <span>TO BE REVEALED</span>
                  </div>
                </div>
                <span class="speaker-track-tag mono">[${s.track.toUpperCase()}]</span>
              </div>

              <!-- Speaker Content -->
              <div class="speaker-content">
                <div class="speaker-meta-top">
                  <h3 class="speaker-name">
                    ${s.name}
                  </h3>
                  <span class="speaker-affiliation mono">${s.affiliation}</span>
                </div>

                <a href="#${s.slotId}" class="speaker-topic-link" data-slot="${s.slotId}" title="View session in schedule">
                  <h4 class="speaker-topic">${s.topic}</h4>
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private attachEvents() {
    // Jump to schedule slot
    const slotLinks = this.container.querySelectorAll<HTMLAnchorElement>('.speaker-topic-link');
    slotLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const slotId = link.getAttribute('data-slot');
        if (slotId) {
          const targetSlot = document.getElementById(slotId);
          if (targetSlot) {
            e.preventDefault();
            sound.playClick(720, 0.04);
            targetSlot.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Auto-expand drawer
            targetSlot.classList.add('is-expanded');
            const drawer = targetSlot.querySelector('.flightboard-drawer');
            if (drawer) drawer.classList.add('is-open');
            const toggleBtn = targetSlot.querySelector('.btn-fb-abstract-toggle');
            if (toggleBtn) {
              toggleBtn.textContent = '[-] HIDE';
              toggleBtn.setAttribute('aria-expanded', 'true');
            }

            targetSlot.classList.remove('is-target-highlight');
            void targetSlot.offsetWidth;
            targetSlot.classList.add('is-target-highlight');
          }
        }
      });
    });

    // Mystery photo frame click sound & ripple
    const frames = this.container.querySelectorAll('.speaker-mystery-frame');
    frames.forEach(frame => {
      frame.addEventListener('click', () => {
        sound.playClick(850, 0.03);
      });
    });
  }
}
