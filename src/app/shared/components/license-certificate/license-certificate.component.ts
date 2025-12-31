import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { License } from '../../../core/models/api/v1/license.model';

@Component({
  selector: 'app-license-certificate',
  standalone: true,
  imports: [CommonModule],
  template: `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Great+Vibes&family=Merriweather:ital,wght@0,400;1,400&display=swap');

      .prof-cert-container {
        font-family: 'Merriweather', serif;
        background-color: #fdfcf8;
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAADFJREFUGJWVzLEBADAEw/Cj+6Z4hA6hA2gENjAhcDEa0Yvj+4Hl4ECKAAs0nJ+i2R8oAHoGzQJUNvwAAAAASUVORK5CYII=');
        position: relative;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        border: 1px solid #e0d7c5;
      }

      .prof-cert-border {
        position: absolute;
        inset: 1rem;
        border: 1px solid #c0a060;
      }

      .prof-cert-border::before {
        content: '';
        position: absolute;
        inset: 4px;
        border: 1px solid #c0a060;
        opacity: 0.7;
      }
      
      .prof-cert-border::after {
        content: '★';
        position: absolute;
        top: -8px; left: -8px;
        font-size: 16px;
        color: #c0a060;
      }
      /* Add more corner stars if desired */

      .prof-gold-seal {
        width: 110px;
        height: 110px;
        border-radius: 50%;
        background: radial-gradient(ellipse at center, #F0E68C 0%, #B8860B 100%);
        border: 4px solid #DAA520;
        box-shadow: 1px 1px 4px rgba(0,0,0,0.4), inset 0 0 8px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        color: #8B4513;
        font-weight: 700;
      }
      .prof-gold-seal-text {
        font-family: 'Playfair Display', serif;
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;
      }
       /* Simple SVG circle text path - more complex SVG can be used for better effect */
      .prof-gold-seal-text svg {
        width: 100%;
        height: 100%;
      }

    </style>

    <div id="license-certificate" class="prof-cert-container rounded-lg" style="aspect-ratio: 1.414; max-width: 800px; width: 100%;">
      <div class="prof-cert-border"></div>
      <div class="relative z-10 h-full w-full p-12 flex flex-col items-center justify-between text-center text-gray-800">

        <!-- Header -->
        <div class="header-section">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900" style="font-family: 'Playfair Display', serif;">
            Certificate of Single Status
          </h1>
          <div class="w-64 h-px bg-gray-300 mx-auto my-3"></div>
          <p class="text-sm text-gray-600">This certificate is awarded to</p>
        </div>

        <!-- Recipient -->
        <div class="content-section my-4">
          <h2 class="text-6xl md:text-7xl text-[#a07e3e]" style="font-family: 'Great Vibes', cursive;">
            {{ license?.lcns_name }}
          </h2>
          <p class="text-base text-gray-600 mt-2">for demonstrating outstanding independence and commitment to self-partnership.</p>
        </div>

        <!-- Title Awarded -->
        <div class="my-4">
          <p class="text-sm text-gray-600">Officially Awarded the Title Of</p>
          <p class="text-3xl font-bold text-gray-800" style="font-family: 'Playfair Display', serif;">
            "{{ license?.lcns_title }}"
          </p>
        </div>
        
        <!-- Footer -->
        <div class="footer-section w-full flex justify-between items-end mt-8">
          
          <!-- Signature -->
          <div class="signature-area text-center w-1/3">
            <p class="text-3xl -mb-3 text-gray-800" style="font-family: 'Great Vibes', cursive;">S. Developer</p>
            <div class="w-full border-b border-gray-400"></div>
            <p class="text-xs font-semibold text-gray-700 mt-1">Single Developer</p>
            <p class="text-[10px] text-gray-500">Dept. of Self-Partnered Affairs</p>
          </div>

          <!-- Seal -->
          <div class="prof-gold-seal">
            <div class="prof-gold-seal-text">
                <svg viewBox="0 0 100 100">
                    <path id="circlePath" fill="none" d="M 10, 50 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"/>
                    <text font-size="10" font-weight="bold" fill="#8B4513">
                        <textPath href="#circlePath">★ CERTIFIED SINGLE ★ OFFICIAL</textPath>
                    </text>
                </svg>
            </div>
          </div>

          <!-- Date -->
          <div class="date-area text-center w-1/3">
            <p class="text-xl font-semibold text-gray-800" style="font-family: 'Merriweather', serif;">{{ license?.lcns_issued_at | date:'MM.dd.yyyy' }}</p>
            <div class="w-full border-b border-gray-400"></div>
            <p class="text-xs font-semibold text-gray-700 mt-1">Date of Issue</p>
          </div>

        </div>
      </div>
    </div>
  `,
})
export class LicenseCertificateComponent {
  @Input() license: License | null = null;
}
