import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LicenseService } from '../../core/services/api/v1/license.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-[#87CEEB] via-[#00BCD4] to-[#4FC3F7] relative overflow-hidden">
      <!-- Bubble decorations -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="bubble" style="left: 10%; animation-delay: 0s;"></div>
        <div class="bubble" style="left: 20%; animation-delay: 2s;"></div>
        <div class="bubble" style="left: 35%; animation-delay: 4s;"></div>
        <div class="bubble" style="left: 50%; animation-delay: 1s;"></div>
        <div class="bubble" style="left: 65%; animation-delay: 3s;"></div>
        <div class="bubble" style="left: 80%; animation-delay: 5s;"></div>
        <div class="bubble" style="left: 90%; animation-delay: 2.5s;"></div>
      </div>

      <!-- Hero Section -->
      <div class="container mx-auto px-4 py-20 relative z-10">
        <div class="text-center max-w-4xl mx-auto">
         

          <!-- Main Headline -->
          <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-yellow-300 drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] px-4" style="text-shadow: 4px 4px 0px #FF1493, 8px 8px 0px #00BCD4;">
            I'm Ready! I'm Ready!<br>For My Single License!
          </h1>

          <!-- Subtext -->
          <p class="text-xl sm:text-2xl md:text-3xl text-white font-bold mb-4 drop-shadow-lg px-4">
            🏖️ Bikini Bottom Bureau of Single Affairs 🏖️
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 px-4">
            <button
              (click)="navigateToRegister()"
              class="px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 rounded-full text-xl sm:text-2xl font-black text-blue-900 hover:scale-110 hover:rotate-3 transition-all duration-200 shadow-2xl border-4 border-yellow-600">
               Get My License NOW!
            </button>
            <button
              (click)="navigateToRenew()"
              class="px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 rounded-full text-xl sm:text-2xl font-black text-white hover:scale-110 hover:-rotate-3 transition-all duration-200 shadow-2xl border-4 border-pink-700">
              🔄 Renew My License!
            </button>
          </div>

          <!-- Find My License Section -->
          <div class="max-w-2xl mx-auto mb-20 px-4">
            <div class="bg-white/20 backdrop-blur-md rounded-3xl p-4 sm:p-6 md:p-8 border-4 border-purple-400 shadow-2xl">

              <form [formGroup]="searchForm" (ngSubmit)="findLicense()" class="space-y-4">
                <div>
                  <input
                    type="text"
                    formControlName="licenseNumber"
                    placeholder="Enter Your License Number..."
                    class="w-full px-6 py-4 bg-white border-4 border-pink-400 rounded-2xl focus:outline-none focus:border-yellow-500 text-blue-900 font-semibold text-xl text-center">
                </div>

                <div *ngIf="errorMessage" class="bg-red-400 border-4 border-red-600 rounded-2xl p-4 shadow-xl animate-bounce">
                  <p class="text-white font-bold text-lg text-center">😱 {{ errorMessage }}</p>
                </div>

                <button
                  type="submit"
                  [disabled]="searchingLicense || searchForm.invalid"
                  class="w-full px-8 py-4 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 rounded-full text-2xl font-black text-white hover:scale-105 transition-transform shadow-2xl border-4 border-purple-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  <span *ngIf="!searchingLicense">🚀 Find My License!</span>
                  <span *ngIf="searchingLicense">⏳ Searching...</span>
                </button>
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
      50% {
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
  `]
})
export class HomeComponent {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private licenseService = inject(LicenseService);

  searchForm: FormGroup;
  searchingLicense = false;
  errorMessage: string | null = null;

  constructor() {
    this.searchForm = this.fb.group({
      licenseNumber: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/license/register']);
  }

  navigateToRenew(): void {
    this.router.navigate(['/license/renew']);
  }

  findLicense(): void {
    if (this.searchForm.invalid) {
      this.errorMessage = 'Please enter a valid license number (at least 3 characters)';
      return;
    }

    const licenseNumber = this.searchForm.value.licenseNumber.trim();
    this.searchingLicense = true;
    this.errorMessage = null;

    this.licenseService.getLicense(licenseNumber).subscribe({
      next: (response) => {
        if (response.success && response.responseObject) {
          // Navigate to the license view page
          this.router.navigate(['/license', licenseNumber]);
        } else {
          this.errorMessage = 'License not found. Please check the number and try again.';
        }
        this.searchingLicense = false;
      },
      error: (error) => {
        console.error('Error finding license:', error);
        this.errorMessage = error.error?.message || 'License not found. Please check the number and try again.';
        this.searchingLicense = false;
      }
    });
  }
}
