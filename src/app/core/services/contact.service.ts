import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    const response$ = this.http.get<Contact[]>(
      `/contacts`,
    );

    return this.handleResponse<Contact[]>(response$);
  }

  async updateFavorite(contact: Contact): Promise<Result<Contact>> {
    const params =  new HttpParams().set('id', contact.id!);
    const response$ = this.http.put<Contact>(
      `/contacts`,
      contact
    );
    return this.handleResponse<Contact>(response$);
  }

  async update(contact: Contact): Promise<Result<Contact>> {
    const response$ = this.http.put<Contact>(
      `/contacts/${contact.id}`,
      contact,
    );
    return this.handleResponse<Contact>(response$);
  }

  async delete(contact: Contact): Promise<Result<Contact>> {
    const response$ = this.http.delete<Contact>(
      `/contacts/${contact.id}`,
    );
    return this.handleResponse<Contact>(response$);
  }

  async create(contact: Contact): Promise<Result<Contact>> {
    const response$ = this.http.post<Contact>(
      `/contacts`,
      contact,
    );
    return this.handleResponse<Contact>(response$);
  }
}
