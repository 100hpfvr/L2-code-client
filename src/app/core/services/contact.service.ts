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
}
