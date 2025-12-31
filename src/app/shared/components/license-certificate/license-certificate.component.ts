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
      min-height: 495px;
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
      inset: 12px;
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
      font-size: 12px;
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
      min-height: 495px;
      padding: 32px 48px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      box-sizing: border-box;
    }

    /* Header */
    .header-section {
      margin-bottom: 8px;
    }

    .pre-title {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 2px;
      color: #8b7355;
      margin: 0 0 4px 0;
    }

    .main-title {
      font-family: 'Playfair Display', serif;
      font-size: 28px;
      font-weight: 700;
      color: #2c2c2c;
      margin: 0;
    }

    .divider {
      width: 150px;
      height: 1px;
      background: linear-gradient(90deg, transparent, #c0a060, transparent);
      margin: 8px auto;
    }

    .sub-text {
      font-size: 11px;
      color: #666;
      font-style: italic;
      margin: 0;
    }

    /* Recipient */
    .recipient-name {
      font-family: 'Great Vibes', cursive;
      font-size: 42px;
      color: #8b6914;
      margin: 8px 0;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
    }

    /* Description */
    .description-text {
      font-size: 11px;
      line-height: 1.5;
      color: #555;
      margin: 0 0 12px 0;
      max-width: 450px;
    }

    /* Title */
    .title-section {
      margin-bottom: 16px;
    }

    .title-label {
      font-size: 10px;
      color: #666;
      margin: 0 0 2px 0;
    }

    .title-value {
      font-family: 'Playfair Display', serif;
      font-size: 22px;
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
      padding: 0 24px;
      gap: 10px;
    }

    .footer-block {
      flex: 1;
      min-width: 100px;
      text-align: center;
    }

    .signature-script {
      font-family: 'Great Vibes', cursive;
      font-size: 22px;
      color: #333;
      margin: 0;
      line-height: 1.2;
    }

    .footer-line {
      height: 1px;
      background: #aaa;
      margin: 4px 0;
    }

    .footer-label {
      font-size: 9px;
      font-weight: 600;
      color: #666;
      margin: 0;
    }

    .date-value {
      font-size: 14px;
      font-weight: 700;
      color: #333;
      margin: 0;
    }

    /* Seal */
    .gold-seal {
      width: 70px;
      height: 70px;
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
      font-size: 14px;
      line-height: 1;
    }

    .seal-text {
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.5px;
      line-height: 1;
    }

    .seal-sub {
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 1px;
      line-height: 1;
    }

    /* Bottom Info */
    .bottom-info {
      font-size: 8px;
      color: #999;
      margin: 12px 0 0 0;
    }

    /* Tablet and below */
    @media (max-width: 768px) {
      .certificate-content {
        padding: 28px 32px;
      }

      .main-title {
        font-size: 24px;
      }

      .recipient-name {
        font-size: 36px;
      }

      .title-value {
        font-size: 20px;
      }

      .footer-section {
        padding: 0 12px;
      }

      .footer-block {
        min-width: 80px;
      }

      .signature-script {
        font-size: 20px;
      }

      .gold-seal {
        width: 60px;
        height: 60px;
      }

      .seal-star {
        font-size: 12px;
      }

      .seal-text {
        font-size: 8px;
      }

      .seal-sub {
        font-size: 7px;
      }
    }

    /* Mobile */
    @media (max-width: 480px) {
      .certificate-container {
        border-radius: 4px;
        min-height: 450px;
      }

      .certificate-border {
        inset: 8px;
      }

      .certificate-content {
        padding: 20px 16px;
        min-height: 450px;
      }

      .pre-title {
        font-size: 7px;
        letter-spacing: 1.5px;
      }

      .main-title {
        font-size: 20px;
      }

      .divider {
        width: 100px;
      }

      .sub-text {
        font-size: 9px;
      }

      .recipient-name {
        font-size: 30px;
        margin: 6px 0;
      }

      .description-text {
        font-size: 9px;
        margin: 0 0 10px 0;
        max-width: 100%;
      }

      .title-section {
        margin-bottom: 12px;
      }

      .title-label {
        font-size: 8px;
      }

      .title-value {
        font-size: 16px;
      }

      .footer-section {
        padding: 0 8px;
        gap: 8px;
        flex-wrap: nowrap;
      }

      .footer-block {
        min-width: 70px;
        flex: 1;
      }

      .signature-script {
        font-size: 18px;
      }

      .footer-label {
        font-size: 7px;
      }

      .date-value {
        font-size: 12px;
      }

      .gold-seal {
        width: 50px;
        height: 50px;
        border-width: 2px;
      }

      .seal-star {
        font-size: 10px;
      }

      .seal-text {
        font-size: 7px;
      }

      .seal-sub {
        font-size: 6px;
      }

      .bottom-info {
        font-size: 7px;
        margin: 10px 0 0 0;
      }
    }

    /* Very small mobile */
    @media (max-width: 360px) {
      .certificate-content {
        padding: 16px 12px;
      }

      .main-title {
        font-size: 18px;
      }

      .recipient-name {
        font-size: 26px;
      }

      .title-value {
        font-size: 14px;
      }

      .footer-block {
        min-width: 60px;
      }

      .signature-script {
        font-size: 16px;
      }

      .date-value {
        font-size: 11px;
      }

      .gold-seal {
        width: 45px;
        height: 45px;
      }

      .bottom-info {
        font-size: 6px;
      }
    }
  `]
})
export class LicenseCertificateComponent {
  @Input() license: License | null = null;
}