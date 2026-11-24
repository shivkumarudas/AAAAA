import { sound } from './audio';

export class BusTransitController {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
    this.bindEvents();
  }

  private render() {
    this.container.innerHTML = `
      <div class="transit-expressway-wrapper">
        <!-- Sleek PMPML City e-Bus Express Header -->
        <div class="pmpml-runway-header mono">
          <div class="pmpml-header-left">
            <div class="pmpml-header-title-row">
              <span class="pmpml-runway-badge">[PMPML CITY e-BUS EXPRESS]</span>
              <span class="pmpml-runway-title">PUNE-AHMEDNAGAR HIGHWAY (MH SH-27) RUNWAY</span>
            </div>
            <p class="pmpml-runway-sub">
              Direct AC Electric &amp; CNG buses from Pune Station &amp; Swargate ➔ Seasons 24 Stop, Wagholi &bull; Frequency: Every 8-10 Mins &bull; Routes: 158, 159, 165
            </p>
          </div>

          <div class="pmpml-header-right">
            <button class="btn-pmpml-horn" id="btn-pmpml-horn-runway" title="Honk Authentic PMPML Bus Horn">
              <span class="horn-icon">🔊</span>
              <span>HONK BUS HORN</span>
            </button>
          </div>
        </div>

        <!-- Transit Animation Stage (Ground Roadway Diorama) -->
        <div class="transit-stage bus-only-stage" id="bus-stage">
          <!-- Roadside Elements: Seasons 24 Bus Stop & Highway Milestone -->
          <div class="roadside-elements">
            <!-- Pune Highway Milestone (Yellow & White Stone) -->
            <div class="highway-milestone mono" title="Pune Highway Milestone">
              <div class="milestone-top">MH SH-27</div>
              <div class="milestone-body">
                <div class="ms-dest">WAGHOLI</div>
                <div class="ms-dist">0 KM</div>
                <div class="ms-venue">SEASONS 24</div>
              </div>
            </div>

            <!-- Seasons 24 Bus Shelter with Live Electronic Sign -->
            <div class="bus-shelter mono">
              <div class="shelter-roof">SEASONS 24 CONVENTIONS BUS STOP</div>
              <div class="shelter-screen">
                <span class="blip-bus">●</span>
                <span id="shelter-status-text">ROUTE 158 / 159 / 165 // DIRECT TRANSIT</span>
              </div>
              <div class="shelter-posts">
                <span class="post"></span><span class="post"></span>
              </div>
            </div>
          </div>

          <!-- 4-Lane Asphalt Road Surface with Dashed White Stripes -->
          <div class="highway-surface">
            <div class="road-shoulder"></div>
            <div class="road-lane-divider dashed-line"></div>
            <div class="road-lane-centerline solid-double"></div>
            <div class="road-lane-divider dashed-line"></div>
            <div class="road-curb"></div>
          </div>

          <!-- ANIMATED REALISTIC PMPML CITY EXPRESS BUS (Olectra Greentech Electric e-Bus) -->
          <div class="pmpml-bus-wrapper speed-normal" id="pmpml-bus-wrapper">
            <div class="pmpml-bus-object" id="pmpml-bus-object" title="Click to honk PMPML e-Bus horn!">
              <!-- Photorealistic High-Detail SVG PMPML Bus -->
              <svg class="pmpml-bus-svg" viewBox="0 0 420 145" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <!-- Authentic PMPML Emerald / Metallic Green Gradient -->
                  <linearGradient id="pmpmlRealGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#00A86B" />
                    <stop offset="35%" stop-color="#00875A" />
                    <stop offset="80%" stop-color="#006844" />
                    <stop offset="100%" stop-color="#004D32" />
                  </linearGradient>

                  <!-- Bus Pearl White Upper Chassis -->
                  <linearGradient id="pmpmlRealWhite" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#FFFFFF" />
                    <stop offset="50%" stop-color="#F4F7F9" />
                    <stop offset="100%" stop-color="#E2E8F0" />
                  </linearGradient>

                  <!-- Panoramic Tinted UV Bus Glass -->
                  <linearGradient id="pmpmlRealGlass" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#2D3748" />
                    <stop offset="30%" stop-color="#1A202C" />
                    <stop offset="80%" stop-color="#11161D" />
                    <stop offset="100%" stop-color="#1A202C" />
                  </linearGradient>

                  <!-- Projector Road Beam Projection -->
                  <linearGradient id="busRealHeadlightBeam" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="rgba(255, 245, 170, 0.95)" />
                    <stop offset="40%" stop-color="rgba(255, 230, 110, 0.45)" />
                    <stop offset="85%" stop-color="rgba(255, 230, 110, 0.1)" />
                    <stop offset="100%" stop-color="rgba(255, 230, 110, 0)" />
                  </linearGradient>
                </defs>

                <!-- Road Surface Headlight Beam Cone -->
                <polygon points="405,102 540,80 540,140 405,120" fill="url(#busRealHeadlightBeam)" class="vehicle-headlight-beam" />

                <!-- Aerodynamic Rooftop Lithium Battery & Climate HVAC Pod -->
                <g class="bus-roof-pod">
                  <rect x="90" y="8" width="220" height="15" rx="5" fill="#1A202C" stroke="#010101" stroke-width="1.8" />
                  <rect x="100" y="11" width="200" height="9" rx="3" fill="#00875A" class="bus-roof-accent" />
                  <!-- Cooling Ventilation Louvers -->
                  <line x1="120" y1="13" x2="120" y2="18" stroke="#FFFFFF" stroke-width="1.5" />
                  <line x1="125" y1="13" x2="125" y2="18" stroke="#FFFFFF" stroke-width="1.5" />
                  <line x1="130" y1="13" x2="130" y2="18" stroke="#FFFFFF" stroke-width="1.5" />
                  <text x="210" y="18" font-family="Space Mono, monospace" font-size="5.5" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">
                    PMPML e-BUS // ZERO EMISSION
                  </text>
                </g>

                <!-- Main Bus Body Frame -->
                <!-- Upper White Section -->
                <path d="M 18,22 L 370,22 Q 396,25 406,52 L 406,80 L 18,80 Z" fill="url(#pmpmlRealWhite)" stroke="#010101" stroke-width="2.5" class="bus-body-white" />
                <!-- Lower Emerald Green Section -->
                <path d="M 18,80 L 406,80 L 406,120 Q 402,125 388,125 L 18,125 Z" fill="url(#pmpmlRealGreen)" stroke="#010101" stroke-width="2.5" class="bus-body-green" />

                <!-- Dynamic Speed Sweep Graphic / Orange Accent Stripe -->
                <path d="M 18,76 L 390,76 Q 406,78 406,84 L 18,84 Z" fill="#FF9900" class="bus-body-stripe" />
                <path d="M 60,84 L 380,84 Q 400,86 406,94 L 406,90 L 60,84 Z" fill="#006844" opacity="0.4" />

                <!-- Electronic LED Destination Screen on Front Canopy -->
                <rect x="306" y="28" width="92" height="18" rx="3" fill="#010101" stroke="#010101" stroke-width="1.2" />
                <text x="352" y="38" font-family="Space Mono, monospace" font-size="6.5" font-weight="900" fill="#FFB703" text-anchor="middle" letter-spacing="0.4" id="bus-matrix-text-1">
                  १५८: पुणे स्टेशन ⇄ वाघोली
                </text>
                <text x="352" y="44" font-family="Space Mono, monospace" font-size="4.2" font-weight="800" fill="#00FF9D" text-anchor="middle" id="bus-matrix-text-2">
                  158: SEASONS 24 CONVENTIONS
                </text>

                <!-- Panoramic Windshield & Driver Cab -->
                <path d="M 312,48 L 392,48 Q 402,52 405,76 L 312,76 Z" fill="url(#pmpmlRealGlass)" stroke="#010101" stroke-width="2" />
                <!-- Windshield Wiper -->
                <line x1="320" y1="74" x2="338" y2="58" stroke="#010101" stroke-width="1.8" />
                <line x1="358" y1="74" x2="376" y2="58" stroke="#010101" stroke-width="1.8" />
                <!-- Steering Wheel & Driver Silhouette -->
                <circle cx="376" cy="65" r="5" fill="#1A202C" />
                <path d="M 380,67 L 392,72" stroke="#010101" stroke-width="2.5" />

                <!-- Aerodynamic Elephant-Ear Exterior Side Mirror -->
                <g class="bus-mirror" stroke="#010101" stroke-width="1.5">
                  <path d="M 398,54 L 412,48 L 412,64 L 402,62 Z" fill="#1A202C" />
                  <rect x="408" y="50" width="3" height="12" fill="#E2E8F0" />
                </g>

                <!-- Panoramic Tinted Side Passenger Windows -->
                <g fill="url(#pmpmlRealGlass)" stroke="#010101" stroke-width="1.8">
                  <rect x="28" y="32" width="48" height="42" rx="2" />
                  <circle cx="52" cy="54" r="5" fill="#010101" opacity="0.65" />
                  <rect x="80" y="32" width="52" height="42" rx="2" />
                  <circle cx="106" cy="54" r="5" fill="#010101" opacity="0.65" />
                  <rect x="136" y="32" width="52" height="42" rx="2" />
                  <circle cx="162" cy="54" r="5" fill="#010101" opacity="0.65" />
                  <rect x="192" y="32" width="52" height="42" rx="2" />
                  <circle cx="218" cy="54" r="5" fill="#010101" opacity="0.65" />
                </g>

                <!-- Passenger Entry & Exit Glider Doors (Full Height Glass Panes) -->
                <g class="bus-doors-assembly">
                  <rect x="248" y="30" width="44" height="90" fill="#E2E8F0" stroke="#010101" stroke-width="2.2" />
                  <line x1="270" y1="30" x2="270" y2="120" stroke="#010101" stroke-width="1.8" />
                  <rect x="253" y="36" width="14" height="38" rx="1.5" fill="url(#pmpmlRealGlass)" />
                  <rect x="273" y="36" width="14" height="38" rx="1.5" fill="url(#pmpmlRealGlass)" />
                  <rect x="253" y="80" width="14" height="32" rx="1.5" fill="url(#pmpmlRealGlass)" />
                  <rect x="273" y="80" width="14" height="32" rx="1.5" fill="url(#pmpmlRealGlass)" />
                  <line x1="260" y1="78" x2="260" y2="98" stroke="#E53E3E" stroke-width="2.2" />
                  <line x1="280" y1="78" x2="280" y2="98" stroke="#E53E3E" stroke-width="2.2" />
                </g>

                <!-- Official PMPML Municipal Crest & Typography -->
                <g transform="translate(148, 88)">
                  <rect x="0" y="0" width="94" height="26" rx="4" fill="#FFFFFF" stroke="#010101" stroke-width="1.5" />
                  <circle cx="14" cy="13" r="8.5" fill="#00875A" />
                  <circle cx="14" cy="13" r="6" fill="#D32F2F" />
                  <text x="14" y="16" font-family="Space Mono, monospace" font-size="6.5" font-weight="900" fill="#FFFFFF" text-anchor="middle">पु</text>
                  <text x="28" y="12" font-family="Space Mono, monospace" font-size="7.5" font-weight="900" fill="#010101">PMPML</text>
                  <text x="28" y="21" font-family="Space Mono, monospace" font-size="5" font-weight="800" fill="#00875A">पुणे ई-बस EXPRESS</text>
                </g>

                <!-- Twin Projector LED Headlamps in Black Housing -->
                <g class="bus-headlamp-cluster">
                  <rect x="398" y="94" width="8" height="18" rx="3" fill="#1A202C" stroke="#010101" stroke-width="1.2" />
                  <circle cx="402" cy="100" r="3.2" fill="#FFFFFF" class="vehicle-headlight-bulb" />
                  <circle cx="402" cy="108" r="2.5" fill="#FFD700" />
                  <rect x="400" y="86" width="5" height="4" rx="1" fill="#FF9900" />
                </g>

                <!-- Rear Vertical LED Taillamp Cluster -->
                <g class="bus-taillamp-cluster" stroke="#010101" stroke-width="0.8">
                  <rect x="15" y="85" width="5" height="10" rx="1" fill="#E53E3E" />
                  <rect x="15" y="97" width="5" height="6" rx="1" fill="#FF9900" />
                  <rect x="15" y="105" width="5" height="6" rx="1" fill="#FFFFFF" />
                </g>

                <!-- Wheel Assemblies with Michelin Rubber Tire & Alloy Rim -->
                <g class="bus-wheel-assembly wheel-rear">
                  <path d="M 64,124 A 24,24 0 0,1 120,124 Z" fill="#1A202C" />
                  <circle cx="92" cy="124" r="20" fill="#1A1C1E" stroke="#010101" stroke-width="2.5" />
                  <circle cx="92" cy="124" r="13" fill="#CBD5E0" stroke="#010101" stroke-width="1.8" />
                  <g class="wheel-spokes-animated" stroke="#010101" stroke-width="2.2">
                    <line x1="92" y1="113" x2="92" y2="135" />
                    <line x1="81" y1="124" x2="103" y2="124" />
                    <line x1="84" y1="116" x2="100" y2="132" />
                    <line x1="84" y1="132" x2="100" y2="116" />
                  </g>
                  <circle cx="92" cy="124" r="5" fill="#00875A" />
                </g>

                <g class="bus-wheel-assembly wheel-front">
                  <path d="M 314,124 A 24,24 0 0,1 370,124 Z" fill="#1A202C" />
                  <circle cx="342" cy="124" r="20" fill="#1A1C1E" stroke="#010101" stroke-width="2.5" />
                  <circle cx="342" cy="124" r="13" fill="#CBD5E0" stroke="#010101" stroke-width="1.8" />
                  <g class="wheel-spokes-animated" stroke="#010101" stroke-width="2.2">
                    <line x1="342" y1="113" x2="342" y2="135" />
                    <line x1="331" y1="124" x2="353" y2="124" />
                    <line x1="334" y1="116" x2="350" y2="132" />
                    <line x1="334" y1="132" x2="350" y2="116" />
                  </g>
                  <circle cx="342" cy="124" r="5" fill="#00875A" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private bindEvents() {
    const busEl = document.getElementById('pmpml-bus-object');
    const hornBtn = document.getElementById('btn-pmpml-horn-runway');

    // Click bus to honk dual-tone automotive horn with vibration
    busEl?.addEventListener('click', () => {
      sound.playBusHorn();
      busEl.classList.add('is-honking');
      setTimeout(() => busEl.classList.remove('is-honking'), 600);
    });

    // Horn button click
    hornBtn?.addEventListener('click', () => {
      sound.playBusHorn();
      busEl?.classList.add('is-honking');
      setTimeout(() => busEl?.classList.remove('is-honking'), 600);
    });
  }
}
