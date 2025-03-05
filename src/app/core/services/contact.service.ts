import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Contact} from '../../models/contact';
import {BaseService} from './base.service';
import {Result} from '../../models/result';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends BaseService{

  http = inject(HttpClient);

  async getAll(): Promise<Result<Contact[]>> {
    const response$ = this.http.get<Contact[]>(
      `${environment.API_URL}/contacts`,
    );

    return this.handleResponse<Contact[]>(response$);
  }

  // async loadSchools(providerId: number | null, schoolName: string | null, code: string | null): Promise<Result<ProviderSchool[]>> {
  //   let httpParams = new HttpParams();
  //   const headers = { 'Skip-Interceptor': 'true' };
  //   if (providerId)
  //     httpParams = httpParams.set('providerId', providerId.toString());
  //
  //   if (schoolName)
  //     httpParams = httpParams.set('schoolName', schoolName);
  //
  //   if (code)
  //     httpParams = httpParams.set('code', code);
  //
  //   const response$ = this.http.get<ProviderSchool[]>(
  //     `${this.env.API_URL}/v1/providers/schools`, { headers: headers, params: httpParams }
  //   );
  //
  //   return this.handleResponse<ProviderSchool[]>(response$);
  // }


}
