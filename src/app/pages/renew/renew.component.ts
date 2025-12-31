import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LicenseService } from '../../core/services/api/v1/license.service';
import { License, Phase } from '../../core/models/api/v1/license.model';

@Component({
  selector: 'app-renew',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-[#87CEEB] via-[#00BCD4] to-[#4FC3F7] py-12 px-4">
      <div class="container mx-auto max-w-2xl">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="text-6xl mb-4">🔄💫🌟</div>
          <h1 class="text-5xl md:text-6xl font-black mb-4 text-yellow-300" style="text-shadow: 3px 3px 0px #FF1493, 6px 6px 0px #00BCD4;">
            Renew Your License!
          </h1>
          <p class="text-2xl text-white font-bold">Still single and lovin' it? Let's update that license!</p>
        </div>

        <!-- Step 1: Find License -->
        <div *ngIf="currentStep === 1" class="bg-yellow-300 rounded-3xl p-6 md:p-8 border-4 border-yellow-500 shadow-2xl">
          <h2 class="text-3xl font-black mb-6 text-blue-900">🔍 Find Your License First!</h2>

          <form [formGroup]="findForm" (ngSubmit)="findLicense()">
            <!-- License Number Input -->
            <div class="mb-6">
              <label class="block text-lg font-bold mb-2 text-blue-900">🎫 What's Your License Number? *</label>
              <input
                type="text"
                formControlName="licenseNumber"
                class="w-full px-4 py-3 bg-white border-4 border-blue-400 rounded-2xl focus:outline-none focus:border-pink-500 transition-colors text-blue-900 font-semibold text-lg"
                placeholder="XXX-YYYY-NNNN">
              <p class="text-blue-800 text-sm mt-2 font-semibold">💡 Example: ABC-2024-1234</p>
              <div *ngIf="findForm.get('licenseNumber')?.invalid && findForm.get('licenseNumber')?.touched" class="text-red-600 text-sm mt-1 font-bold">
                <span>🚨 We need your license number!</span>
              </div>
            </div>

            <!-- Error Message -->
            <div *ngIf="errorMessage" class="bg-red-400 border-4 border-red-600 rounded-3xl p-4 mb-6 shadow-xl">
              <p class="text-white font-bold text-lg">😱 {{ errorMessage }}</p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="findForm.invalid || loading"
              class="w-full px-6 py-4 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 rounded-full text-2xl font-black text-white hover:scale-105 transition-transform duration-200 shadow-2xl border-4 border-pink-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
              <span *ngIf="!loading">🔍 Find My License!</span>
              <span *ngIf="loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            </button>
          </form>
        </div>

        <!-- Step 2: Renew License -->
        <div *ngIf="currentStep === 2 && currentLicense" class="space-y-6">
          <!-- License Preview Card -->
          <div class="bg-pink-300 rounded-3xl p-6 md:p-8 border-4 border-pink-500 shadow-2xl">
            <h2 class="text-3xl font-black mb-6 text-blue-900">🎫 Your Current License Info</h2>

            <div class="space-y-4 bg-white/80 rounded-2xl p-6">
              <div class="flex justify-between items-center border-b-4 border-blue-400 pb-3">
                <span class="text-blue-900 font-bold text-lg">🏷️ Name:</span>
                <span class="font-black text-blue-900 text-lg">{{ currentLicense.lcns_name }}</span>
              </div>

              <div class="flex justify-between items-center border-b-4 border-blue-400 pb-3">
                <span class="text-blue-900 font-bold text-lg">🎫 License #:</span>
                <span class="font-black text-blue-900 text-lg">{{ currentLicense.lcns_number }}</span>
              </div>

              <div class="flex justify-between items-center border-b-4 border-blue-400 pb-3">
                <span class="text-blue-900 font-bold text-lg">🌟 Phase:</span>
                <span class="font-black text-blue-900 text-lg">{{ currentLicense.phase.phs_name }}</span>
              </div>

              <div class="flex justify-between items-center border-b-4 border-blue-400 pb-3">
                <span class="text-blue-900 font-bold text-lg">📊 Status:</span>
                <span [ngClass]="isExpired ? 'text-red-600 bg-red-200' : 'text-green-700 bg-green-200'" class="font-black text-lg px-4 py-1 rounded-full">
                  {{ isExpired ? '❌ EXPIRED' : '✅ ACTIVE' }}
                </span>
              </div>

              <div class="flex justify-between items-center border-b-4 border-blue-400 pb-3">
                <span class="text-blue-900 font-bold text-lg">📅 Expires:</span>
                <span class="font-black text-blue-900 text-lg">{{ currentLicense.lcns_expires_at | date:'mediumDate' }}</span>
              </div>

              <div class="flex justify-between items-center">
                <span class="text-blue-900 font-bold text-lg">⏰ Days Left:</span>
                <span [ngClass]="daysUntilExpiry < 0 ? 'text-red-600 bg-red-200' : daysUntilExpiry < 30 ? 'text-yellow-700 bg-yellow-200' : 'text-green-700 bg-green-200'" class="font-black text-lg px-4 py-1 rounded-full">
                  {{ daysUntilExpiry < 0 ? '😱 Expired ' + Math.abs(daysUntilExpiry) + ' days ago!' : daysUntilExpiry + ' days' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Renewal Form Card -->
          <div class="bg-yellow-300 rounded-3xl p-6 md:p-8 border-4 border-yellow-500 shadow-2xl">
            <h2 class="text-3xl font-black mb-6 text-blue-900">🔄 Renewal Time!</h2>

            <form [formGroup]="renewForm" (ngSubmit)="renewLicense()">
              <!-- Phase Selection -->
              <div class="mb-6">
                <label class="block text-lg font-bold mb-2 text-blue-900">🌟 Update Your Phase? (Optional)</label>
                <select
                  formControlName="phase_id"
                  class="w-full px-4 py-3 bg-white border-4 border-blue-400 rounded-2xl focus:outline-none focus:border-pink-500 transition-colors text-blue-900 font-semibold text-lg">
                  <option value="">Keep my current phase</option>
                  <option *ngFor="let phase of phases" [value]="phase.phs_id">{{ phase.phs_name }}</option>
                </select>
                <p *ngIf="selectedPhase" class="text-blue-800 text-sm mt-2 font-semibold bg-white/50 rounded-xl p-2">
                  💡 {{ selectedPhase.phs_description }}
                </p>
              </div>

              <!-- Error Message -->
              <div *ngIf="errorMessage" class="bg-red-400 border-4 border-red-600 rounded-3xl p-4 mb-6 shadow-xl">
                <p class="text-white font-bold text-lg">😱 {{ errorMessage }}</p>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  (click)="goBack()"
                  class="flex-1 px-6 py-3 bg-white border-4 border-blue-400 rounded-full text-xl font-bold text-blue-900 hover:scale-105 transition-transform">
                  ⬅️ Back
                </button>
                <button
                  type="submit"
                  [disabled]="loading"
                  class="flex-1 px-6 py-3 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full text-xl font-black text-white hover:scale-105 transition-transform duration-200 shadow-2xl border-4 border-green-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                  <span *ngIf="!loading">🎉 Renew It!</span>
                  <span *ngIf="loading" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Renewing...
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class RenewComponent implements OnInit {
  private fb = inject(FormBuilder);
  private licenseService = inject(LicenseService);
  private router = inject(Router);

  findForm: FormGroup;
  renewForm: FormGroup;
  currentStep = 1;
  loading = false;
  errorMessage: string | null = null;
  currentLicense: License | null = null;
  phases: Phase[] = [];
  Math = Math;

  constructor() {
    this.findForm = this.fb.group({
      licenseNumber: ['', Validators.required]
    });

    this.renewForm = this.fb.group({
      phase_id: ['']
    });
  }

  ngOnInit(): void {
    this.loadPhases();
  }

  loadPhases(): void {
    this.licenseService.getPhases().subscribe({
      next: (response) => {
        if (response.responseObject) {
          this.phases = response.responseObject;
        }
      },
      error: (error) => {
        console.error('Error loading phases:', error);
      }
    });
  }

  get selectedPhase(): Phase | undefined {
    const phaseId = this.renewForm.get('phase_id')?.value;
    return this.phases.find(p => p.phs_id === phaseId);
  }

  get isExpired(): boolean {
    if (!this.currentLicense) return false;
    const expiryDate = new Date(this.currentLicense.lcns_expires_at);
    return expiryDate < new Date();
  }

  get daysUntilExpiry(): number {
    if (!this.currentLicense) return 0;
    const expiryDate = new Date(this.currentLicense.lcns_expires_at);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  findLicense(): void {
    if (this.findForm.invalid) return;

    this.loading = true;
    this.errorMessage = null;

    const licenseNumber = this.findForm.get('licenseNumber')?.value;

    this.licenseService.getLicense(licenseNumber).subscribe({
      next: (response) => {
        if (response.success && response.responseObject) {
          this.currentLicense = response.responseObject;
          this.currentStep = 2;
        } else {
          this.errorMessage = 'License not found';
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error finding license:', error);
        this.errorMessage = error.error?.message || 'License not found. Please check the license number and try again.';
        this.loading = false;
      }
    });
  }

  renewLicense(): void {
    if (!this.currentLicense) return;

    this.loading = true;
    this.errorMessage = null;

    const renewData = this.renewForm.get('phase_id')?.value
      ? { phase_id: this.renewForm.get('phase_id')?.value }
      : undefined;

    this.licenseService.renew(this.currentLicense.lcns_number, renewData).subscribe({
      next: (response) => {
        if (response.success && response.responseObject) {
          this.router.navigate(['/license', response.responseObject.lcns_number]);
        }
      },
      error: (error) => {
        console.error('Error renewing license:', error);
        this.errorMessage = error.error?.message || 'Failed to renew license. Please try again.';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.currentStep = 1;
    this.currentLicense = null;
    this.errorMessage = null;
    this.findForm.reset();
    this.renewForm.reset({ phase_id: '' });
  }
}
