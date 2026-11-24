import confetti from 'canvas-confetti';
import { sound } from './audio';

export interface SocialBadgeConfig {
  name: string;
  role: string;
  track: string;
  location: string;
  photoUrl: string;
}

export const ROLE_PRESETS = [
  'Student',
  'Developer',
  'Cloud Architect',
  'DevOps Engineer',
  'AI/ML Builder',
  'Full-Stack Engineer'
];

export const TRACK_PRESETS = [
  'Cloud & DevOps Enthusiast',
  'Generative AI & LLM Builder',
  'Serverless Cloud Practitioner',
  'AWS Community Builder',
  'Distributed Systems Explorer'
];

export class PassGeneratorController {
  private container: HTMLElement;
  private config: SocialBadgeConfig = {
    name: 'Shivkumar Udas',
    role: 'Student',
    track: 'Cloud & DevOps Enthusiast',
    location: 'BSIOTR, PUNE',
    photoUrl: '/assets/clean-default-builder.jpg'
  };

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
  }

  private render() {
    this.container.innerHTML = `
      <div class="pass-generator-section-wrapper">
        <div class="section-meta-header">
          <span class="section-tag mono">
            <span class="badge-dot"></span> OFFICIAL BUILDER BADGE STUDIO
          </span>
          <h2 class="section-headline">
            Get Your Official <span class="gradient-text-purple">Attendee Badge.</span>
          </h2>
          <p class="section-sub">
            Personalize your official AWS Student Community Day 2026 social badge. Upload your own photo, customize your role and tech specialization, download in high resolution, and share directly to your LinkedIn network.
          </p>
        </div>

        <div class="pass-generator-grid">
          <!-- Left: Customizer Form & Quick Presets -->
          <div class="pass-controls-card">
            <div class="controls-card-header">
              <span class="ctrl-title">BADGE STUDIO // ATTENDEE CREDENTIALS</span>
              <span class="ctrl-badge">[PUNE 2026 EDITION]</span>
            </div>

            <form id="pass-customizer-form" class="customizer-form" onsubmit="return false;">
              <!-- 1. Builder Name -->
              <div class="form-field">
                <div class="field-label-row">
                  <label for="inp-attendee-name">BUILDER FULL NAME:</label>
                  <span class="field-counter" id="name-char-count">${this.config.name.length}/26</span>
                </div>
                <input 
                  type="text" 
                  id="inp-attendee-name" 
                  class="brutalist-input modern-input" 
                  value="${this.config.name}" 
                  placeholder="Shivkumar Udas"
                  maxlength="26" 
                  required>
                
                <!-- Quick Name Preset Pills -->
                <div class="quick-preset-row">
                  <span class="preset-label mono">PRESETS:</span>
                  <button type="button" class="btn-preset-chip" data-set-name="Shivkumar Udas">Shivkumar Udas</button>
                  <button type="button" class="btn-preset-chip" data-set-name="Tanmay Thakare">Tanmay Thakare</button>
                  <button type="button" class="btn-preset-chip" data-set-name="Cloud Architect">Cloud Architect</button>
                </div>
              </div>

              <!-- 2. Profile Photo Upload (User can upload own photo) -->
              <div class="form-field">
                <div class="field-label-row">
                  <label>ATTENDEE PHOTO / PROFILE PICTURE:</label>
                  <span class="field-info mono">[JPG, PNG, WEBP]</span>
                </div>
                <div class="photo-upload-controls-row">
                  <label for="inp-attendee-photo" class="btn-modern btn-photo-upload" tabindex="0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                    <span>UPLOAD YOUR PHOTO</span>
                  </label>
                  <input type="file" id="inp-attendee-photo" accept="image/*" style="display: none;" />
                  
                  <button type="button" class="btn-modern btn-glass-secondary" id="btn-reset-photo" title="Reset to default builder photo">
                    RESET PHOTO
                  </button>
                </div>
                <span class="field-hint mono">💡 Click to upload your photo or drag &amp; drop directly onto the badge frame!</span>
              </div>

              <!-- 3. Role / Persona (In place of BE IT: Student, Developer, etc.) -->
              <div class="form-field">
                <div class="field-label-row">
                  <label for="inp-attendee-role">ATTENDEE ROLE / PROFILE:</label>
                  <span class="field-info mono">[CHOOSE OR TYPE]</span>
                </div>
                <input 
                  type="text" 
                  id="inp-attendee-role" 
                  class="brutalist-input modern-input" 
                  value="${this.config.role}" 
                  placeholder="Student"
                  maxlength="24" 
                  required>

                <!-- Quick Role Preset Pills -->
                <div class="quick-preset-row">
                  <span class="preset-label mono">OPTIONS:</span>
                  ${ROLE_PRESETS.map(r => `
                    <button type="button" class="btn-preset-chip ${this.config.role === r ? 'is-active-preset' : ''}" data-set-role="${r}">
                      ${r}
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- 4. Specialization / Track -->
              <div class="form-field">
                <div class="field-label-row">
                  <label for="inp-attendee-track">TECH SPECIALIZATION / PASSION:</label>
                  <span class="field-counter" id="track-char-count">${this.config.track.length}/35</span>
                </div>
                <input 
                  type="text" 
                  id="inp-attendee-track" 
                  class="brutalist-input modern-input" 
                  value="${this.config.track}" 
                  placeholder="Cloud &amp; DevOps Enthusiast"
                  maxlength="35" 
                  required>

                <!-- Quick Track Presets -->
                <div class="quick-preset-row">
                  <span class="preset-label mono">TRACKS:</span>
                  <button type="button" class="btn-preset-chip" data-set-track="Cloud &amp; DevOps Enthusiast">Cloud &amp; DevOps</button>
                  <button type="button" class="btn-preset-chip" data-set-track="Generative AI &amp; LLM Builder">GenAI &amp; LLMs</button>
                  <button type="button" class="btn-preset-chip" data-set-track="Serverless Cloud Practitioner">Serverless</button>
                </div>
              </div>

              <!-- 5. Event Location Coordinates (Pune) -->
              <div class="form-field">
                <div class="field-label-row">
                  <label for="inp-attendee-location">LOCATION / HOST CAMPUS:</label>
                  <span class="field-info mono">[PUNE]</span>
                </div>
                <input 
                  type="text" 
                  id="inp-attendee-location" 
                  class="brutalist-input modern-input" 
                  value="${this.config.location}" 
                  placeholder="BSIOTR, PUNE"
                  maxlength="28" 
                  required>
              </div>

              <!-- Action Buttons Strip -->
              <div class="form-actions-strip">
                <button type="button" class="btn-modern btn-glow-purple w-full text-center" id="btn-download-pass-png">
                  <span>DOWNLOAD BADGE (HIGH-RES PNG)</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                </button>

                <button type="button" class="btn-modern btn-glow-linkedin w-full text-center" id="btn-share-linkedin">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>SHARE BADGE ON LINKEDIN</span>
                </button>
              </div>

              <div class="pass-legal-note">
                <strong>[OFFICIAL ATTENDEE BADGE SPECIFICATION]</strong> Designed for AWS Student Community Day Pune 2026. Perfect for LinkedIn, Instagram, and Discord profile avatars.
              </div>
            </form>
          </div>

          <!-- Right: Interactive Live Attendee Social Badge Preview -->
          <div class="pass-preview-stage" id="pass-preview-stage">
            <div class="social-badge-wrapper" id="social-badge-wrapper">
              <div class="social-badge-card" id="social-badge-card" title="Your official AWS SCD Pune 2026 attendee badge!">
                <!-- 1. The Attendee Photo (Clipped inside capsule slot behind the frame) -->
                <div class="badge-photo-slot" id="badge-photo-dropzone" title="Click or drag &amp; drop to change your photo!">
                  <img 
                    src="${this.config.photoUrl}" 
                    alt="Attendee Profile Picture" 
                    class="badge-photo-img" 
                    id="badge-photo-img" />
                  <div class="photo-drop-hint">
                    <span>📷 CHANGE PHOTO</span>
                  </div>
                </div>

                <!-- 2. Master Artwork Frame (AWS Logo, 'I'M ATTENDING', Sublockup, Concentric Rings, #AWSSCDPune Badge, Fort Skyline, Neon Bezel) -->
                <img src="/assets/official-badge-frame.png" class="badge-master-frame" alt="Official Badge Frame" />

                <!-- 3. Dynamic Name & Role Credentials (Pixel-perfect on top of cleared area) -->
                <div class="badge-live-identity">
                  <h3 class="live-attendee-name" id="badge-name-disp">${this.config.name}</h3>
                  <div class="live-role-row">
                    <span class="live-role-tag" id="badge-role-disp">${this.config.role}</span>
                    <span class="live-role-sep">|</span>
                    <span class="live-track-tag" id="badge-track-disp">${this.config.track}</span>
                  </div>
                  <div class="live-role-bar" id="badge-role-bar"></div>
                </div>
              </div>
            </div>

            <div class="pass-gyro-hint mono">
              <span>⚡ OFFICIAL 1:1 SOCIAL MEDIA ATTENDEE BADGE // READY FOR LINKEDIN &amp; INSTAGRAM</span>
            </div>

            <!-- Pass Download Confirmation Toast -->
            <div id="pass-claim-toast" class="pass-toast mono" style="display: none;">
              [SUCCESS] BADGE ISSUED TO ${this.config.name}!
            </div>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  private updateBadgeDisplay() {
    const nameDisp = this.container.querySelector('#badge-name-disp');
    const roleDisp = this.container.querySelector('#badge-role-disp');
    const trackDisp = this.container.querySelector('#badge-track-disp');
    const imgEl = this.container.querySelector<HTMLImageElement>('#badge-photo-img');
    const roleBar = this.container.querySelector<HTMLElement>('#badge-role-bar');

    if (nameDisp) nameDisp.textContent = this.config.name || 'Shivkumar Udas';
    if (roleDisp) roleDisp.textContent = this.config.role || 'Student';
    if (trackDisp) trackDisp.textContent = this.config.track || 'Cloud & DevOps Enthusiast';
    if (imgEl) imgEl.src = this.config.photoUrl;

    if (roleBar && roleDisp) {
      const w = (roleDisp as HTMLElement).offsetWidth;
      roleBar.style.width = `${Math.max(w, 42)}px`;
    }
  }

  private attachEvents() {
    // 1. Name Input
    const nameInp = this.container.querySelector<HTMLInputElement>('#inp-attendee-name');
    const nameCount = this.container.querySelector<HTMLElement>('#name-char-count');
    if (nameInp) {
      nameInp.addEventListener('input', () => {
        this.config.name = nameInp.value;
        if (nameCount) nameCount.textContent = `${nameInp.value.length}/26`;
        sound.playTypewriter(Math.random() * 200 + 400);
        this.updateBadgeDisplay();
      });
    }

    // Quick Name Presets
    this.container.querySelectorAll<HTMLButtonElement>('[data-set-name]').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-set-name');
        if (val && nameInp) {
          nameInp.value = val;
          this.config.name = val;
          if (nameCount) nameCount.textContent = `${val.length}/26`;
          sound.playSuccess();
          this.updateBadgeDisplay();
        }
      });
    });

    // 2. Role Input & Presets
    const roleInp = this.container.querySelector<HTMLInputElement>('#inp-attendee-role');
    if (roleInp) {
      roleInp.addEventListener('input', () => {
        this.config.role = roleInp.value;
        this.updateBadgeDisplay();
      });
    }

    this.container.querySelectorAll<HTMLButtonElement>('[data-set-role]').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-set-role');
        if (val && roleInp) {
          roleInp.value = val;
          this.config.role = val;
          this.container.querySelectorAll('[data-set-role]').forEach(b => b.classList.toggle('is-active-preset', b === btn));
          sound.playClick(720, 0.03);
          this.updateBadgeDisplay();
        }
      });
    });

    // 3. Track Input & Presets
    const trackInp = this.container.querySelector<HTMLInputElement>('#inp-attendee-track');
    const trackCount = this.container.querySelector<HTMLElement>('#track-char-count');
    if (trackInp) {
      trackInp.addEventListener('input', () => {
        this.config.track = trackInp.value;
        if (trackCount) trackCount.textContent = `${trackInp.value.length}/35`;
        this.updateBadgeDisplay();
      });
    }

    this.container.querySelectorAll<HTMLButtonElement>('[data-set-track]').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-set-track');
        if (val && trackInp) {
          trackInp.value = val;
          this.config.track = val;
          if (trackCount) trackCount.textContent = `${val.length}/35`;
          sound.playClick(760, 0.03);
          this.updateBadgeDisplay();
        }
      });
    });

    // 4. Location Input
    const locInp = this.container.querySelector<HTMLInputElement>('#inp-attendee-location');
    if (locInp) {
      locInp.addEventListener('input', () => {
        this.config.location = locInp.value;
        this.updateBadgeDisplay();
      });
    }

    // 5. Photo Upload File Input
    const photoInp = this.container.querySelector<HTMLInputElement>('#inp-attendee-photo');
    if (photoInp) {
      photoInp.addEventListener('change', () => {
        const file = photoInp.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const dataUrl = e.target?.result as string;
            this.config.photoUrl = dataUrl;
            this.updateBadgeDisplay();
            sound.playSuccess();
            const toast = this.container.querySelector<HTMLElement>('#pass-claim-toast');
            if (toast) {
              toast.textContent = `[PHOTO UPLOADED] ATTENDEE BADGE UPDATED!`;
              toast.style.display = 'block';
              setTimeout(() => { toast.style.display = 'none'; }, 3000);
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Reset Photo
    const resetPhotoBtn = this.container.querySelector<HTMLButtonElement>('#btn-reset-photo');
    if (resetPhotoBtn) {
      resetPhotoBtn.addEventListener('click', () => {
        this.config.photoUrl = '/assets/clean-default-builder.jpg';
        this.updateBadgeDisplay();
        sound.playClick(600, 0.03);
      });
    }

    // Drag and Drop Photo onto Badge Frame
    const dropzone = this.container.querySelector<HTMLElement>('#badge-photo-dropzone');
    if (dropzone && photoInp) {
      dropzone.addEventListener('click', () => {
        photoInp.click();
      });

      dropzone.addEventListener('dragover', (e: DragEvent) => {
        e.preventDefault();
        dropzone.classList.add('is-drag-over');
      });

      dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('is-drag-over');
      });

      dropzone.addEventListener('drop', (e: DragEvent) => {
        e.preventDefault();
        dropzone.classList.remove('is-drag-over');
        const file = e.dataTransfer?.files?.[0];
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            const dataUrl = ev.target?.result as string;
            this.config.photoUrl = dataUrl;
            this.updateBadgeDisplay();
            sound.playSuccess();
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // 6. Download Badge PNG button
    const dlBtn = this.container.querySelector<HTMLButtonElement>('#btn-download-pass-png');
    if (dlBtn) {
      dlBtn.addEventListener('click', () => {
        this.downloadSocialBadgePNG(true);
      });
    }

    // 7. Share Badge on LinkedIn button
    const shareBtn = this.container.querySelector<HTMLButtonElement>('#btn-share-linkedin');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        this.shareOnLinkedIn();
      });
    }
  }

  private shareOnLinkedIn() {
    sound.playSuccess();
    
    // 1. Download badge PNG automatically
    this.downloadSocialBadgePNG(false);

    // 2. Pre-compose LinkedIn post text and copy to clipboard
    const name = this.config.name || 'Shivkumar Udas';
    const role = this.config.role || 'Student';
    const track = this.config.track || 'Cloud & DevOps Enthusiast';
    const loc = this.config.location || 'BSIOTR, PUNE';
    
    const postText = `🚀 Proud to share my official Attendee Badge for AWS Student Community Day 2026 (Pune Builders Edition)!\n\n📅 Date: 27 December 2026\n📍 Location: ${loc}\n👤 Attendee: ${name} (${role} | ${track})\n\nLooking forward to 8 architecture keynotes, hands-on GenAI sessions, and connecting with 300+ student cloud builders!\n\nGrab your pass here: https://konfhub.com/aws-scd-pune-2026\n\n#AWSSCDPune #AWSCommunity #CloudBuilders #AWSStudentCommunityDay #PuneTech #AWS`;
    
    try {
      navigator.clipboard?.writeText(postText);
    } catch {
      // Fallback if clipboard fails
    }

    // 3. Trigger festive confetti
    confetti({
      particleCount: 110,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#0A66C2', '#9333EA', '#FF9900', '#00D8F6', '#FFFFFF']
    });

    // 4. Show toast notification
    const toast = this.container.querySelector<HTMLElement>('#pass-claim-toast');
    if (toast) {
      toast.textContent = `[LINKEDIN READY] Badge downloaded & LinkedIn share post copied! Attach your badge image directly to your post.`;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 6000);
    }

    // 5. Open LinkedIn Share Window
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://konfhub.com/aws-scd-pune-2026')}`;
    window.open(shareUrl, '_blank', 'width=650,height=620,scrollbars=yes,resizable=yes');
  }

  private downloadSocialBadgePNG(withCelebration = true) {
    if (withCelebration) {
      sound.playClick(950, 0.05);
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#9333EA', '#FF9900', '#06B6D4', '#10B981', '#FFFFFF']
      });
    }

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const name = this.config.name || 'Shivkumar Udas';
    const role = this.config.role || 'Student';
    const track = this.config.track || 'Cloud & DevOps Enthusiast';
    const photoUrl = this.config.photoUrl || '/assets/clean-default-builder.jpg';

    // 1. Dark base
    ctx.fillStyle = '#0A0D18';
    ctx.fillRect(0, 0, 1024, 1024);

    // 2. Load Attendee Photo & Master Frame
    const photoImg = new Image();
    photoImg.crossOrigin = 'anonymous';

    const frameImg = new Image();
    frameImg.crossOrigin = 'anonymous';

    const drawComposite = () => {
      // Draw Photo in capsule slot (X: 590, Y: 214, W: 360, H: 440, R: 42)
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(590, 214, 360, 440, 42);
      ctx.clip();
      try {
        ctx.drawImage(photoImg, 590, 214, 360, 440);
      } catch {
        ctx.fillStyle = '#111827';
        ctx.fillRect(590, 214, 360, 440);
      }
      ctx.restore();

      // Draw Master Frame overlay (contains exact neon bezel, AWS logo, text, fort, hashtag)
      try {
        ctx.drawImage(frameImg, 0, 0, 1024, 1024);
      } catch (err) {
        console.error('Frame draw error', err);
      }

      // Draw Attendee Name
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 44px sans-serif';
      ctx.fillText(name, 110, 715);

      // Draw Role | Track line
      ctx.fillStyle = '#C084FC';
      ctx.font = 'bold 22px sans-serif';
      const roleWidth = ctx.measureText(role).width;
      ctx.fillText(role, 110, 755);

      // Accent line under role
      ctx.fillStyle = '#9333EA';
      ctx.fillRect(110, 765, Math.max(roleWidth, 48), 3.5);

      ctx.fillStyle = '#64748B';
      ctx.fillText('|', 124 + roleWidth, 755);

      ctx.fillStyle = '#CBD5E1';
      ctx.font = '600 20px sans-serif';
      ctx.fillText(track, 140 + roleWidth, 755);

      this.triggerCanvasDownload(canvas, name);
    };

    let loaded = 0;
    const checkReady = () => {
      loaded++;
      if (loaded === 2) {
        drawComposite();
      }
    };

    photoImg.onload = checkReady;
    photoImg.onerror = checkReady;
    frameImg.onload = checkReady;
    frameImg.onerror = checkReady;

    photoImg.src = photoUrl;
    frameImg.src = '/assets/official-badge-frame.png';
  }

  private triggerCanvasDownload(canvas: HTMLCanvasElement, name: string) {
    const link = document.createElement('a');
    link.download = `AWS-SCD-2026-BADGE-${name.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
}
