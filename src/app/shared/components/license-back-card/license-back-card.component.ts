import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { License } from '../../../core/models/api/v1/license.model';

interface ColorTheme {
  primary: string;
  gradient: string;
  light: string;
}

@Component({
  selector: 'app-license-back-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="license-back-card" class="license-card back-theme">
      <div class="mag-stripe" [style.background]="theme.gradient"></div>

      <div class="card-content">
        
        <div class="col-left">
          
          <div class="section-block">
            <span class="section-label">Biometric Data</span>
            <div class="stat-grid">
              <div class="stat-row">
                <span class="icon">💔</span>
                <span class="label">Situationships</span>
                <span class="value">{{ license?.extras?.lcex_situationships_count || 0 }}</span>
              </div>
              <div class="stat-row">
                <span class="icon">📱</span>
                <span class="label">Dating Apps</span>
                <span class="value">{{ license?.extras?.lcex_dating_apps_count || 0 }}</span>
              </div>
              <div class="stat-row">
                <span class="icon">👻</span>
                <span class="label">Ghosted</span>
                <span class="value">{{ license?.extras?.lcex_ghosted_count || 0 }}</span>
              </div>
              <div class="stat-row">
                <span class="icon">🧘</span>
                <span class="label">Self-Focus</span>
                <span class="value">{{ license?.extras?.lcex_self_focus_count || 0 }}</span>
              </div>
            </div>
          </div>

          <div *ngIf="license?.extras?.lcex_bonus_titles?.length" class="section-block">
            <span class="section-label mb-1">Special Skills</span>
            <div class="skills-wrap">
              <span *ngFor="let title of license?.extras?.lcex_bonus_titles; let i = index"
                    class="skill-badge"
                    [ngClass]="getBadgeClass(i)">
                {{ title }}
              </span>
            </div>
          </div>
        </div>

        <div class="col-right">
          
          <div class="terms-box">
            <span class="section-label">Terms & Conditions</span>
            <p class="fine-print" style="font-size: 9px;">
              This license is non-transferable. Validity subject to annual review. 
              Holder must maintain certified single status. Detection of romantic 
              entanglement results in immediate revocation. Not liable for emotional 
              damages or situationships incurred. Use at your own risk.
            </p>
          </div>

          <div class="bottom-row">
            <div class="signature-area">
              <p class="sig-title">Authorized Signature</p>
              <div class="sig-script">Single Developer</div>
            </div>
            
            <div class="qr-box">
              <div class="qr-pattern" [style.background-image]="'radial-gradient(' + theme.primary + ' 40%, transparent 41%)'"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Great+Vibes&display=swap');

    /* --- CONTAINER (Strictly 420x264) --- */
    .license-card {
      font-family: 'Inter', sans-serif;
      width: 420px;
      height: 264px;
      border-radius: 12px;
      overflow: hidden; 
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      position: relative;
      display: flex;
      flex-direction: column;
      border: 1px solid #dee2e6;
      box-sizing: border-box;
    }

    .back-theme {
      background: linear-gradient(145deg, rgba(241, 243, 245, 0.95) 0%, rgba(241, 243, 245, 0.95) 100%),
                  url('/icons/Playful-Spongebob-Flower-Design-PNG-300x225.png');
      background-size: cover, cover;
      background-position: center, center;
      background-repeat: no-repeat, no-repeat;
      color: #343a40;
    }

    /* --- MAG STRIPE --- */
    .mag-stripe {
      width: 100%;
      height: 35px;
      margin-top: 12px; 
      margin-bottom: 8px;
    }

    /* --- LAYOUT GRID --- */
    .card-content {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1.3fr;
      gap: 12px;
      padding: 0 16px 12px 16px;
      overflow: hidden;
    }

    /* --- TEXT STYLES --- */
    .section-label {
      font-size: 7px;
      font-weight: 800;
      text-transform: uppercase;
      color: #868e96;
      border-bottom: 1px solid #dee2e6;
      padding-bottom: 0px;
      margin-bottom: 0px;
      margin-top: 0;
    }

    /* --- LEFT COLUMN (Stats) --- */
    .stat-grid {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .stat-row {
      display: flex;
      align-items: center;
      font-size: 9px;
      line-height: 1.4;
    }

    .stat-row .icon { width: 16px; text-align: center; margin-right: 4px; }
    .stat-row .label { flex: 1; font-weight: 600; color: #495057; }
    .stat-row .value { font-weight: 800; color: #212529; }

    /* --- SKILLS (Compact) --- */
    .mt-3 { margin-top: 8px !important; }
    .mb-1 { margin-bottom: 2px !important; }

    .skills-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 3px; 
    }

    .skill-badge {
      font-size: 8px;
      font-weight: 700;
      border: 1px solid rgba(0,0,0,0.1);
      padding: 1px 4px;
      border-radius: 4px;
      background: #fff;
      line-height: 1.2;
    }

    /* --- RIGHT COLUMN --- */
    .col-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .fine-print {
      font-size: 6.5px;
      line-height: 1.2;
      color: #868e96;
      text-align: justify;
      letter-spacing: 0.1px;
    }

    /* --- FOOTER (Sig & QR) --- */
    .bottom-row {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-top: auto;
      padding-top: 4px;
    }

    .sig-title {
      font-size: 5px;
      font-weight: 700;
      text-transform: uppercase;
      color: #adb5bd;
      margin-bottom: -4px;
    }

    .sig-script {
      font-family: 'Great Vibes', cursive;
      font-size: 16px;
      color: #212529;
    }

    .qr-box {
      width: 36px;
      height: 36px;
      background: #fff;
      padding: 2px;
      border-radius: 3px;
    }

    .qr-pattern {
      width: 100%;
      height: 100%;
      background-size: 4px 4px; 
    }

    /* --- COLORS --- */
    .text-pink-600 { color: #d63384; border-color: #fcc2d7; }
    .text-blue-600 { color: #0d6efd; border-color: #cff4fc; }
    .text-purple-600 { color: #6f42c1; border-color: #e0cffc; }
    .text-green-600 { color: #198754; border-color: #d1e7dd; }
    .text-orange-600 { color: #fd7e14; border-color: #ffe8cc; }
  `]
})
export class LicenseBackCardComponent implements OnChanges {
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

  getBadgeClass(index: number): string {
    const classes = [
      'text-pink-600',
      'text-blue-600',
      'text-purple-600',
      'text-green-600',
      'text-orange-600'
    ];
    return classes[index % classes.length];
  }
}