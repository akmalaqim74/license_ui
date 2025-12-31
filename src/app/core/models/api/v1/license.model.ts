export interface State {
  stt_id: string;
  stt_code: string;
  stt_name: string;
  stt_is_active: boolean;
}

export interface Phase {
  phs_id: string;
  phs_code: string;
  phs_name: string;
  phs_description: string;
  phs_is_active: boolean;
}

export interface GeneralStatus {
  gsts_id: string;
  gsts_code: string;
  gsts_name: string;
  gsts_is_active: boolean;
}

export interface LicenseExtras {
  lcex_id: string;
  lcex_lcns_id: string;
  lcex_situationships_count: number;
  lcex_dating_apps_count: number;
  lcex_ghosted_count: number;
  lcex_self_focus_count: number;
  lcex_bonus_titles: string[];
}

export interface License {
  lcns_id: string;
  lcns_number: string;
  lcns_name: string;
  lcns_photo_url: string | null;
  lcns_single_since: string;
  lcns_title: string;
  lcns_issued_at: string;
  lcns_expires_at: string;
  phase: Phase;
  state: State;
  status: GeneralStatus;
  extras?: LicenseExtras;
}

export interface CreateLicenseRequest {
  name: string;
  single_since: string;
  phase_id: string;
  state_id: string;
  photo?: File;
}

export interface RenewLicenseRequest {
  phase_id?: string;
}

export interface UpdateExtrasRequest {
  situationships_count?: number;
  dating_apps_count?: number;
  ghosted_count?: number;
  self_focus_count?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  responseObject: T;
  statusCode: number;
}
