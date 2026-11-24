import { sound } from './audio';

export class VenueController {
  private container: HTMLElement;
  private currentZoom: number = 1.0;
  private readonly minZoom: number = 1.0;
  private readonly maxZoom: number = 2.2;
  private readonly zoomStep: number = 0.3;

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
  }

  private render() {
    this.container.innerHTML = `
      <div class="venue-section-wrapper">
        <div class="section-meta-header">
          <span class="section-tag mono">VENUE &amp; WAYFINDING</span>
          <h2 class="section-headline">Seasons 24, Wagholi. Your conference coordinates.</h2>
          <p class="section-sub">
            All keynotes, breakout tracks, hackathon showcases, and sponsor expos take place under one roof on Pune-Ahmednagar Highway, Wagholi, Pune.
          </p>
        </div>

        <div class="venue-grid">
          <!-- Left: Address & Transit Dossier -->
          <div class="venue-info-panel mono">
            <div class="venue-card-header">
              <span>VENUE DOSSIER // PUNE METROPOLITAN REGION</span>
              <span class="badge-status text-accent">[CONFIRMED LOCATION]</span>
            </div>

            <div class="venue-address-block">
              <span class="addr-label">PHYSICAL ADDRESS:</span>
              <div class="addr-title">SEASONS 24 BANQUET & CONVENTIONS</div>
              <div class="addr-text">
                Pune - Ahmednagar Highway, Wagholi,<br/>
                Pune, Maharashtra 412207, India.<br/>
                Landmark: Near Wagheshwar Temple.
              </div>
              <div class="addr-coords">
                COORDINATES: 18.5793° N, 73.9818° E // ELEVATION: 560M ASL
              </div>
            </div>

            <!-- Transit Guide with Dedicated Pune Metro & PMPML Bus Dossiers -->
            <div class="venue-transit-section">
              <span class="transit-hdr">HOW TO REACH SEASONS 24 // PUNE TRANSIT:</span>

              <!-- PUNE METRO AQUA LINE DOSSIER -->
              <div class="transit-item transit-item-highlight metro-card-highlight">
                <div class="tr-badge-wrap">
                  <span class="tr-badge badge-metro">[METRO]</span>
                  <span class="metro-line-tag">AQUA LINE 2</span>
                </div>
                <div class="tr-body">
                  <strong>Via Pune Metro (Aqua Line ➔ Ramwadi Terminal):</strong>
                  <p>
                    Take the Metro to <strong>Ramwadi Metro Station</strong> (terminal station on Nagar Road).
                    From Ramwadi, board a 12-minute direct feeder bus or share auto straight to <strong>Seasons 24 Wagholi</strong>.
                  </p>
                  <div class="tr-meta-pills">
                    <span class="pill-mini">TRANSIT TIME: 25 MINS</span>
                    <span class="pill-mini">FARE: ₹20-30</span>
                    <span class="pill-mini">FEEDER: EVERY 5 MINS</span>
                  </div>
                </div>
              </div>

              <!-- PMPML PUNE CITY BUS DOSSIER -->
              <div class="transit-item transit-item-highlight pmpml-card-highlight">
                <div class="tr-badge-wrap">
                  <span class="tr-badge badge-pmpml">[PMPML BUS]</span>
                  <span class="pmpml-line-tag">PUNE CITY EXPRESS</span>
                </div>
                <div class="tr-body">
                  <strong>Direct PMPML City Buses (Routes 158, 159, 165):</strong>
                  <p>
                    Frequent AC Electric &amp; CNG buses run directly from <strong>Pune Railway Station</strong> and <strong>Swargate</strong> along Nagar Road, stopping right outside <strong>Seasons 24 Bus Stop / Wagheshwar Temple</strong>.
                  </p>
                  <div class="tr-meta-pills">
                    <span class="pill-mini">ROUTE 158: PUNE STN ⇄ WAGHOLI</span>
                    <span class="pill-mini">ROUTE 165: SWARGATE ⇄ WAGHOLI</span>
                    <span class="pill-mini">FREQ: 8-10 MINS</span>
                  </div>
                </div>
              </div>

            </div>

            <!-- External Navigation Action -->
            <div class="venue-actions-strip">
              <a 
                href="https://maps.google.com/?q=Seasons+24+Wagholi+Pune" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="btn-brutalist btn-accent w-full text-center"
                id="btn-open-maps">
                OPEN IN GOOGLE MAPS [EXT ->]
              </a>
            </div>
            <div id="copy-address-status" class="copy-status-text" style="display: none;"></div>
          </div>

          <!-- Right: Tactical Dossier Radar Map & Amenity Matrix -->
          <div class="venue-blueprint-panel mono">
            <div class="blueprint-card">
              <div class="blueprint-header">
                <span>CAMPUS SATELLITE & TRANSIT RADAR</span>
                <span class="text-accent">[SEASONS 24]</span>
              </div>

              <!-- Tactical Dossier Map Container -->
              <div class="venue-map-wrapper">
                <!-- Tactical Top HUD Bar -->
                <div class="map-hud-bar">
                  <div class="hud-left">
                    <span class="hud-blip-dot">●</span>
                    <span class="hud-coord-text">18.5793° N, 73.9818° E // PUNE-NAGAR HWY</span>
                  </div>
                  <div class="hud-right">
                    <span class="hud-target-reticle">+-- [SEASONS 24]</span>
                  </div>
                </div>

                <!-- Tactical Map Box with Overlays -->
                <div class="map-tactical-box" id="tactical-map-box">
                  <!-- Tactical Interactive Zoom Controls -->
                  <div class="tactical-zoom-controls">
                    <button class="tactical-ctrl-btn" id="ctrl-zoom-in" title="Zoom in" aria-label="Zoom in">[+]</button>
                    <button class="tactical-ctrl-btn is-disabled" id="ctrl-zoom-out" title="Zoom out" aria-label="Zoom out" disabled>[-]</button>
                    <button class="tactical-ctrl-btn" id="ctrl-zoom-reset" title="Reset view" aria-label="Reset map view">[R]</button>
                  </div>

                  <!-- Tactical Scale Bar & North Indicator -->
                  <div class="tactical-scale-cluster">
                    <div class="tactical-north-indicator">
                      <span class="north-arrow">▲</span>
                      <span class="north-label">N</span>
                    </div>
                    <div class="tactical-scale-bar">
                      <span class="scale-ticks">|─────|─────|</span>
                      <span class="scale-label" id="tactical-scale-text">[ 500 M ]</span>
                    </div>
                  </div>

                  <!-- High-Precision SVG Tactical Vector Map -->
                  <svg 
                    class="tactical-map-svg" 
                    id="tactical-map-svg"
                    viewBox="0 0 800 520" 
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <!-- Subtle Coordinate Grid Pattern -->
                      <pattern id="tacticalGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(1, 1, 1, 0.08)" stroke-width="1" />
                        <circle cx="0" cy="0" r="1.5" fill="rgba(1, 1, 1, 0.2)" />
                      </pattern>

                      <!-- Reticle Pulse Animation Filter -->
                      <radialGradient id="targetGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#FD0B03" stop-opacity="0.35" />
                        <stop offset="100%" stop-color="#FD0B03" stop-opacity="0" />
                      </radialGradient>
                    </defs>

                    <!-- Background Warm Putty Surface -->
                    <rect width="800" height="520" fill="#ECE6D8" />

                    <!-- Tactical Grid Layer -->
                    <rect width="800" height="520" fill="url(#tacticalGrid)" />

                    <!-- Corner Framing Ticks (placed at Top-Left and Bottom-Right to never collide with UI controls) -->
                    <g class="svg-corner-crosshairs" stroke="#010101" stroke-width="1.5" opacity="0.75">
                      <!-- Top-Left Framing -->
                      <path d="M 16,28 L 32,28 M 28,16 L 28,32" />
                      <!-- Bottom-Right Framing -->
                      <path d="M 764,496 L 784,496 M 774,486 L 774,506" />
                    </g>

                    <!-- Coordinate Grid Labels along Margins -->
                    <g class="svg-coord-labels" fill="rgba(1, 1, 1, 0.35)" font-family="Space Mono, monospace" font-size="9">
                      <text x="14" y="50">18°35'15"N</text>
                      <text x="14" y="180">18°34'50"N</text>
                      <text x="14" y="320">18°34'30"N</text>
                      <text x="14" y="420">18°34'05"N</text>

                      <text x="210" y="508">73°58'20"E</text>
                      <text x="440" y="508">73°58'55"E</text>
                      <text x="660" y="508">73°59'30"E</text>
                    </g>

                    <!-- Dynamic Zoomable Map Layer (Scales smoothly around Seasons 24 center) -->
                    <g id="tactical-map-layer" class="tactical-map-layer">
                      <!-- Minor Local Street Network (Hairlines) -->
                      <g class="svg-minor-roads" stroke="#B8B1A4" stroke-width="1.2" fill="none">
                        <!-- Wagholi North Local Grid -->
                        <path d="M 50,110 L 190,105 L 260,160 L 330,150 L 390,95 L 470,85 L 560,95 L 680,60" />
                        <path d="M 190,105 L 180,240 L 250,230 L 320,290" />
                        <path d="M 260,160 L 340,160 L 380,225" />
                        <path d="M 390,95 L 430,175 L 470,180" />
                        <path d="M 470,85 L 510,160" />
                        <path d="M 560,95 L 590,165 L 660,150 L 730,140" />

                        <!-- Wagholi South Local Grid -->
                        <path d="M 120,440 L 220,430 L 310,480 L 410,470 L 510,485 L 640,490" />
                        <path d="M 220,430 L 250,340 L 340,330" />
                        <path d="M 310,480 L 350,380 L 440,370" />
                        <path d="M 410,470 L 450,390 L 520,380 L 590,440" />
                        <path d="M 510,485 L 550,390 L 630,370 L 720,410" />
                      </g>

                      <!-- Secondary Collector Roads (Dark Grey) -->
                      <g class="svg-secondary-roads" stroke="#4A453E" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none">
                        <!-- Kharadi Link / EON Bypass -->
                        <path d="M 90,460 C 140,420 180,360 220,340" />
                        <!-- Lexicon International Access Road -->
                        <path d="M 390,260 C 400,190 420,120 440,50" />
                        <!-- Wagheshwar Temple Access Lane -->
                        <path d="M 580,205 C 590,140 610,90 630,40" />
                        <!-- Wagholi Bypass Loop -->
                        <path d="M 440,240 C 490,270 550,340 620,450" />
                        <!-- Kesnand Connector -->
                        <path d="M 640,175 C 690,230 730,310 770,390" />
                      </g>

                      <!-- Primary Arterial Highway (Pune-Ahmednagar Highway / MH SH-27) -->
                      <!-- Outer Highway Casing -->
                      <path 
                        d="M 20,370 C 160,340 280,305 400,255 C 520,205 640,180 780,160" 
                        fill="none" 
                        stroke="#010101" 
                        stroke-width="9.5" 
                        stroke-linecap="round" 
                        stroke-linejoin="round" />

                      <!-- Inner Highway Centerline -->
                      <path 
                        d="M 20,370 C 160,340 280,305 400,255 C 520,205 640,180 780,160" 
                        fill="none 
                        stroke="#ECE6D8" 
                        stroke-width="1.8" 
                        stroke-dasharray="8 6" 
                        stroke-linecap="butt" />

                      <!-- PUNE METRO AQUA LINE VIADUCT (RAMWADI TO NAGAR RD CORRIDOR) -->
                      <g class="radar-metro-network">
                        <!-- Elevated Viaduct Track line -->
                        <path 
                          d="M 20,320 C 110,290 190,250 280,205" 
                          fill="none" 
                          stroke="#7B2CBF" 
                          stroke-width="4.5" 
                          stroke-dasharray="6 3" 
                          opacity="0.9" />
                        <path 
                          d="M 20,320 C 110,290 190,250 280,205" 
                          fill="none" 
                          stroke="#00B4D8" 
                          stroke-width="1.5" />

                        <!-- Ramwadi Metro Station Marker Node -->
                        <g transform="translate(60, 310)">
                          <circle cx="0" cy="0" r="5" fill="#7B2CBF" stroke="#FFFFFF" stroke-width="1.8" />
                          <circle cx="0" cy="0" r="2" fill="#00B4D8" />
                          <!-- Callout Tag -->
                          <rect x="8" y="-12" width="130" height="18" fill="#FFFFFF" stroke="#7B2CBF" stroke-width="1.2" />
                          <text x="14" y="0" font-family="Space Mono, monospace" font-size="7" font-weight="900" fill="#7B2CBF">
                            [RAMWADI METRO TERMINAL]
                          </text>
                        </g>

                        <!-- Animated Pune Metro Train Capsule on Radar Track -->
                        <g class="radar-metro-capsule">
                          <rect x="-16" y="-6" width="32" height="12" rx="2" fill="#FFFFFF" stroke="#7B2CBF" stroke-width="1.5" />
                          <rect x="-16" y="-1" width="32" height="3" fill="#00B4D8" />
                          <circle cx="12" cy="0" r="1.8" fill="#FFF200" />
                          <text x="0" y="3" font-family="Space Mono, monospace" font-size="5" font-weight="900" fill="#010101" text-anchor="middle">METRO</text>
                        </g>
                      </g>

                      <!-- ANIMATED PMPML BUS RUNNING ON NAGAR ROAD -->
                      <g class="radar-pmpml-network">
                        <!-- Seasons 24 Bus Stop Node on Highway -->
                        <g transform="translate(390, 268)">
                          <circle cx="0" cy="0" r="4.5" fill="#00875A" stroke="#FFFFFF" stroke-width="1.8" />
                          <rect x="8" y="-10" width="136" height="16" fill="#FFFFFF" stroke="#00875A" stroke-width="1.2" />
                          <text x="14" y="1" font-family="Space Mono, monospace" font-size="6.5" font-weight="900" fill="#00875A">
                            [SEASONS 24 BUS STOP - 158]
                          </text>
                        </g>

                        <!-- Animated PMPML Bus Capsule cruising along highway -->
                        <g class="radar-pmpml-capsule">
                          <rect x="-14" y="-6" width="28" height="12" rx="2" fill="#00875A" stroke="#010101" stroke-width="1.2" />
                          <rect x="-14" y="-6" width="28" height="4" fill="#FFFFFF" />
                          <rect x="-14" y="-2" width="28" height="1" fill="#FF9900" />
                          <circle cx="10" cy="1" r="1.8" fill="#FFF200" />
                          <text x="-1" y="2.5" font-family="Space Mono, monospace" font-size="4.5" font-weight="900" fill="#FFFFFF" text-anchor="middle">PMPML</text>
                        </g>
                      </g>

                      <!-- Highway Directional Labels -->
                      <g font-family="Space Mono, monospace" font-size="9" font-weight="700" fill="#010101">
                        <text x="140" y="325" transform="rotate(-14 140 325)" letter-spacing="1">
                          PUNE - AHMEDNAGAR HIGHWAY [MH SH-27]
                        </text>
                        <text x="35" y="398" fill="var(--color-brown)">
                          <- RAMWADI METRO (7 KM) // PUNE STATION (15 KM)
                        </text>
                        <text x="560" y="148" fill="var(--color-brown)">
                          WAGHOLI BYPASS // AHMEDNAGAR ->
                        </text>
                      </g>

                      <!-- Authentic Cultural & Road Landmarks (Sleek Tactical Styling) -->
                      <g class="svg-landmarks" font-family="Space Mono, monospace">
                        <!-- 1. SHRI WAGHESHWAR TEMPLE (Historical Landmark) -->
                        <g transform="translate(540, 48)">
                          <line x1="12" y1="30" x2="-22" y2="58" stroke="#010101" stroke-width="1.5" stroke-dasharray="3 2" />
                          <circle cx="-22" cy="58" r="3.5" fill="#FD0B03" stroke="#010101" stroke-width="1.2" />
                          <!-- Brutalist hard shadow -->
                          <rect x="2.5" y="2.5" width="200" height="30" fill="#010101" />
                          <!-- Card body -->
                          <rect x="0" y="0" width="200" height="30" fill="#FFFFFF" stroke="#010101" stroke-width="1.5" />
                          <!-- Red accent edge bar -->
                          <rect x="0" y="0" width="4" height="30" fill="#FD0B03" />
                          <text x="12" y="13" font-size="8.5" font-weight="900" fill="#010101" letter-spacing="0.2">SHRI WAGHESHWAR TEMPLE</text>
                          <text x="12" y="23" font-size="7" font-weight="700" fill="#7A3428">[HISTORIC WAGHOLI LANDMARK]</text>
                        </g>

                        <!-- 2. LIFELINE HOSPITAL & WAGHOLI BYPASS -->
                        <g transform="translate(515, 365)">
                          <line x1="10" y1="0" x2="-20" y2="-25" stroke="#010101" stroke-width="1.5" stroke-dasharray="3 2" />
                          <circle cx="-20" cy="-25" r="3.5" fill="#010101" />
                          <!-- Brutalist hard shadow -->
                          <rect x="2.5" y="2.5" width="180" height="30" fill="#010101" />
                          <!-- Card body -->
                          <rect x="0" y="0" width="180" height="30" fill="#FFFFFF" stroke="#010101" stroke-width="1.5" />
                          <!-- Black accent edge bar -->
                          <rect x="0" y="0" width="4" height="30" fill="#010101" />
                          <text x="12" y="13" font-size="8.5" font-weight="800" fill="#010101" letter-spacing="0.2">LIFELINE HOSPITAL PUNE</text>
                          <text x="12" y="23" font-size="7" font-weight="700" fill="#5C413C">[WAGHOLI BYPASS JUNCTION]</text>
                        </g>
                      </g>

                      <!-- SEASONS 24 VENUE TARGET RETICLE (Interactive Focus Area) -->
                      <g class="svg-target-cluster" id="venue-target-cluster" transform="translate(475, 225)">
                        <!-- Pulsing Outer Radar Ring -->
                        <circle cx="0" cy="0" r="26" fill="url(#targetGlow)" />
                        <circle cx="0" cy="0" r="22" fill="none" stroke="#FD0B03" stroke-width="1.5" stroke-dasharray="4 3" class="radar-reticle-ring" />
                        <circle cx="0" cy="0" r="14" fill="none" stroke="#FD0B03" stroke-width="1.2" />

                        <!-- Sharp Geometric Crosshairs -->
                        <line x1="-18" y1="0" x2="-6" y2="0" stroke="#FD0B03" stroke-width="2" />
                        <line x1="6" y1="0" x2="18" y2="0" stroke="#FD0B03" stroke-width="2" />
                        <line x1="0" y1="-18" x2="0" y2="-6" stroke="#FD0B03" stroke-width="2" />
                        <line x1="0" y1="6" x2="0" y2="18" stroke="#FD0B03" stroke-width="2" />

                        <!-- Center Reticle Solid Point -->
                        <circle cx="0" cy="0" r="4.5" fill="#FD0B03" stroke="#010101" stroke-width="1" />

                        <!-- Callout Leader Line -->
                        <polyline points="0,-18 20,-48 180,-48" fill="none" stroke="#010101" stroke-width="1.5" />

                        <!-- Tactical Venue Callout Dossier Card -->
                        <g transform="translate(20, -84)">
                          <!-- Shadow Offset -->
                          <rect x="2.5" y="2.5" width="228" height="34" fill="#010101" />
                          <!-- Card Box -->
                          <rect x="0" y="0" width="228" height="34" fill="#FD0B03" stroke="#010101" stroke-width="1.5" />

                          <!-- Callout Text -->
                          <text x="12" y="14" font-family="Space Mono, monospace" font-size="9" font-weight="900" fill="#FFFFFF" letter-spacing="0.5">
                            [TARGET: SEASONS 24]
                          </text>
                          <text x="12" y="26" font-family="Space Mono, monospace" font-size="7.5" font-weight="700" fill="#FFFFFF" opacity="0.95">
                            VENUE HQ // 18.5793° N, 73.9818° E
                          </text>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>

                <!-- Tactical Map Actions Bar -->
                <div class="map-actions-bar">
                  <a 
                    href="https://maps.google.com/?q=Seasons+24+Wagholi+Pune" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="btn-brutalist btn-accent btn-map-directions"
                    id="btn-live-directions">
                    GET LIVE DIRECTIONS [GOOGLE MAPS EXT ->]
                  </a>
                  <button class="btn-brutalist btn-secondary btn-copy-gps" id="btn-copy-coords">
                    [COPY GPS: 18.5793, 73.9818]
                  </button>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private applyZoom() {
    const mapLayer = this.container.querySelector<SVGGElement>('#tactical-map-layer');
    const scaleText = this.container.querySelector<HTMLElement>('#tactical-scale-text');
    const zoomInBtn = this.container.querySelector<HTMLButtonElement>('#ctrl-zoom-in');
    const zoomOutBtn = this.container.querySelector<HTMLButtonElement>('#ctrl-zoom-out');

    if (!mapLayer) return;

    // Smooth transform scaling centered precisely on Seasons 24 venue coordinates (475, 225)
    mapLayer.style.transform = `scale(${this.currentZoom})`;

    // Update dynamic scale indicator
    if (scaleText) {
      if (this.currentZoom >= 1.9) {
        scaleText.textContent = '[ 150 M ]';
      } else if (this.currentZoom >= 1.5) {
        scaleText.textContent = '[ 250 M ]';
      } else if (this.currentZoom >= 1.25) {
        scaleText.textContent = '[ 350 M ]';
      } else {
        scaleText.textContent = '[ 500 M ]';
      }
    }

    // Update disabled button states
    if (zoomOutBtn) {
      if (this.currentZoom <= this.minZoom + 0.05) {
        zoomOutBtn.disabled = true;
        zoomOutBtn.classList.add('is-disabled');
      } else {
        zoomOutBtn.disabled = false;
        zoomOutBtn.classList.remove('is-disabled');
      }
    }

    if (zoomInBtn) {
      if (this.currentZoom >= this.maxZoom - 0.05) {
        zoomInBtn.disabled = true;
        zoomInBtn.classList.add('is-disabled');
      } else {
        zoomInBtn.disabled = false;
        zoomInBtn.classList.remove('is-disabled');
      }
    }
  }

  private attachEvents() {
    const copyStatus = this.container.querySelector<HTMLElement>('#copy-address-status');

    // Copy full address
    const copyBtn = this.container.querySelector<HTMLButtonElement>('#btn-copy-address');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        sound.playClick(800, 0.04);
        const fullAddress = 'Seasons 24 Banquet & Conventions, Pune - Ahmednagar Highway, Wagholi, Pune, Maharashtra 412207, India';
        navigator.clipboard.writeText(fullAddress).then(() => {
          if (copyStatus) {
            copyStatus.style.display = 'block';
            copyStatus.textContent = '[COPIED] Full address copied to clipboard!';
            setTimeout(() => {
              copyStatus.style.display = 'none';
            }, 4000);
          }
        });
      });
    }

    // Copy GPS coordinates
    const copyCoordsBtn = this.container.querySelector<HTMLButtonElement>('#btn-copy-coords');
    if (copyCoordsBtn) {
      copyCoordsBtn.addEventListener('click', () => {
        sound.playClick(850, 0.04);
        navigator.clipboard.writeText('18.5793, 73.9818').then(() => {
          if (copyStatus) {
            copyStatus.style.display = 'block';
            copyStatus.textContent = '[COPIED] GPS Coordinates (18.5793, 73.9818) copied to clipboard!';
            setTimeout(() => {
              copyStatus.style.display = 'none';
            }, 4000);
          }
        });
      });
    }

    // External Maps Click sound
    const mapLinks = this.container.querySelectorAll<HTMLAnchorElement>('#btn-open-maps, #btn-live-directions');
    mapLinks.forEach(link => {
      link.addEventListener('click', () => {
        sound.playClick(900, 0.04);
      });
    });

    // Tactical Zoom Controls
    const zoomInBtn = this.container.querySelector<HTMLButtonElement>('#ctrl-zoom-in');
    const zoomOutBtn = this.container.querySelector<HTMLButtonElement>('#ctrl-zoom-out');
    const zoomResetBtn = this.container.querySelector<HTMLButtonElement>('#ctrl-zoom-reset');

    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', () => {
        if (this.currentZoom < this.maxZoom) {
          this.currentZoom = Math.min(this.maxZoom, Number((this.currentZoom + this.zoomStep).toFixed(2)));
          sound.playClick(950, 0.02);
          this.applyZoom();
        }
      });
    }

    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', () => {
        if (this.currentZoom > this.minZoom) {
          this.currentZoom = Math.max(this.minZoom, Number((this.currentZoom - this.zoomStep).toFixed(2)));
          sound.playClick(650, 0.02);
          this.applyZoom();
        }
      });
    }

    if (zoomResetBtn) {
      zoomResetBtn.addEventListener('click', () => {
        this.currentZoom = 1.0;
        sound.playClick(750, 0.02);
        this.applyZoom();
      });
    }

    // Target reticle hover sound
    const targetCluster = this.container.querySelector('#venue-target-cluster');
    if (targetCluster) {
      targetCluster.addEventListener('mouseenter', () => {
        sound.playClick(1100, 0.015);
      });
    }
  }
}
