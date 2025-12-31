import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LicenseService } from '../../core/services/api/v1/license.service';
import { License } from '../../core/models/api/v1/license.model';
import { LicenseFrontCardComponent } from '../../shared/components/license-front-card/license-front-card.component';
import { LicenseBackCardComponent } from '../../shared/components/license-back-card/license-back-card.component';
import { LicenseCertificateComponent } from '../../shared/components/license-certificate/license-certificate.component';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-view-license',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LicenseFrontCardComponent,
    LicenseBackCardComponent,
    LicenseCertificateComponent
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-[#87CEEB] via-[#00BCD4] to-[#4FC3F7] py-12 px-4 relative overflow-hidden" style="background-image: url('/icons/Playful-Spongebob-Flower-Design-PNG-300x225.png');">
      <!-- Bubble decorations -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="bubble" style="left: 5%; animation-delay: 0s;"></div>
        <div class="bubble" style="left: 15%; animation-delay: 2s;"></div>
        <div class="bubble" style="left: 25%; animation-delay: 4s;"></div>
        <div class="bubble" style="left: 35%; animation-delay: 1s;"></div>
        <div class="bubble" style="left: 45%; animation-delay: 3s;"></div>
        <div class="bubble" style="left: 55%; animation-delay: 5s;"></div>
        <div class="bubble" style="left: 65%; animation-delay: 2.5s;"></div>
        <div class="bubble" style="left: 75%; animation-delay: 4.5s;"></div>
        <div class="bubble" style="left: 85%; animation-delay: 1.5s;"></div>
        <div class="bubble" style="left: 95%; animation-delay: 3.5s;"></div>
      </div>

      <div class="container mx-auto max-w-6xl relative z-10">
        <!-- Loading State -->
        <div *ngIf="loading" class="text-center py-20">
          <div class="text-6xl mb-6 animate-bounce">🧽✨</div>
          <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-400 mx-auto"></div>
          <p class="mt-4 text-white font-bold text-2xl">Getting your license ready...</p>
        </div>

        <!-- Not Found State -->
        <div *ngIf="!loading && !license" class="text-center py-20">
          <div class="text-8xl mb-6 animate-bounce">😱</div>
          <h2 class="text-5xl font-black mb-6 text-yellow-300" style="text-shadow: 3px 3px 0px #FF1493;">Tartar Sauce!</h2>
          <p class="text-2xl text-white font-bold mb-8">We can't find that license anywhere!</p>
          <button
            (click)="goHome()"
            class="px-10 py-4 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 rounded-full text-2xl font-black text-blue-900 hover:scale-110 transition-transform shadow-2xl border-4 border-yellow-600">
            🏠 Go Home
          </button>
        </div>

        <!-- License Display -->
        <div *ngIf="!loading && license" class="space-y-8" >
          <!-- Header -->
          <div class="text-center">
            <h1 class="text-5xl md:text-6xl font-black mb-4 text-yellow-300" style="text-shadow: 3px 3px 0px #FF1493, 6px 6px 0px #00BCD4;">
              Your Official Single License!
            </h1>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap justify-center gap-4">
            <button
              (click)="downloadCard('license-front-card', 'single-license-front.png')"
              class="px-6 py-3 bg-pink-400 border-4 border-pink-600 rounded-full text-white font-black hover:scale-110 hover:rotate-3 transition-all shadow-xl">
              📥 Front Card
            </button>
            <button
              (click)="downloadCard('license-back-card', 'single-license-back.png')"
              class="px-6 py-3 bg-pink-400 border-4 border-pink-600 rounded-full text-white font-black hover:scale-110 hover:rotate-3 transition-all shadow-xl">
              📥 Back Card
            </button>
            <button
              (click)="downloadCard('license-certificate', 'single-license-certificate.png')"
              class="px-6 py-3 bg-pink-400 border-4 border-pink-600 rounded-full text-white font-black hover:scale-110 hover:rotate-3 transition-all shadow-xl">
              📥 Certificate
            </button>
            <button
              (click)="downloadAll()"
              [disabled]="downloadingAll"
              class="px-6 py-3 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 rounded-full text-white font-black hover:scale-110 transition-all shadow-xl border-4 border-purple-700 disabled:opacity-50">
              <span *ngIf="!downloadingAll">📥 Download All</span>
              <span *ngIf="downloadingAll">⏳ Downloading...</span>
            </button>
            <button
              (click)="shareLink()"
              class="px-6 py-3 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full text-white font-black hover:scale-110 transition-all shadow-xl border-4 border-green-700">
              🔗 Share It!
            </button>
            <button
              (click)="toggleUpdateStatsModal()"
              class="px-6 py-3 bg-yellow-400 border-4 border-yellow-600 rounded-full text-blue-900 font-black hover:scale-110 transition-all shadow-xl">
              📊 Update Stats
            </button>
          </div>

          <!-- Success Message -->
          <div *ngIf="successMessage" class="bg-green-300 border-4 border-green-500 rounded-3xl p-6 text-center max-w-md mx-auto shadow-2xl animate-bounce">
            <p class="text-green-800 font-black text-2xl">🎉 {{ successMessage }}</p>
          </div>

          <!-- Cards Display -->
          <div class="space-y-8 md:space-y-12">
            <!-- Flippable Card Container -->
            <div class="flex justify-center">
              <div class="flip-card-container" (click)="flipCard()">
                <div class="flip-card" [class.flipped]="isFlipped">
                  <div class="flip-card-front">
                    <app-license-front-card [license]="license"></app-license-front-card>
                  </div>
                  <div class="flip-card-back">
                    <app-license-back-card [license]="license"></app-license-back-card>
                  </div>
                </div>
              </div>
            </div>

            <!-- Flip Instruction -->
            <div class="text-center">
              <p class="text-xl font-bold text-yellow-300 animate-pulse">👆 Click the card to flip it!</p>
            </div>

            <!-- Certificate -->
            <div class="flex justify-center">
              <app-license-certificate [license]="license"></app-license-certificate>
            </div>

            <!-- Hidden container for "Download All" feature -->
            <div id="all-cards-container" class="hidden-download-container">
              <div class="download-all-layout">
                <div class="download-card-item" id="download-front">
                  <app-license-front-card [license]="license"></app-license-front-card>
                </div>
                <div class="download-card-item" id="download-back">
                  <app-license-back-card [license]="license"></app-license-back-card>
                </div>
                <div class="download-certificate-item" id="download-cert">
                  <app-license-certificate [license]="license"></app-license-certificate>
                </div>
              </div>
            </div>
          </div>

          <!-- Update Stats Modal -->
          <div *ngIf="showUpdateStatsModal" class="fixed inset-0 bg-blue-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4" (click)="toggleUpdateStatsModal()">
            <div class="bg-pink-300 rounded-3xl p-6 md:p-8 max-w-md w-full border-4 border-pink-500 shadow-2xl" (click)="$event.stopPropagation()">
              <h2 class="text-3xl font-black mb-6 text-blue-900">📊 Update Your Stats!</h2>

              <form [formGroup]="statsForm" (ngSubmit)="updateStats()">
                <div class="space-y-4 mb-6">
                  <div>
                    <label class="block text-lg font-bold mb-2 text-blue-900">💔 Situationships</label>
                    <input
                      type="number"
                      formControlName="situationships_count"
                      min="0"
                      max="20"
                      class="w-full px-4 py-3 bg-white border-4 border-pink-400 rounded-2xl focus:outline-none focus:border-yellow-500 text-blue-900 font-semibold text-lg">
                  </div>

                  <div>
                    <label class="block text-lg font-bold mb-2 text-blue-900">📱 Dating Apps</label>
                    <input
                      type="number"
                      formControlName="dating_apps_count"
                      min="0"
                      max="10"
                      class="w-full px-4 py-3 bg-white border-4 border-pink-400 rounded-2xl focus:outline-none focus:border-yellow-500 text-blue-900 font-semibold text-lg">
                  </div>

                  <div>
                    <label class="block text-lg font-bold mb-2 text-blue-900">👻 Ghosted Count</label>
                    <input
                      type="number"
                      formControlName="ghosted_count"
                      min="0"
                      max="20"
                      class="w-full px-4 py-3 bg-white border-4 border-pink-400 rounded-2xl focus:outline-none focus:border-yellow-500 text-blue-900 font-semibold text-lg">
                  </div>

                  <div>
                    <label class="block text-lg font-bold mb-2 text-blue-900">🧘 Self-Focus</label>
                    <input
                      type="number"
                      formControlName="self_focus_count"
                      min="0"
                      max="50"
                      class="w-full px-4 py-3 bg-white border-4 border-pink-400 rounded-2xl focus:outline-none focus:border-yellow-500 text-blue-900 font-semibold text-lg">
                  </div>
                </div>

                <div *ngIf="errorMessage" class="bg-red-400 border-4 border-red-600 rounded-3xl p-4 mb-4 shadow-xl">
                  <p class="text-white font-bold text-lg">😱 {{ errorMessage }}</p>
                </div>

                <div class="flex gap-4">
                  <button
                    type="button"
                    (click)="toggleUpdateStatsModal()"
                    class="flex-1 px-4 py-3 bg-white border-4 border-blue-400 rounded-full font-black text-blue-900 hover:scale-105 transition-transform">
                    ❌ Cancel
                  </button>
                  <button
                    type="submit"
                    [disabled]="updatingStats"
                    class="flex-1 px-4 py-3 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full border-4 border-green-700 font-black text-white hover:scale-105 transition-transform disabled:opacity-50">
                    <span *ngIf="!updatingStats">✅ Update!</span>
                    <span *ngIf="updatingStats">⏳ Updating...</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes float-up {
      0% {
        transform: translateY(100vh) scale(0);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) scale(1);
        opacity: 0;
      }
    }

    .bubble {
      position: absolute;
      bottom: -100px;
      width: 40px;
      height: 40px;
      background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3));
      border-radius: 50%;
      animation: float-up 15s infinite ease-in;
      box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.5);
    }

    .bubble:nth-child(2) {
      width: 60px;
      height: 60px;
      animation-duration: 18s;
    }

    .bubble:nth-child(3) {
      width: 30px;
      height: 30px;
      animation-duration: 12s;
    }

    .bubble:nth-child(4) {
      width: 50px;
      height: 50px;
      animation-duration: 20s;
    }

    .bubble:nth-child(5) {
      width: 35px;
      height: 35px;
      animation-duration: 16s;
    }

    .bubble:nth-child(6) {
      width: 45px;
      height: 45px;
      animation-duration: 14s;
    }

    .bubble:nth-child(7) {
      width: 55px;
      height: 55px;
      animation-duration: 19s;
    }

    .bubble:nth-child(8) {
      width: 38px;
      height: 38px;
      animation-duration: 17s;
    }

    .bubble:nth-child(9) {
      width: 48px;
      height: 48px;
      animation-duration: 21s;
    }

    .bubble:nth-child(10) {
      width: 42px;
      height: 42px;
      animation-duration: 13s;
    }

    .flip-card-container {
      perspective: 1500px;
      cursor: pointer;
      display: inline-block;
      width: 100%;
      max-width: 420px;
    }

    .flip-card {
      position: relative;
      width: 100%;
      aspect-ratio: 420 / 264;
      max-width: 420px;
      max-height: 264px;
      transition: transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1);
      transform-style: preserve-3d;
    }

    .flip-card.flipped {
      transform: rotateY(180deg);
    }

    @media (max-width: 480px) {
      .flip-card-container {
        max-width: 340px;
      }
    }

    .flip-card-front,
    .flip-card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      overflow: hidden;
      border-radius: 12px;
    }

    .flip-card-back {
      transform: rotateY(180deg);
    }

    .flip-card-container:hover .flip-card {
      transform: scale(1.02);
    }

    .flip-card-container:hover .flip-card.flipped {
      transform: rotateY(180deg) scale(1.02);
    }

    /* Hidden container for download all */
    .hidden-download-container {
      position: fixed;
      left: -9999px;
      top: -9999px;
      width: 1200px;
    }

    .download-all-layout {
      background: #FFFFFF;
      padding: 40px;
      display: flex;
      flex-direction: column;
      gap: 40px;
      align-items: center;
    }

    .download-card-item {
      width: 420px;
      height: 264px;
    }

    .download-certificate-item {
      width: 800px;
    }
  `]
})
export class ViewLicenseComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private licenseService = inject(LicenseService);
  private fb = inject(FormBuilder);

  license: License | null = null;
  loading = true;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  showUpdateStatsModal = false;
  updatingStats = false;
  isFlipped = false;
  downloadingAll = false;

  statsForm: FormGroup;

  constructor() {
    this.statsForm = this.fb.group({
      situationships_count: [0],
      dating_apps_count: [0],
      ghosted_count: [0],
      self_focus_count: [0]
    });
  }

  ngOnInit(): void {
    const licenseNumber = this.route.snapshot.paramMap.get('licenseNumber');
    if (licenseNumber) {
      this.loadLicense(licenseNumber);
    } else {
      this.loading = false;
    }
  }

  loadLicense(licenseNumber: string): void {
    this.loading = true;
    this.licenseService.getLicense(licenseNumber).subscribe({
      next: (response) => {
        if (response.success && response.responseObject) {
          this.license = response.responseObject;

          // Pre-fill stats form if extras exist
          if (this.license.extras) {
            this.statsForm.patchValue({
              situationships_count: this.license.extras.lcex_situationships_count,
              dating_apps_count: this.license.extras.lcex_dating_apps_count,
              ghosted_count: this.license.extras.lcex_ghosted_count,
              self_focus_count: this.license.extras.lcex_self_focus_count
            });
          }
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading license:', error);
        this.license = null;
        this.loading = false;
      }
    });
  }

  async downloadCard(elementId: string, filename: string): Promise<void> {
    const element = document.getElementById(elementId);
    if (element) {
      try {
        const canvas = await html2canvas(element, {
          scale: 2,
          backgroundColor: '#FFFFFF',
          useCORS: true,
          allowTaint: true,
          logging: false,
        });
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png');
        link.click();

        this.showSuccessMessage('Downloaded successfully!');
      } catch (error) {
        console.error('Error downloading card:', error);
        this.errorMessage = 'Failed to download. Please try again.';
      }
    }
  }

  async downloadAll(): Promise<void> {
    this.downloadingAll = true;
    try {
      const container = document.getElementById('all-cards-container');
      if (container) {
        const canvas = await html2canvas(container, {
          scale: 2,
          backgroundColor: '#FFFFFF',
          useCORS: true,
          allowTaint: true,
          logging: false,
          width: 1200,
          height: 1600,
        });
        const link = document.createElement('a');
        link.download = 'single-license-complete.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        this.showSuccessMessage('All cards downloaded successfully!');
      }
    } catch (error) {
      console.error('Error downloading all cards:', error);
      this.errorMessage = 'Failed to download all cards. Please try again.';
    } finally {
      this.downloadingAll = false;
    }
  }

  async shareLink(): Promise<void> {
    const url = window.location.href;

    // Try Web Share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Single License',
          text: 'Check out my official Single License!',
          url: url
        });
        return;
      } catch (error) {
        // Fallback to clipboard
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      this.showSuccessMessage('Link copied to clipboard!');
    } catch (error) {
      console.error('Error copying link:', error);
    }
  }

  toggleUpdateStatsModal(): void {
    this.showUpdateStatsModal = !this.showUpdateStatsModal;
    this.errorMessage = null;
  }

  updateStats(): void {
    if (!this.license) return;

    this.updatingStats = true;
    this.errorMessage = null;

    const statsData = this.statsForm.value;

    this.licenseService.updateExtras(this.license.lcns_number, statsData).subscribe({
      next: (response) => {
        if (response.success) {
          // Reload license to get updated data
          this.loadLicense(this.license!.lcns_number);
          this.showUpdateStatsModal = false;
          this.showSuccessMessage('Stats updated successfully!');
        }
        this.updatingStats = false;
      },
      error: (error) => {
        console.error('Error updating stats:', error);
        this.errorMessage = error.error?.message || 'Failed to update stats. Please try again.';
        this.updatingStats = false;
      }
    });
  }

  showSuccessMessage(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = null;
    }, 3000);
  }

  goHome(): void {
    this.router.navigate(['/license']);
  }

  flipCard(): void {
    this.isFlipped = !this.isFlipped;
  }
}