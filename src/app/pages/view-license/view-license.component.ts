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
    <div class="min-h-screen bg-gradient-to-b from-[#87CEEB] via-[#00BCD4] to-[#4FC3F7] py-12 px-4" style="background-image: url('/icons/Playful-Spongebob-Flower-Design-PNG-300x225.png');">
      <div class="container mx-auto max-w-6xl">
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
          <div class="space-y-12">
            <!-- Front Card -->
            <div class="flex justify-center">
              <app-license-front-card [license]="license"></app-license-front-card>
            </div>

            <!-- Back Card -->
            <div class="flex justify-center">
              <app-license-back-card [license]="license"></app-license-back-card>
            </div>

            <!-- Certificate -->
            <div class="flex justify-center">
              <app-license-certificate [license]="license"></app-license-certificate>
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
  styles: []
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
          backgroundColor: null,
        });
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png');
        link.click();

        this.showSuccessMessage('Downloaded successfully!');
      } catch (error) {
        console.error('Error downloading card:', error);
      }
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
}
