import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  ApiResponse,
  State,
  Phase,
  License,
  CreateLicenseRequest,
  RenewLicenseRequest,
  UpdateExtrasRequest,
  LicenseExtras
} from '../../../models/api/v1/license.model';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {
  private http = inject(HttpClient);
  private baseUrl = environment.LICENSE_API_URL;

  getStates(): Observable<ApiResponse<State[]>> {
    return this.http.get<ApiResponse<State[]>>(`${this.baseUrl}/license/lookup/states`);
  }

  getPhases(): Observable<ApiResponse<Phase[]>> {
    return this.http.get<ApiResponse<Phase[]>>(`${this.baseUrl}/license/lookup/phases`);
  }

  register(data: CreateLicenseRequest): Observable<ApiResponse<License>> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('single_since', data.single_since);
    formData.append('phase_id', data.phase_id);
    formData.append('state_id', data.state_id);

    if (data.photo) {
      formData.append('photo', data.photo);
    }

    return this.http.post<ApiResponse<License>>(`${this.baseUrl}/license/register`, formData);
  }

  renew(licenseNumber: string, data?: RenewLicenseRequest): Observable<ApiResponse<License>> {
    return this.http.put<ApiResponse<License>>(
      `${this.baseUrl}/license/renew/${licenseNumber}`,
      data || {}
    );
  }

  updateExtras(licenseNumber: string, data: UpdateExtrasRequest): Observable<ApiResponse<LicenseExtras>> {
    return this.http.put<ApiResponse<LicenseExtras>>(
      `${this.baseUrl}/license/${licenseNumber}/extras`,
      data
    );
  }

  getLicense(licenseNumber: string): Observable<ApiResponse<License>> {
    return this.http.get<ApiResponse<License>>(`${this.baseUrl}/license/${licenseNumber}`);
  }
}
