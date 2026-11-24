import { sound } from './audio';

export interface CheckpointZone {
  id: string;
  index: number;
  name: string;
  subtitle: string;
  tag: string;
  coordinate: string;
  description: string;
  cloudService: string;
  voxelFeature: string;
  recommendedFont: string;
  asciiArt: string;
  specimenPhrase: string;
}

export const CHECKPOINTS: CheckpointZone[] = [
  {
    id: 'zone-localhost',
    index: 0,
    name: 'Localhost Station',
    subtitle: '127.0.0.1 • The Genesis Point',
    tag: 'PORT 3000',
    coordinate: '[0, 0, 0]',
    description: 'Where every cloud journey begins: local development loops, terminals, hot-reload servers, and rubber duck debugging.',
    cloudService: 'AWS Cloud9 & LocalStack',
    voxelFeature: 'CRT Terminals, Coffee Cups, Rubber Ducks',
    recommendedFont: 'KS Relay (Monospace with Casual Script)',
    asciiArt: `
+------------------------------------------------+
| [TERM] 127.0.0.1:3000 // GENESIS LOCALHOST     |
| > git init --initial-branch=main               |
| > npm run dev [VITE v5.4.21 READY IN 889ms]    |
| > LOCAL: http://localhost:3000/                |
+------------------------------------------------+
        +------------+            (o_
        |  [DEV_RIG] |            //\\   [DEBUGGER]
        |  o   ==  o |____        V_/_  RUBBER DUCK
        +------------+    |
         '----------'-----'
    `,
    specimenPhrase: '127.0.0.1 // ZERO LATENCY INCEPTION'
  },
  {
    id: 'zone-vpc',
    index: 1,
    name: 'Cloud VPC Bastion',
    subtitle: '10.0.0.0/16 • Isolated Foundations',
    tag: 'VPC ROUTE',
    coordinate: '[35, -5, 25]',
    description: 'Secure subnet topologies, multi-AZ peering, Internet Gateways, and high-density compute rack clusters.',
    cloudService: 'Amazon VPC & Transit Gateway',
    voxelFeature: 'Modular Server Racks & Blinking LED Banks',
    recommendedFont: 'KS Elastik (Condensed Infrastructure Sans)',
    asciiArt: `
+------------------------------------------------+
| AWS TRANSIT GATEWAY // MULTI-AZ TOPOLOGY       |
| [RACK 01 :: AZ-1A]   [===|===|===] [● ● ● ●]   |
| [RACK 02 :: AZ-1B]   [===|===|===] [● ● ● ●]   |
| [IGW ROUTE]          CIDR: 10.0.0.0/16         |
+------------------------------------------------+
                    | NAT-GW |
        +--------------------------------+
        | PRIVATE SUBNET ENCLAVE [PUNE]  |
        +--------------------------------+
    `,
    specimenPhrase: 'SECURE ENCLAVES WITH MULTI-AZ PEERING'
  },
  {
    id: 'zone-serverless',
    index: 2,
    name: 'Serverless & Containers',
    subtitle: 'Zero Idle • Event-Driven Harbor',
    tag: 'AUTOSCALE',
    coordinate: '[70, -12, 10]',
    description: 'Fleet cargo transport for microservices and floating event crystals firing millions of invocations on demand.',
    cloudService: 'AWS Lambda, EventBridge & Amazon EKS',
    voxelFeature: 'Container Cargo Ships & Glowing Lambda Crystals',
    recommendedFont: 'KS Elastik (Dynamic Elastic Width)',
    asciiArt: `
+------------------------------------------------+
| EVENTBRIDGE BUS // 10M+ DISPATCH PIPELINE      |
|          /\\                                    |
|         /  \\        [LAMBDA CLUSTER :: λ]      |
|        / /\\ \\       Cold Start: 12ms           |
|       / /__\\ \\      Concurrencies: 5,000       |
|      /________\\     Zero Idle Standby          |
|    [===EKS HARBOR===]  Docker Pods Running     |
+------------------------------------------------+
    `,
    specimenPhrase: 'ZERO PROVISIONING. MILLIONS OF EVENTS.'
  },
  {
    id: 'zone-security',
    index: 3,
    name: 'Security Citadel',
    subtitle: 'Zero Trust • Continuous Compliance',
    tag: 'IAM SHIELD',
    coordinate: '[110, -20, 35]',
    description: 'Perimeter firewalls, KMS cryptographic keys, automated threat detection, and real-time security postures.',
    cloudService: 'AWS IAM, KMS, GuardDuty & WAF',
    voxelFeature: 'Hardened Encryption Towers & Vault Gates',
    recommendedFont: 'KS Morrow (Disciplined Serif)',
    asciiArt: `
+------------------------------------------------+
| PERIMETER DEFENSE // AWS IAM & GUARDDUTY       |
|       /========================\\               |
|      /   [IAM ZERO TRUST CORE]  \\              |
|     |     .------------------.   |  [KMS 256]  |
|     |    | ENCRYPT RSA-4096   |  |  ACTIVE     |
|     |     '------------------'   |  TLS 1.3    |
|      \\   GuardDuty: 0 Anomalies /              |
|       \\========================/               |
+------------------------------------------------+
    `,
    specimenPhrase: 'CONTINUOUS ZERO TRUST COMPLIANCE'
  },
  {
    id: 'zone-ai',
    index: 4,
    name: 'Global Scale & AI Nexus',
    subtitle: 'Worldwide CDN • Foundation Models',
    tag: 'PLANETARY AI',
    coordinate: '[150, -30, 0]',
    description: 'Global edge distribution across 33+ regions, low-latency neural inference pipelines, and foundation AI models.',
    cloudService: 'Amazon Bedrock, CloudFront & Trainium',
    voxelFeature: 'Floating Neural Core & Pulsing Synapse Towers',
    recommendedFont: 'KS Morrow (Warmth) + KS Relay (Telemetry)',
    asciiArt: `
+------------------------------------------------+
| AMAZON BEDROCK // CLOUD-WIDE INFERENCE RUNTIME |
|       .------[NEURAL CORE]------.              |
|      /   ●   ●   ●   ●   ●   ●   \\             |
|     |    Claude 3.5 Sonnet / RAG  | 33 Regions |
|     |    Titan Multimodal Vectors | Edge CDN   |
|      \\   ●   ●   ●   ●   ●   ●   /             |
|       '-------------------------'              |
+------------------------------------------------+
    `,
    specimenPhrase: 'PLANETARY FOUNDATION MODELS AT SCALE'
  }
];

