import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../http/result';
import { CreationSessionResponse } from './models/creation-session-response';
import { BaseRepository } from '../repository/base.repository';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthRespository extends BaseRepository {
  constructor(private http: HttpClient) {
    super();
  }

  public async createSession(creationSessionRequest: {
    identifier: string;
    password: string;
  }): Promise<Result<CreationSessionResponse>> {
    const response$ = this.http.post<CreationSessionResponse>(
      `${environment}/v1/auth/sessions`,
      {
        creationSessionRequest,
      }
    );

    return this.handleResponse<CreationSessionResponse>(response$);
  }
}
