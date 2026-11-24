import { sound } from './audio';

export class TransitController {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
    this.bindEvents();
  }

  private render() {
    this.container.innerHTML = `
      <div class="transit-expressway-wrapper">
        <!-- Sleek Pune Metro Aqua Line Header -->
        <div class="metro-runway-header mono">
          <div class="metro-header-left">
            <div class="metro-header-title-row">
              <span class="metro-runway-badge">[PUNE METRO AQUA LINE 2]</span>
              <span class="metro-runway-title">ELEVATED RAPID VIADUCT RUNWAY</span>
            </div>
            <p class="metro-runway-sub">
              Civil Court Interchange ➔ Ramwadi Terminal &bull; 12-min direct feeder to Seasons 24, Wagholi &bull; Frequency: Every 7 Mins
            </p>
          </div>

          <div class="metro-header-right">
            <button class="btn-metro-chime" id="btn-metro-chime-runway" title="Play Authentic Pune Metro 3-Note Chime">
              <span class="chime-icon">🔔</span>
              <span>PLAY METRO CHIME</span>
            </button>
          </div>
        </div>

        <!-- Transit Animation Stage (Elevated Viaduct Diorama) -->
        <div class="transit-stage metro-only-stage" id="transit-stage">
          <!-- Sky / Skyline Backdrop -->
          <div class="stage-skyline">
            <!-- Pune Western Ghats / Sinhagad & Modern Tech Skyline -->
            <svg class="skyline-svg" viewBox="0 0 1600 130" preserveAspectRatio="none">
              <defs>
                <linearGradient id="puneHillsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#4A5568" stop-opacity="0.15" />
                  <stop offset="100%" stop-color="#2D3748" stop-opacity="0.05" />
                </linearGradient>
              </defs>
              <!-- Mountain Silhouette -->
              <path d="M0,130 L0,85 Q120,40 280,68 T600,45 T920,75 T1240,38 T1600,65 L1600,130 Z" fill="url(#puneHillsGrad)" />
              <!-- Architectural Skyline (Modern Wagholi Tech Towers, Mutha River Bridges, Shaniwar Wada Gate Bastions) -->
              <path d="M40,130 L40,82 L70,82 L70,60 L95,60 L95,130 
                       M130,130 L130,45 L160,45 L160,130 
                       M200,130 L200,70 L240,70 L240,130 
                       M320,130 L320,52 L355,52 L355,34 L375,34 L375,130 
                       M470,130 L470,65 L510,65 L510,130 
                       M620,130 L620,42 L650,42 L650,130 
                       M760,130 L760,65 L810,65 L810,130 
                       M920,130 L920,48 L955,48 L955,28 L980,28 L980,130 
                       M1100,130 L1100,60 L1140,60 L1140,130 
                       M1260,130 L1260,42 L1295,42 L1295,130 
                       M1420,130 L1420,55 L1465,55 L1465,130" 
                    fill="none" stroke="rgba(1,1,1,0.18)" stroke-width="1.8" />
            </svg>
          </div>

          <!-- ELEVATED PUNE METRO VIADUCT -->
          <div class="metro-track-level" id="metro-level">
            <!-- Overhead Electric Catenary Wires & Masts -->
            <div class="catenary-wire"></div>
            <div class="catenary-wire-lower"></div>
            <div class="catenary-masts">
              <div class="mast"></div><div class="mast"></div><div class="mast"></div>
              <div class="mast"></div><div class="mast"></div><div class="mast"></div>
            </div>

            <!-- Elevated Concrete Viaduct Deck & Rail Tracks -->
            <div class="viaduct-rail-bed">
              <div class="steel-rail rail-top"></div>
              <div class="rail-ties"></div>
              <div class="steel-rail rail-bottom"></div>
            </div>

            <!-- ANIMATED REALISTIC PUNE METRO TRAIN (Titagarh Firema Trainset) -->
            <div class="metro-train-wrapper speed-normal" id="metro-train-wrapper">
              <div class="metro-train-object" id="metro-train-object" title="Click to hear Pune Metro chime!">
                <!-- Photorealistic High-Detail SVG Pune Metro Train -->
                <svg class="pune-metro-svg" viewBox="0 0 680 96" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <!-- Brushed Stainless Steel Metallic Carbody Gradients -->
                    <linearGradient id="metroSteelReflect" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#FFFFFF" />
                      <stop offset="12%" stop-color="#F0F3F7" />
                      <stop offset="30%" stop-color="#DCE2E9" />
                      <stop offset="55%" stop-color="#C5CDD7" />
                      <stop offset="78%" stop-color="#ACB7C4" />
                      <stop offset="100%" stop-color="#8F9CAE" />
                    </linearGradient>

                    <linearGradient id="metroNoseReflect" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stop-color="#DCE2E9" />
                      <stop offset="75%" stop-color="#F5F8FB" />
                      <stop offset="100%" stop-color="#CAD3DF" />
                    </linearGradient>

                    <!-- Continuous Privacy Tint Glass Ribbon -->
                    <linearGradient id="metroGlassRibbon" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#1E2832" />
                      <stop offset="25%" stop-color="#141B22" />
                      <stop offset="70%" stop-color="#0D1217" />
                      <stop offset="100%" stop-color="#18232C" />
                    </linearGradient>

                    <!-- Cabin Ambient Interior Lighting -->
                    <linearGradient id="metroInteriorGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#E1F5FE" />
                      <stop offset="100%" stop-color="#81D4FA" />
                    </linearGradient>

                    <!-- Dynamic Pune Metro Livery: Royal Purple, Cyan Aqua, Saffron Orange -->
                    <linearGradient id="metroAquaStripe" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stop-color="#00B4D8" />
                      <stop offset="45%" stop-color="#0096C7" />
                      <stop offset="70%" stop-color="#0077B6" />
                      <stop offset="100%" stop-color="#7B2CBF" />
                    </linearGradient>

                    <!-- Headlight High-Intensity Beam Projection -->
                    <linearGradient id="metroHeadlightBeam" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stop-color="rgba(255, 255, 255, 0.95)" />
                      <stop offset="20%" stop-color="rgba(0, 220, 255, 0.6)" />
                      <stop offset="60%" stop-color="rgba(0, 200, 255, 0.2)" />
                      <stop offset="100%" stop-color="rgba(0, 200, 255, 0)" />
                    </linearGradient>
                  </defs>

                  <!-- Projector Headlight Forward Light Cone -->
                  <polygon points="665,58 840,24 840,88 665,68" fill="url(#metroHeadlightBeam)" class="vehicle-headlight-beam" />

                  <!-- ============================================== -->
                  <!-- COACH 1: TRAILING COACH -->
                  <!-- ============================================== -->
                  <g class="metro-coach coach-1">
                    <!-- Aerodynamic Tapered Rear Tail -->
                    <path d="M 12,20 Q 4,45 12,72 L 200,72 L 200,20 Z" fill="url(#metroSteelReflect)" stroke="#010101" stroke-width="2" />
                    <!-- Roof Fairing -->
                    <rect x="20" y="16" width="180" height="5" fill="#718096" rx="2" />

                    <!-- Livery: Dynamic Swooping Pune Metro Stripe -->
                    <path d="M 10,48 L 200,48 L 200,58 L 10,58 Z" fill="url(#metroAquaStripe)" class="metro-livery-primary" />
                    <rect x="10" y="58" width="190" height="2.5" fill="#FF6B00" class="metro-livery-accent" />
                    <rect x="10" y="61" width="190" height="1" fill="#7B2CBF" />

                    <!-- Flush Window Band / Glass Frame -->
                    <rect x="26" y="26" width="170" height="20" fill="url(#metroGlassRibbon)" rx="2" />

                    <!-- Door 1 (Plug-Sliding Automatic Door with Operational LED) -->
                    <g class="metro-door-assembly">
                      <rect x="36" y="24" width="22" height="47" fill="#E2E8F0" stroke="#010101" stroke-width="1.5" />
                      <line x1="47" y1="24" x2="47" y2="71" stroke="#010101" stroke-width="1" />
                      <rect x="40" y="28" width="14" height="24" rx="1" fill="url(#metroInteriorGlow)" />
                      <!-- Door Safety Edge Warning & Status LED -->
                      <rect x="37" y="69" width="20" height="2" fill="#F1C40F" />
                      <circle cx="47" cy="22" r="1.5" fill="#00FF9D" />
                    </g>

                    <!-- Passenger Windows (Illuminated with Passenger Silhouettes) -->
                    <g class="metro-window-group">
                      <rect x="66" y="28" width="46" height="16" rx="2" fill="url(#metroInteriorGlow)" />
                      <circle cx="78" cy="37" r="4.5" fill="#1A202C" opacity="0.75" />
                      <circle cx="98" cy="37" r="4.5" fill="#1A202C" opacity="0.75" />
                    </g>

                    <!-- Door 2 -->
                    <g class="metro-door-assembly">
                      <rect x="120" y="24" width="22" height="47" fill="#E2E8F0" stroke="#010101" stroke-width="1.5" />
                      <line x1="131" y1="24" x2="131" y2="71" stroke="#010101" stroke-width="1" />
                      <rect x="124" y="28" width="14" height="24" rx="1" fill="url(#metroInteriorGlow)" />
                      <rect x="121" y="69" width="20" height="2" fill="#F1C40F" />
                      <circle cx="131" cy="22" r="1.5" fill="#00FF9D" />
                    </g>

                    <rect x="150" y="28" width="44" height="16" rx="2" fill="url(#metroInteriorGlow)" />
                    <circle cx="162" cy="37" r="4.5" fill="#1A202C" opacity="0.75" />
                    <circle cx="180" cy="37" r="4.5" fill="#1A202C" opacity="0.75" />

                    <!-- Heavy Bolsterless Bogies (Dual Axle Steel Wheels) -->
                    <g class="bogie-assembly" fill="#1A202C" stroke="#010101" stroke-width="1.5">
                      <rect x="34" y="70" width="48" height="8" rx="2" fill="#2D3748" />
                      <circle cx="44" cy="78" r="7" fill="#1A202C" />
                      <circle cx="44" cy="78" r="4" fill="#718096" />
                      <circle cx="72" cy="78" r="7" fill="#1A202C" />
                      <circle cx="72" cy="78" r="4" fill="#718096" />
                      <!-- Coil Spring Dampers -->
                      <rect x="55" y="72" width="6" height="5" fill="#CBD5E0" />

                      <rect x="146" y="70" width="48" height="8" rx="2" fill="#2D3748" />
                      <circle cx="156" cy="78" r="7" fill="#1A202C" />
                      <circle cx="156" cy="78" r="4" fill="#718096" />
                      <circle cx="184" cy="78" r="7" fill="#1A202C" />
                      <circle cx="184" cy="78" r="4" fill="#718096" />
                      <rect x="167" y="72" width="6" height="5" fill="#CBD5E0" />
                    </g>
                  </g>

                  <!-- Inter-Coach Gangway 1 (Flexible Bellows) -->
                  <rect x="200" y="24" width="16" height="47" fill="#1A202C" stroke="#010101" stroke-width="1.5" />
                  <line x1="204" y1="24" x2="204" y2="71" stroke="#4A5568" stroke-width="2" />
                  <line x1="208" y1="24" x2="208" y2="71" stroke="#718096" stroke-width="2" />
                  <line x1="212" y1="24" x2="212" y2="71" stroke="#4A5568" stroke-width="2" />

                  <!-- ============================================== -->
                  <!-- COACH 2: CENTER COACH WITH PANTOGRAPH -->
                  <!-- ============================================== -->
                  <g class="metro-coach coach-2">
                    <rect x="216" y="20" width="210" height="52" fill="url(#metroSteelReflect)" stroke="#010101" stroke-width="2" />
                    <rect x="226" y="16" width="190" height="5" fill="#718096" rx="2" />

                    <!-- Dynamic Pune Metro Livery -->
                    <rect x="216" y="48" width="210" height="10" fill="url(#metroAquaStripe)" class="metro-livery-primary" />
                    <rect x="216" y="58" width="210" height="2.5" fill="#FF6B00" class="metro-livery-accent" />
                    <rect x="216" y="61" width="210" height="1" fill="#7B2CBF" />

                    <!-- Pune Metro Official Circular Emblem on Coach Flank -->
                    <g transform="translate(230, 36)">
                      <circle cx="0" cy="0" r="7" fill="#FFFFFF" stroke="#010101" stroke-width="1.2" />
                      <circle cx="0" cy="0" r="5" fill="#7B2CBF" class="metro-logo-circle" />
                      <path d="M -3,-2 L 0,3 L 3,-2" stroke="#FFFFFF" stroke-width="1.5" fill="none" />
                      <text x="0" y="12" font-family="Space Mono, monospace" font-size="4.5" font-weight="900" fill="#010101" text-anchor="middle">PUNE METRO</text>
                    </g>

                    <!-- Flush Window Band -->
                    <rect x="246" y="26" width="170" height="20" fill="url(#metroGlassRibbon)" rx="2" />

                    <!-- Door 1 -->
                    <g class="metro-door-assembly">
                      <rect x="252" y="24" width="22" height="47" fill="#E2E8F0" stroke="#010101" stroke-width="1.5" />
                      <line x1="263" y1="24" x2="263" y2="71" stroke="#010101" stroke-width="1" />
                      <rect x="256" y="28" width="14" height="24" rx="1" fill="url(#metroInteriorGlow)" />
                      <rect x="253" y="69" width="20" height="2" fill="#F1C40F" />
                      <circle cx="263" cy="22" r="1.5" fill="#00FF9D" />
                    </g>

                    <!-- Passenger Windows -->
                    <rect x="282" y="28" width="46" height="16" rx="2" fill="url(#metroInteriorGlow)" />
                    <circle cx="294" cy="37" r="4.5" fill="#1A202C" opacity="0.75" />
                    <circle cx="314" cy="37" r="4.5" fill="#1A202C" opacity="0.75" />

                    <!-- Door 2 -->
                    <g class="metro-door-assembly">
                      <rect x="336" y="24" width="22" height="47" fill="#E2E8F0" stroke="#010101" stroke-width="1.5" />
                      <line x1="347" y1="24" x2="347" y2="71" stroke="#010101" stroke-width="1" />
                      <rect x="340" y="28" width="14" height="24" rx="1" fill="url(#metroInteriorGlow)" />
                      <rect x="337" y="69" width="20" height="2" fill="#F1C40F" />
                      <circle cx="347" cy="22" r="1.5" fill="#00FF9D" />
                    </g>

                    <rect x="366" y="28" width="44" height="16" rx="2" fill="url(#metroInteriorGlow)" />
                    <circle cx="378" cy="37" r="4.5" fill="#1A202C" opacity="0.75" />
                    <circle cx="396" cy="37" r="4.5" fill="#1A202C" opacity="0.75" />

                    <!-- Articulated High-Voltage Pantograph on Roof -->
                    <g class="pantograph-assembly" stroke="#010101" stroke-width="2" fill="none">
                      <!-- Insulator Base -->
                      <rect x="306" y="14" width="30" height="4" fill="#2D3748" stroke="#010101" stroke-width="1" />
                      <circle cx="312" cy="14" r="2.5" fill="#E53E3E" />
                      <circle cx="330" cy="14" r="2.5" fill="#E53E3E" />
                      <!-- Articulated Arms -->
                      <path d="M 312,14 L 322,2 L 332,14" />
                      <path d="M 322,2 L 336,-7 L 344,2" />
                      <!-- Carbon Contact Collector Bar -->
                      <line x1="328" y1="-7" x2="352" y2="-7" stroke="#E53E3E" stroke-width="2.5" />
                      <!-- Electric Spark Discharge Animation -->
                      <circle cx="340" cy="-7" r="3" fill="#00FFFF" class="pantograph-spark" />
                    </g>

                    <!-- Bogies -->
                    <g class="bogie-assembly" fill="#1A202C" stroke="#010101" stroke-width="1.5">
                      <rect x="238" y="70" width="48" height="8" rx="2" fill="#2D3748" />
                      <circle cx="248" cy="78" r="7" fill="#1A202C" />
                      <circle cx="248" cy="78" r="4" fill="#718096" />
                      <circle cx="276" cy="78" r="7" fill="#1A202C" />
                      <circle cx="276" cy="78" r="4" fill="#718096" />
                      <rect x="259" y="72" width="6" height="5" fill="#CBD5E0" />

                      <rect x="368" y="70" width="48" height="8" rx="2" fill="#2D3748" />
                      <circle cx="378" cy="78" r="7" fill="#1A202C" />
                      <circle cx="378" cy="78" r="4" fill="#718096" />
                      <circle cx="406" cy="78" r="7" fill="#1A202C" />
                      <circle cx="406" cy="78" r="4" fill="#718096" />
                      <rect x="389" y="72" width="6" height="5" fill="#CBD5E0" />
                    </g>
                  </g>

                  <!-- Inter-Coach Gangway 2 -->
                  <rect x="426" y="24" width="16" height="47" fill="#1A202C" stroke="#010101" stroke-width="1.5" />
                  <line x1="430" y1="24" x2="430" y2="71" stroke="#4A5568" stroke-width="2" />
                  <line x1="434" y1="24" x2="434" y2="71" stroke="#718096" stroke-width="2" />
                  <line x1="438" y1="24" x2="438" y2="71" stroke="#4A5568" stroke-width="2" />

                  <!-- ============================================== -->
                  <!-- COACH 3: LEADING CABIN (AERODYNAMIC ITALIAN WEDGE NOSE) -->
                  <!-- ============================================== -->
                  <g class="metro-coach coach-3">
                    <!-- Aerodynamic Front Wedge Carbody -->
                    <path d="M 442,20 L 630,20 Q 656,24 666,45 Q 673,58 665,68 Q 652,72 630,72 L 442,72 Z" 
                          fill="url(#metroNoseReflect)" stroke="#010101" stroke-width="2" />

                    <!-- Livery Band Wrapping Beautifully around Front Nose -->
                    <path d="M 442,48 L 632,48 Q 658,50 666,56 Q 658,62 632,62 L 442,62 Z" fill="url(#metroAquaStripe)" class="metro-livery-primary" />
                    <rect x="442" y="62" width="190" height="2.5" fill="#FF6B00" class="metro-livery-accent" />
                    <rect x="442" y="65" width="190" height="1" fill="#7B2CBF" />

                    <!-- Front Windshield Gloss Black Mask -->
                    <path d="M 624,24 L 644,26 Q 662,34 656,48 L 624,48 Z" fill="#0A1118" stroke="#010101" stroke-width="1.8" />
                    <!-- Driver's Windshield Safety Glass -->
                    <path d="M 627,27 L 642,29 Q 654,36 650,45 L 627,45 Z" fill="#3182CE" opacity="0.65" />
                    <!-- Windshield Wiper Arm -->
                    <line x1="632" y1="46" x2="646" y2="34" stroke="#010101" stroke-width="1.5" />
                    <!-- Driver Silhouette & Console -->
                    <circle cx="636" cy="38" r="4.2" fill="#1A202C" />
                    <rect x="642" y="42" width="7" height="4" fill="#00FF9D" opacity="0.8" />

                    <!-- LED Destination Matrix Screen (Electronic Dot Matrix) -->
                    <rect x="450" y="26" width="94" height="11" rx="2" fill="#010101" stroke="#010101" stroke-width="1.2" />
                    <text x="497" y="34" font-family="Space Mono, monospace" font-size="5.5" font-weight="900" fill="#00FF9D" text-anchor="middle" letter-spacing="0.4" id="metro-matrix-text">
                      वनाज ⇄ रामवाडी [AQUA LINE]
                    </text>

                    <!-- Pune Metro Official Front Crest -->
                    <g transform="translate(650, 52)">
                      <circle cx="0" cy="0" r="5" fill="#FFFFFF" stroke="#010101" stroke-width="1" />
                      <circle cx="0" cy="0" r="3.5" fill="#7B2CBF" class="metro-logo-circle" />
                      <path d="M -2,-1 L 0,2 L 2,-1" stroke="#FFFFFF" stroke-width="1" fill="none" />
                    </g>

                    <!-- High-Intensity Curved LED Headlamp Cluster & DRL Brows -->
                    <path d="M 658,54 Q 666,57 662,64" stroke="#00FFFF" stroke-width="1.8" fill="none" />
                    <circle cx="660" cy="58" r="3.2" fill="#FFFFFF" stroke="#010101" stroke-width="1" class="vehicle-headlight-bulb" />
                    <circle cx="656" cy="62" r="2.2" fill="#FFD700" />

                    <!-- Passenger Windows & Doors -->
                    <rect x="548" y="26" width="70" height="20" fill="url(#metroGlassRibbon)" rx="2" />

                    <!-- Door 1 -->
                    <g class="metro-door-assembly">
                      <rect x="446" y="24" width="22" height="47" fill="#E2E8F0" stroke="#010101" stroke-width="1.5" />
                      <line x1="457" y1="24" x2="457" y2="71" stroke="#010101" stroke-width="1" />
                      <rect x="450" y="28" width="14" height="24" rx="1" fill="url(#metroInteriorGlow)" />
                      <rect x="447" y="69" width="20" height="2" fill="#F1C40F" />
                      <circle cx="457" cy="22" r="1.5" fill="#00FF9D" />
                    </g>

                    <rect x="554" y="28" width="30" height="16" rx="2" fill="url(#metroInteriorGlow)" />
                    <circle cx="566" cy="37" r="4.5" fill="#1A202C" opacity="0.75" />

                    <!-- Door 2 -->
                    <g class="metro-door-assembly">
                      <rect x="590" y="24" width="22" height="47" fill="#E2E8F0" stroke="#010101" stroke-width="1.5" />
                      <line x1="601" y1="24" x2="601" y2="71" stroke="#010101" stroke-width="1" />
                      <rect x="594" y="28" width="14" height="24" rx="1" fill="url(#metroInteriorGlow)" />
                      <rect x="591" y="69" width="20" height="2" fill="#F1C40F" />
                      <circle cx="601" cy="22" r="1.5" fill="#00FF9D" />
                    </g>

                    <!-- Leading Bogie & Emergency Cowcatcher -->
                    <g class="bogie-assembly" fill="#1A202C" stroke="#010101" stroke-width="1.5">
                      <!-- Wedge Cowcatcher Pilot -->
                      <polygon points="636,75 660,75 656,71 636,71" fill="#718096" stroke="#010101" stroke-width="1.2" />

                      <rect x="466" y="70" width="48" height="8" rx="2" fill="#2D3748" />
                      <circle cx="476" cy="78" r="7" fill="#1A202C" />
                      <circle cx="476" cy="78" r="4" fill="#718096" />
                      <circle cx="504" cy="78" r="7" fill="#1A202C" />
                      <circle cx="504" cy="78" r="4" fill="#718096" />
                      <rect x="487" y="72" width="6" height="5" fill="#CBD5E0" />

                      <rect x="584" y="70" width="48" height="8" rx="2" fill="#2D3748" />
                      <circle cx="594" cy="78" r="7" fill="#1A202C" />
                      <circle cx="594" cy="78" r="4" fill="#718096" />
                      <circle cx="622" cy="78" r="7" fill="#1A202C" />
                      <circle cx="622" cy="78" r="4" fill="#718096" />
                      <rect x="605" y="72" width="6" height="5" fill="#CBD5E0" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            <!-- Elevated Viaduct Concrete Piers -->
            <div class="viaduct-pillars">
              <div class="pier"><div class="pier-cap"></div><div class="pier-column"></div></div>
              <div class="pier"><div class="pier-cap"></div><div class="pier-column"></div></div>
              <div class="pier"><div class="pier-cap"></div><div class="pier-column"></div></div>
              <div class="pier"><div class="pier-cap"></div><div class="pier-column"></div></div>
              <div class="pier"><div class="pier-cap"></div><div class="pier-column"></div></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private bindEvents() {
    const metroEl = document.getElementById('metro-train-object');
    const chimeBtn = document.getElementById('btn-metro-chime-runway');

    // Click train to trigger authentic 3-note Pune Metro chime & signaling glow
    metroEl?.addEventListener('click', () => {
      sound.playMetroChime();
      metroEl.classList.add('is-signaling');
      setTimeout(() => metroEl.classList.remove('is-signaling'), 1200);
    });

    // Header chime button
    chimeBtn?.addEventListener('click', () => {
      sound.playMetroChime();
      metroEl?.classList.add('is-signaling');
      setTimeout(() => metroEl?.classList.remove('is-signaling'), 1200);
    });
  }
}
