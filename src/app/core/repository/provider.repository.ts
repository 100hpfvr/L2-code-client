import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseRepository } from './base.repository';
import { Result } from '../http/result';
import { ProviderSchool } from '../../models/school';

@Injectable({ providedIn: 'root' })
export class ProviderRepository extends BaseRepository {
  env = environment;

  http = inject(HttpClient);

  async loadSchools(providerId: number | null, schoolName: string | null, code: string | null): Promise<Result<ProviderSchool[]>> {
    let httpParams = new HttpParams();
    const headers = { 'Skip-Interceptor': 'true' };
    if (providerId)
      httpParams = httpParams.set('providerId', providerId.toString());

    if (schoolName)
      httpParams = httpParams.set('schoolName', schoolName);

    if (code)
      httpParams = httpParams.set('code', code);

    const response$ = this.http.get<ProviderSchool[]>(
      `${this.env.API_URL}/v1/providers/schools`, { headers: headers, params: httpParams }
    );

    return this.handleResponse<ProviderSchool[]>(response$);
  }


  async updatePassoword(oldPassword: string, newPassword: string): Promise<Result<boolean>> {
    const response$ = this.http.put<boolean>(
      `${this.env.API_URL}/v1/providers/my-provider-password-update`, { oldPassword, newPassword }
    );

    return this.handleResponse<boolean>(response$);
  }
}
