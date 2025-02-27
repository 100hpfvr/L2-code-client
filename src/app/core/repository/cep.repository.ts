import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Result } from '../http/result';
import { BaseRepository } from './base.repository';
import { IZipData } from '../../models/zip-data';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CepRepository extends BaseRepository {
  constructor(private http: HttpClient) {
    super();
  }
  async getCepData(cep: string): Promise<Result<IZipData>> {
    const response$ = this.http
      .get<IZipData>(`${environment.API_URL}/v1/ceps`, {
        params: { cep: cep },
      })
    return this.handleResponse<IZipData>(response$);
  }

}
