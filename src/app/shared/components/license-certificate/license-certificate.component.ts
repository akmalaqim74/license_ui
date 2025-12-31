import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { License } from '../../../core/models/api/v1/license.model';

@Component({
  selector: 'app-license-certificate',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="license-certificate" class="certificate-container">
      <!-- Decorative Border -->
      <div class="certificate-border">
        <span class="corner-star top-left">★</span>
        <span class="corner-star top-right">★</span>
        <span class="corner-star bottom-left">★</span>
        <span class="corner-star bottom-right">★</span>
      </div>

      <!-- Content -->
      <div class="certificate-content">
        <!-- Header -->
        <div class="header-section">
          <p class="pre-title">DEPARTMENT OF SELF-PARTNERED AFFAIRS</p>
          <h1 class="main-title">Certificate of Single Status</h1>
          <div class="divider"></div>
          <p class="sub-text">This certificate is proudly awarded to</p>
        </div>

        <!-- Recipient Name -->
        <h2 class="recipient-name">{{ license?.lcns_name }}</h2>

        <!-- Description -->
        <p class="description-text">
          For demonstrating outstanding independence and commitment to self-partnership
          since <strong>{{ license?.lcns_single_since | date:'MMMM d, yyyy' }}</strong>.
        </p>

        <!-- Title Awarded -->
        <div class="title-section">
          <p class="title-label">Officially Awarded the Title of</p>
          <p class="title-value">"{{ license?.lcns_title }}"</p>
        </div>

        <!-- Footer -->
        <div class="footer-section">
          <!-- Signature -->
          <div class="footer-block">
            <p class="signature-script">S. Developer</p>
            <div class="footer-line"></div>
            <p class="footer-label">Director of Single Affairs</p>
          </div>

          <!-- Seal -->
          <div class="gold-seal">
            <span class="seal-star">★</span>
            <span class="seal-text">CERTIFIED</span>
            <span class="seal-sub">SINGLE</span>
          </div>

          <!-- Date -->
          <div class="footer-block">
            <p class="date-value">{{ license?.lcns_issued_at | date:'MM.dd.yyyy' }}</p>
            <div class="footer-line"></div>
            <p class="footer-label">Date of Issue</p>
          </div>
        </div>

        <!-- Bottom Info -->
        <p class="bottom-info">
          License #{{ license?.lcns_number }} • Valid until {{ license?.lcns_expires_at | date:'MM/dd/yyyy' }} • {{ license?.state?.stt_name }}, MY
        </p>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Great+Vibes&family=Lato:wght@400;700&display=swap');

    .certificate-container {
      font-family: 'Lato', sans-serif;
      width: 100%;
      max-width: 700px;
      aspect-ratio: 700 / 495;
      background-color: #fdfcf8;
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAADFJREFUGJWVzLEBADAEw/Cj+6Z4hA6hA2gENjAhcDEa0Yvj+4Hl4ECKAAs0nJ+i2R8oAHoGzQJUNvwAAAAASUVORK5CYII=');
      position: relative;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      border: 1px solid #e0d7c5;
      border-radius: 8px;
      overflow: hidden;
      margin: 0 auto;
    }

    /* Border */
    .certificate-border {
      position: absolute;
      inset: 1.7%;
      border: 2px solid #c0a060;
      pointer-events: none;
    }

    .certificate-border::before {
      content: '';
      position: absolute;
      inset: 4px;
      border: 1px solid #c0a060;
      opacity: 0.5;
    }

    .corner-star {
      position: absolute;
      font-size: clamp(10px, 1.7vw, 12px);
      color: #c0a060;
    }

    .top-left { top: -7px; left: -7px; }
    .top-right { top: -7px; right: -7px; }
    .bottom-left { bottom: -7px; left: -7px; }
    .bottom-right { bottom: -7px; right: -7px; }

    /* Content */
    .certificate-content {
      position: relative;
      z-index: 1;
      height: 100%;
      padding: 6.5% 6.8%;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      box-sizing: border-box;
    }

    /* Header */
    .header-section {
      margin-bottom: 1.6%;
    }

    .pre-title {
      font-size: clamp(7px, 1.3vw, 9px);
      font-weight: 700;
      letter-spacing: 2px;
      color: #8b7355;
      margin: 0 0 0.8% 0;
    }

    .main-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(20px, 4vw, 28px);
      font-weight: 700;
      color: #2c2c2c;
      margin: 0;
    }

    .divider {
      width: clamp(100px, 21.4%, 150px);
      height: 1px;
      background: linear-gradient(90deg, transparent, #c0a060, transparent);
      margin: 1.6% auto;
    }

    .sub-text {
      font-size: clamp(9px, 1.6vw, 11px);
      color: #666;
      font-style: italic;
      margin: 0;
    }

    /* Recipient */
    .recipient-name {
      font-family: 'Great Vibes', cursive;
      font-size: clamp(28px, 6vw, 42px);
      color: #8b6914;
      margin: 1.6% 0;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
    }

    /* Description */
    .description-text {
      font-size: clamp(9px, 1.6vw, 11px);
      line-height: 1.5;
      color: #555;
      margin: 0 0 2.4% 0;
      max-width: 90%;
      padding: 0 5%;
    }

    /* Title */
    .title-section {
      margin-bottom: 3.2%;
    }

    .title-label {
      font-size: clamp(8px, 1.4vw, 10px);
      color: #666;
      margin: 0 0 0.4% 0;
    }

    .title-value {
      font-family: 'Playfair Display', serif;
      font-size: clamp(16px, 3.1vw, 22px);
      font-weight: 700;
      color: #2c2c2c;
      margin: 0;
    }

    /* Footer */
    .footer-section {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: auto;
      padding: 0 3.4%;
      gap: 2%;
    }

    .footer-block {
      flex: 1;
      min-width: 0;
      text-align: center;
    }

    .signature-script {
      font-family: 'Great Vibes', cursive;
      font-size: clamp(16px, 3.1vw, 22px);
      color: #333;
      margin: 0;
      line-height: 1;
    }

    .footer-line {
      height: 1px;
      background: #aaa;
      margin: 0.8% 0;
    }

    .footer-label {
      font-size: clamp(7px, 1.3vw, 9px);
      font-weight: 600;
      color: #666;
      margin: 0;
    }

    .date-value {
      font-size: clamp(11px, 2vw, 14px);
      font-weight: 700;
      color: #333;
      margin: 0;
    }

    /* Seal */
    .gold-seal {
      width: clamp(50px, 10vw, 70px);
      height: clamp(50px, 10vw, 70px);
      flex-shrink: 0;
      border-radius: 50%;
      background: radial-gradient(ellipse at 30% 30%, #f5e6a3 0%, #d4af37 50%, #a67c00 100%);
      border: 3px solid #b8860b;
      box-shadow: 
        0 3px 6px rgba(0, 0, 0, 0.3),
        inset 0 1px 3px rgba(255, 255, 255, 0.3);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #5c4a1f;
    }

    .seal-star {
      font-size: clamp(10px, 2vw, 14px);
      line-height: 1;
    }

    .seal-text {
      font-size: clamp(7px, 1.3vw, 9px);
      font-weight: 800;
      letter-spacing: 0.5px;
      line-height: 1;
    }

    .seal-sub {
      font-size: clamp(6px, 1.1vw, 8px);
      font-weight: 700;
      letter-spacing: 1px;
      line-height: 1;
    }

    /* Bottom Info */
    .bottom-info {
      font-size: clamp(6px, 1.1vw, 8px);
      color: #999;
      margin: 2.4% 0 0 0;
      word-break: break-word;
    }

    /* Mobile optimizations */
    @media (max-width: 600px) {
      .certificate-container {
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .certificate-border {
        inset: 2%;
      }

      .description-text {
        max-width: 95%;
        padding: 0 2%;
      }

      .footer-section {
        gap: 1%;
      }

      .bottom-info {
        font-size: 7px;
        padding: 0 2%;
      }
    }

    /* Very small screens */
    @media (max-width: 400px) {
      .certificate-border {
        border-width: 1.5px;
      }

      .certificate-border::before {
        inset: 3px;
      }

      .gold-seal {
        border-width: 2px;
      }
    }
  `]
})
export class LicenseCertificateComponent {
  @Input() license: License | null = null;
}