export class CheckpointsController {
  private container: HTMLElement;
  private activeZoneId: string = 'zone-localhost';

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
  }

  private getActiveZone(): CheckpointZone {
    return CHECKPOINTS.find(z => z.id === this.activeZoneId) || CHECKPOINTS[0];
  }

  public setActiveZone(id: string) {
    this.activeZoneId = id;
    this.render();
    sound.playClick(720, 0.04);
  }

  private render() {
    const active = this.getActiveZone();

    this.container.innerHTML = `
      <div class="checkpoints-section-wrapper">
        <div class="section-meta-header">
          <span class="section-tag mono">ROADMAP &amp; CHECKPOINTS</span>
          <h2 class="section-headline">From 127.0.0.1 to Global AI.</h2>
          <p class="section-sub">
            The five architectural checkpoints charting the student builder progression at AWS Student Community Day 2026 Pune.
          </p>
        </div>

        <!-- 5-Point Conduit Stepper Bar -->
        <div class="conduit-stepper mono" role="tablist" aria-label="AWS SCD Cloud Checkpoints">
          ${CHECKPOINTS.map((cp, idx) => {
            const isSelected = cp.id === this.activeZoneId;
            return `
              <button 
                class="conduit-step-btn ${isSelected ? 'is-active' : ''}" 
                role="tab" 
                aria-selected="${isSelected}"
                data-zone-id="${cp.id}">
                <div class="step-badge-row">
                  <span class="step-idx">ZONE 0${idx}</span>
                  <span class="step-tag">${cp.tag}</span>
                </div>
                <strong class="step-name">${cp.name}</strong>
                <span class="step-coord">${cp.coordinate}</span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Active Checkpoint Dossier Card -->
        <div class="checkpoint-dossier-card">
          <div class="dossier-grid">
            <!-- Left Info Column -->
            <div class="dossier-info-col mono">
              <div class="dossier-header-badge">
                <span class="badge-accent">${active.tag}</span>
                <span class="badge-coord">VECTOR: ${active.coordinate}</span>
                <span class="badge-sub">${active.subtitle}</span>
              </div>

              <h3 class="dossier-title">${active.name}</h3>
              <p class="dossier-desc">${active.description}</p>

              <div class="dossier-specs-table">
                <div class="spec-row">
                  <span class="s-lbl">AWS STACK:</span>
                  <strong class="s-val text-vermilion">${active.cloudService}</strong>
                </div>
                <div class="spec-row">
                  <span class="s-lbl">VOXEL ASSETS:</span>
                  <span class="s-val">${active.voxelFeature}</span>
                </div>
                <div class="spec-row">
                  <span class="s-lbl">RECOMMENDED TYPE:</span>
                  <span class="s-val">${active.recommendedFont}</span>
                </div>
              </div>

              <div class="dossier-actions">
                <a href="#schedule" class="btn-brutalist btn-accent test-zone-font-btn">
                  View Track in Schedule ->
                </a>
                <a href="#passes" class="btn-brutalist btn-secondary">
                  Claim KonfHub Pass for this Track ->
                </a>
              </div>
            </div>

            <!-- Right Visual / ASCII Blueprint Column -->
            <div class="dossier-visual-col">
              <div class="ascii-blueprint-box mono">
                <!-- Tactical Corner Frame Accents -->
                <div class="terminal-corner-tick tick-tl">+</div>
                <div class="terminal-corner-tick tick-tr">+</div>
                <div class="terminal-corner-tick tick-bl">+</div>
                <div class="terminal-corner-tick tick-br">+</div>

                <!-- Hardware Terminal Header Bar -->
                <div class="terminal-header-bar">
                  <div class="th-left">
                    <span class="term-status-dot">●</span>
                    <span class="th-title">TELEMETRY BLUEPRINT :: [ZONE-0${active.index}: ${active.id.toUpperCase()}]</span>
                  </div>
                  <div class="th-right">
                    <span class="th-lock-badge">[SIGNAL LOCKED]</span>
                  </div>
                </div>

                <!-- Sub-Header Telemetry Metric Strip -->
                <div class="terminal-sub-meta">
                  <span>VECTOR: <strong>${active.coordinate}</strong></span>
                  <span class="meta-sep">//</span>
                  <span>AWS SERVICE: <strong>${active.cloudService}</strong></span>
                  <span class="meta-sep">//</span>
                  <span>STATUS: <strong class="text-accent">ONLINE</strong></span>
                </div>

                <!-- Centered Monospace ASCII Viewport with Scanlines -->
                <div class="terminal-screen-viewport">
                  <pre class="ascii-pre">${active.asciiArt.trim()}</pre>
                </div>

                <!-- Specimen Display Bay (Hardware Punch-Card Slot) -->
                <div class="blueprint-specimen-bay">
                  <div class="specimen-header-row">
                    <span class="spec-label">LIVE ZONE SPECIMEN:</span>
                    <span class="spec-type-tag">TYPEFACE: ${active.recommendedFont}</span>
                  </div>
                  <div class="spec-text">${active.specimenPhrase}</div>
                  <div class="specimen-footer-metrics">
                    <span>SYS PROTOCOL: [${active.tag}]</span>
                    <span>3D VOXEL ASSET: [${active.voxelFeature}]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private attachEvents() {
    const buttons = this.container.querySelectorAll<HTMLButtonElement>('.conduit-step-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-zone-id');
        if (id && id !== this.activeZoneId) {
          this.setActiveZone(id);
        }
      });
    });

    const testBtn = this.container.querySelector('.test-zone-font-btn');
    if (testBtn) {
      testBtn.addEventListener('click', () => {
        const testSection = document.getElementById('test-drive');
        if (testSection) {
          testSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }
}
