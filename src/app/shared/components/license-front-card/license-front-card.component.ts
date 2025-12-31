import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { License } from '../../../core/models/api/v1/license.model';

interface ColorTheme {
  primary: string;
  gradient: string;
  light: string;
}

@Component({
  selector: 'app-license-front-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="license-front-card" class="license-card">
      <!-- Header -->
      <div class="license-header" [style.background]="theme.gradient">
        <svg xmlns="http://www.w3.org/2000/svg" class="header-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <div class="header-text pt-2">
          <div class="flex justify-between pb-2">
          <span class="header-title">OFFICIAL SINGLE LICENSE</span>
          <span class="class-value">{{ license?.lcns_title }}</span>
          
           
            </div>
             <span class="header-subtitle">Department of Self-Partnered Affairs</span>
          
          
        </div>
      </div>

      <!-- Body -->
      <div class="license-body mt-3">
        <!-- Photo Section -->
        <div class="photo-section">
          <div class="photo-frame" [style.border-color]="theme.primary">
            <img *ngIf="license?.lcns_photo_url" [src]="license.lcns_photo_url" alt="License Photo">
            <svg *ngIf="!license?.lcns_photo_url" xmlns="http://www.w3.org/2000/svg" class="photo-placeholder" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p class="license-number" [style.color]="theme.primary">{{ license?.lcns_number }}</p>
        </div>

        <!-- Info Section -->
        <div class="info-section">
          <p class="holder-name">{{ license?.lcns_name | uppercase }}</p>

          <div class="data-grid">
            <span class="data-label">State</span>
            <span class="data-value">{{ license?.state?.stt_name | uppercase }}, MY</span>

            <span class="data-label">Phase</span>
            <span class="data-value">{{ license?.phase?.phs_name | uppercase }}</span>

            <span class="data-label">Single Since</span>
            <span class="data-value">{{ license?.lcns_single_since | date:'MM/dd/yyyy' }}</span>

            <span class="data-label">Issued</span>
            <span class="data-value">{{ license?.lcns_issued_at | date:'MM/dd/yyyy' }}</span>

            <span class="data-label">Expires</span>
            <span class="data-value expires">{{ license?.lcns_expires_at | date:'MM/dd/yyyy' }}</span>
          </div>

          <!-- Signature -->
          <div class="signature-section">
            <p class="signature-name">{{ license?.lcns_name }}</p>
            <div class="signature-line" [style.border-color]="theme.primary"></div>
            <span class="signature-label">HOLDER'S SIGNATURE</span>
          </div>
        </div>

        <!-- Hologram -->
        <div class="hologram" [style.background]="'linear-gradient(135deg, ' + theme.light + ', rgba(255,255,255,0.6), ' + theme.light + ')'">
          <span [style.color]="theme.primary">★</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Great+Vibes&display=swap');

    .license-card {
      font-family: 'Inter', sans-serif;
      width: 420px;
      height: 264px;
      background: linear-gradient(145deg, rgba(248, 249, 250, 0.95) 0%, rgba(233, 236, 239, 0.9) 100%),
                  url('/icons/Playful-Spongebob-Flower-Design-PNG-300x225.png');
      background-size: cover, cover;
      background-position: center, center;
      background-repeat: no-repeat, no-repeat;
      border: 1px solid #dee2e6;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      position: relative;
    }

    /* Header */
    .license-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 16px;
      color: white;
    }

    .header-icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }

    .header-text {
      flex: 1;
      line-height: 1;
    }

    .header-title {
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 1px;
      margin: 0;
    }

    .header-subtitle {
      font-size: 9px;
      opacity: 0.85;
      letter-spacing: 0.5px;
      display: block;
      margin-top: 2px;
    }

    .header-class {
      text-align: right;
    }

    .class-label {
      display: block;
      font-size: 8px;
      opacity: 0.8;
      letter-spacing: 1px;
    }

    .class-value {
      font-size: 10px;
      font-weight: 700;
    }

    /* Body */
    .license-body {
      display: flex;
      gap: 16px;
      padding: 12px 16px;
      position: relative;
    }

    /* Photo */
    .photo-section {
      flex-shrink: 0;
    }

    .photo-frame {
      width: 90px;
      height: 110px;
      background: #e9ecef;
      border: 3px solid;
      border-radius: 6px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .photo-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .photo-placeholder {
      width: 50px;
      height: 50px;
      color: #adb5bd;
    }

    .license-number {
      font-size: 9px;
      font-weight: 700;
      text-align: center;
      margin-top: 4px;
      letter-spacing: 0.5px;
    }

    /* Info */
    .info-section {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .holder-name {
      font-size: 18px;
      font-weight: 800;
      color: #212529;
      margin: 0 0 6px 0;
      letter-spacing: 0.5px;
    }

    .data-grid {
      display: grid;
      grid-template-columns: 80px 1fr;
      gap: 1px 8px;
      line-height: 1.2;
    }

    .data-label {
      font-size: 9px;
      font-weight: 700;
      color: #6c757d;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .data-value {
      font-size: 11px;
      font-weight: 600;
      color: #212529;
    }

    .data-value.expires {
      color: #dc3545;
      font-weight: 700;
    }

    /* Signature */
    .signature-section {
      margin-top: auto;
      padding-top: 6px;
    }

    .signature-name {
      font-family: 'Great Vibes', cursive;
      font-size: 20px;
      color: #212529;
      margin: 0;
      line-height: 1;
    }

    .signature-line {
      border-top: 1px solid;
      margin-top: 2px;
    }

    .signature-label {
      font-size: 7px;
      font-weight: 600;
      color: #6c757d;
      letter-spacing: 1px;
    }

    /* Hologram */
    .hologram {
      position: absolute;
      right: 12px;
      bottom: 12px;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      animation: hologram-spin 10s linear infinite;
    }

    @keyframes hologram-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `]
})
export class LicenseFrontCardComponent implements OnChanges {
  @Input() license: License | null = null;

  theme: ColorTheme = {
    primary: '#007bff',
    gradient: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
    light: 'rgba(0, 123, 255, 0.3)'
  };

  // Color themes based on single duration
  private readonly colorThemes: Record<string, ColorTheme> = {
    'newly_released': {
      primary: '#28a745',
      gradient: 'linear-gradient(135deg, #28a745 0%, #1e7e34 100%)',
      light: 'rgba(40, 167, 69, 0.3)'
    },
    'junior_single': {
      primary: '#007bff',
      gradient: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
      light: 'rgba(0, 123, 255, 0.3)'
    },
    'certified_single': {
      primary: '#6f42c1',
      gradient: 'linear-gradient(135deg, #6f42c1 0%, #5a32a3 100%)',
      light: 'rgba(111, 66, 193, 0.3)'
    },
    'senior_single': {
      primary: '#fd7e14',
      gradient: 'linear-gradient(135deg, #fd7e14 0%, #e8590c 100%)',
      light: 'rgba(253, 126, 20, 0.3)'
    },
    'single_veteran': {
      primary: '#dc3545',
      gradient: 'linear-gradient(135deg, #dc3545 0%, #bd2130 100%)',
      light: 'rgba(220, 53, 69, 0.3)'
    },
    'legendary_album': {
      primary: '#d4af37',
      gradient: 'linear-gradient(135deg, #d4af37 0%, #b8960c 100%)',
      light: 'rgba(212, 175, 55, 0.3)'
    },
    'single_sage': {
      primary: '#1a1a2e',
      gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      light: 'rgba(26, 26, 46, 0.3)'
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['license'] && this.license) {
      this.setThemeByDuration();
    }
  }

  private setThemeByDuration(): void {
    if (!this.license?.lcns_single_since) {
      this.theme = this.colorThemes['junior_single'];
      return;
    }

    const singleSince = new Date(this.license.lcns_single_since);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - singleSince.getTime());
    const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30);

    if (diffMonths < 6) {
      this.theme = this.colorThemes['newly_released'];
    } else if (diffMonths < 12) {
      this.theme = this.colorThemes['junior_single'];
    } else if (diffMonths < 24) {
      this.theme = this.colorThemes['certified_single'];
    } else if (diffMonths < 36) {
      this.theme = this.colorThemes['senior_single'];
    } else if (diffMonths < 60) {
      this.theme = this.colorThemes['single_veteran'];
    } else if (diffMonths < 120) {
      this.theme = this.colorThemes['legendary_album'];
    } else {
      this.theme = this.colorThemes['single_sage'];
    }
  }
}