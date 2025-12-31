import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LicenseService } from '../../core/services/api/v1/license.service';
import { State, Phase } from '../../core/models/api/v1/license.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-[#87CEEB] via-[#00BCD4] to-[#4FC3F7] py-12 px-4">
      <div class="container mx-auto max-w-2xl">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="text-6xl mb-4">🎓🌊🎉</div>
          <h1 class="text-5xl md:text-6xl font-black mb-4 text-yellow-300" style="text-shadow: 3px 3px 0px #FF1493, 6px 6px 0px #00BCD4;">
            Get Your Single License!
          </h1>
          <p class="text-2xl text-white font-bold">Fill this out and you'll be official! Aye aye, captain! 🫡</p>
        </div>

        <!-- Loading State -->
        <div *ngIf="loadingLookups" class="text-center py-12">
          <div class="text-6xl mb-4 animate-bounce">🧽</div>
          <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-400 mx-auto"></div>
          <p class="mt-4 text-white font-bold text-xl">Loading the fun stuff...</p>
        </div>

        <!-- Registration Form -->
        <form *ngIf="!loadingLookups" [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Section 1: Required Info Card -->
          <div class="bg-yellow-300 rounded-3xl p-6 md:p-8 border-4 border-yellow-500 shadow-2xl">
            <h2 class="text-3xl font-black mb-6 text-blue-900">📝 The Important Stuff!</h2>

            <!-- Name -->
            <div class="mb-6">
              <label class="block text-lg font-bold mb-2 text-blue-900">🏷️ What's Your Name? *</label>
              <input
                type="text"
                formControlName="name"
                class="w-full px-4 py-3 bg-white border-4 border-blue-400 rounded-2xl focus:outline-none focus:border-pink-500 transition-colors text-blue-900 font-semibold text-lg"
                placeholder="SpongeBob SquarePants">
              <div *ngIf="registerForm.get('name')?.invalid && registerForm.get('name')?.touched" class="text-red-600 text-sm mt-1 font-bold">
                <span *ngIf="registerForm.get('name')?.errors?.['required']">🚨 We need your name, buddy!</span>
                <span *ngIf="registerForm.get('name')?.errors?.['minlength']">🚨 Name's too short!</span>
              </div>
            </div>

            <!-- Photo Upload -->
            <div class="mb-6">
              <label class="block text-lg font-bold mb-2 text-blue-900">📸 Got a Photo? (Optional but fun!)</label>
              <div class="flex flex-col items-center">
                <div *ngIf="photoPreview" class="mb-4">
                  <img [src]="photoPreview" alt="Preview" class="w-32 h-32 object-cover rounded-2xl border-4 border-pink-500 shadow-lg">
                </div>
                <input
                  type="file"
                  (change)="onPhotoSelected($event)"
                  accept="image/*"
                  class="w-full px-4 py-3 bg-white border-4 border-blue-400 rounded-2xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-pink-500 file:text-white file:font-bold hover:file:bg-pink-600">
              </div>
            </div>

            <!-- Single Since -->
            <div class="mb-6">
              <label class="block text-lg font-bold mb-2 text-blue-900">📅 Single Since When? *</label>
              <input
                type="date"
                formControlName="single_since"
                [max]="today"
                class="w-full px-4 py-3 bg-white border-4 border-blue-400 rounded-2xl focus:outline-none focus:border-pink-500 transition-colors text-blue-900 font-semibold text-lg"
                placeholder="Select date">
              <div *ngIf="registerForm.get('single_since')?.invalid && registerForm.get('single_since')?.touched" class="text-red-600 text-sm mt-1 font-bold">
                <span *ngIf="registerForm.get('single_since')?.errors?.['required']">🚨 When did the single life begin?</span>
              </div>
            </div>

            <!-- State -->
            <div class="mb-6">
              <label class="block text-lg font-bold mb-2 text-blue-900">🗺️ Which State Are You In? *</label>
              <select
                formControlName="state_id"
                class="w-full px-4 py-3 bg-white border-4 border-blue-400 rounded-2xl focus:outline-none focus:border-pink-500 transition-colors text-blue-900 font-semibold text-lg">
                <option value="" disabled>Pick your state!</option>
                <option *ngFor="let state of states" [value]="state.stt_id">{{ state.stt_name }}</option>
              </select>
              <div *ngIf="registerForm.get('state_id')?.invalid && registerForm.get('state_id')?.touched" class="text-red-600 text-sm mt-1 font-bold">
                <span>🚨 We need to know your state!</span>
              </div>
            </div>

            <!-- Phase -->
            <div class="mb-6">
              <label class="block text-lg font-bold mb-2 text-blue-900">🌟 What's Your Single Phase? *</label>
              <select
                formControlName="phase_id"
                class="w-full px-4 py-3 bg-white border-4 border-blue-400 rounded-2xl focus:outline-none focus:border-pink-500 transition-colors text-blue-900 font-semibold text-lg">
                <option value="" disabled>Choose your vibe!</option>
                <option *ngFor="let phase of phases" [value]="phase.phs_id">{{ phase.phs_name }}</option>
              </select>
              <p *ngIf="selectedPhase" class="text-blue-800 text-sm mt-2 font-semibold bg-white/50 rounded-xl p-2">
                💡 {{ selectedPhase.phs_description }}
              </p>
              <div *ngIf="registerForm.get('phase_id')?.invalid && registerForm.get('phase_id')?.touched" class="text-red-600 text-sm mt-1 font-bold">
                <span>🚨 Pick a phase!</span>
              </div>
            </div>
          </div>

          <!-- Section 2: Optional Fun Questions Card -->
          <div class="bg-pink-300 rounded-3xl p-6 md:p-8 border-4 border-pink-500 shadow-2xl">
            <h2 class="text-3xl font-black mb-6 text-blue-900">🎮 Fun Stats (Optional But Hilarious!)</h2>

            <!-- Situationships -->
            <div class="mb-6">
              <label class="block text-lg font-bold mb-2 text-blue-900">💔 How many situationships this year?</label>
              <input
                type="number"
                formControlName="situationships_count"
                min="0"
                max="20"
                class="w-full px-4 py-3 bg-white border-4 border-pink-400 rounded-2xl focus:outline-none focus:border-yellow-500 transition-colors text-blue-900 font-semibold text-lg"
                placeholder="It's okay, we won't judge! 0-20">
            </div>

            <!-- Dating Apps -->
            <div class="mb-6">
              <label class="block text-lg font-bold mb-2 text-blue-900">📱 Dating apps installed?</label>
              <input
                type="number"
                formControlName="dating_apps_count"
                min="0"
                max="10"
                class="w-full px-4 py-3 bg-white border-4 border-pink-400 rounded-2xl focus:outline-none focus:border-yellow-500 transition-colors text-blue-900 font-semibold text-lg"
                placeholder="Tinder? Bumble? All of em? 0-10">
            </div>

            <!-- Ghosted Count -->
            <div class="mb-6">
              <label class="block text-lg font-bold mb-2 text-blue-900">👻 Times ghosted/been ghosted?</label>
              <input
                type="number"
                formControlName="ghosted_count"
                min="0"
                max="20"
                class="w-full px-4 py-3 bg-white border-4 border-pink-400 rounded-2xl focus:outline-none focus:border-yellow-500 transition-colors text-blue-900 font-semibold text-lg"
                placeholder="Boo! 0-20">
            </div>

            <!-- Self Focus Count -->
            <div class="mb-6">
              <label class="block text-lg font-bold mb-2 text-blue-900">🧘 Times said 'focusing on myself'?</label>
              <input
                type="number"
                formControlName="self_focus_count"
                min="0"
                max="50"
                class="w-full px-4 py-3 bg-white border-4 border-pink-400 rounded-2xl focus:outline-none focus:border-yellow-500 transition-colors text-blue-900 font-semibold text-lg"
                placeholder="Self-care is important! 0-50">
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-center">
            <button
              type="submit"
              [disabled]="registerForm.invalid || submitting"
              class="px-12 py-5 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full text-2xl font-black text-white hover:scale-110 hover:rotate-3 transition-all duration-200 shadow-2xl border-4 border-green-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:rotate-0">
              <span *ngIf="!submitting">🎉 LET'S GOOOOO!</span>
              <span *ngIf="submitting" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Making it official...
              </span>
            </button>
          </div>

          <!-- Error Message -->
          <div *ngIf="errorMessage" class="bg-red-400 border-4 border-red-600 rounded-3xl p-6 text-center shadow-2xl">
            <p class="text-white font-bold text-xl">😱 Oops! {{ errorMessage }}</p>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  private licenseService = inject(LicenseService);
  private router = inject(Router);

  registerForm: FormGroup;
  states: State[] = [];
  phases: Phase[] = [];
  loadingLookups = true;
  submitting = false;
  photoPreview: string | null = null;
  selectedPhoto: File | null = null;
  errorMessage: string | null = null;
  today: string;

  constructor() {
    const now = new Date();
    this.today = now.toISOString().split('T')[0];

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      single_since: ['', Validators.required],
      state_id: ['', Validators.required],
      phase_id: ['', Validators.required],
      situationships_count: [0],
      dating_apps_count: [0],
      ghosted_count: [0],
      self_focus_count: [0]
    });
  }

  ngOnInit(): void {
    this.loadLookupData();
  }

  loadLookupData(): void {
    this.loadingLookups = true;

    Promise.all([
      this.licenseService.getStates().toPromise(),
      this.licenseService.getPhases().toPromise()
    ])
      .then(([statesResponse, phasesResponse]) => {
        if (statesResponse?.responseObject) {
          this.states = statesResponse.responseObject;
        }
        if (phasesResponse?.responseObject) {
          this.phases = phasesResponse.responseObject;
        }
        this.loadingLookups = false;
      })
      .catch(error => {
        console.error('Error loading lookup data:', error);
        this.errorMessage = 'Failed to load form data. Please refresh the page.';
        this.loadingLookups = false;
      });
  }

  get selectedPhase(): Phase | undefined {
    const phaseId = this.registerForm.get('phase_id')?.value;
    return this.phases.find(p => p.phs_id === phaseId);
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedPhoto = file;

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.photoPreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.submitting = true;
    this.errorMessage = null;

    const formValue = this.registerForm.value;
    const requestData: any = {
      name: formValue.name,
      single_since: formValue.single_since,
      phase_id: formValue.phase_id,
      state_id: formValue.state_id
    };

    if (this.selectedPhoto) {
      requestData.photo = this.selectedPhoto;
    }

    this.licenseService.register(requestData).subscribe({
      next: (response) => {
        if (response.success && response.responseObject) {
          const licenseNumber = response.responseObject.lcns_number;

          // Update extras if any were provided
          const hasExtras =
            formValue.situationships_count > 0 ||
            formValue.dating_apps_count > 0 ||
            formValue.ghosted_count > 0 ||
            formValue.self_focus_count > 0;

          if (hasExtras) {
            const extrasData = {
              situationships_count: formValue.situationships_count,
              dating_apps_count: formValue.dating_apps_count,
              ghosted_count: formValue.ghosted_count,
              self_focus_count: formValue.self_focus_count
            };

            this.licenseService.updateExtras(licenseNumber, extrasData).subscribe({
              next: () => {
                this.router.navigate(['/license', licenseNumber]);
              },
              error: () => {
                // Navigate even if extras update fails
                this.router.navigate(['/license', licenseNumber]);
              }
            });
          } else {
            this.router.navigate(['/license', licenseNumber]);
          }
        }
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.errorMessage = error.error?.message || 'Failed to register. Please try again.';
        this.submitting = false;
      }
    });
  }
}
