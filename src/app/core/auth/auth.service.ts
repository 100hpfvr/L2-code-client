import { Injectable } from '@angular/core';
import { AuthRespository } from './auth.repository';
import { Observable, tap } from 'rxjs';
import { Result } from '../http/result';
import { JwtService } from './jwt.service';
import { CreateSessionResults } from './models/creation-session-results';
import { CreationSessionResponse } from './models/creation-session-response';
import { AuthData } from './models/auth-data';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private sessionTokenKey: string = 'session_token';
  public sessionToken: string | null = null;

  constructor(
    private jwtService: JwtService
  ) {
    this.loadLocalSessionToken();
  }

  // public createSession(sessionRequestData: {
  //   identifier: string;
  //   password: string;
  // }): Observable<Result<CreationSessionResponse>> {
  //   return this.authRepository
  //     .createSession({
  //       ...sessionRequestData,
  //     })
  //     .pipe(
  //       tap((res) => {
  //         if (
  //           res.success &&
  //           res.data?.result == CreateSessionResults.CreatedWithSuccess
  //         ) {
  //           this.storeLocalSessionToken(res.data.token!);
  //         } else {
  //           this.removeLocalSessionToken();
  //         }
  //       })
  //     );
  // }

  refreshSessionToken() {}

  public get isAuthenticated(): boolean {
    return this.sessionToken != null;
  }

  public get isSessionExpired(): boolean | null {
    if (this.sessionToken) {
      return this.jwtService.isExpired(this.sessionToken);
    }
    return null;
  }

  public getAuthData(): AuthData | null {
    if (this.sessionToken) {
      let data = this.jwtService.decodeToken(this.sessionToken);
      return {
        userName: data.name,
        providerId: data.provider_id,
        roles: Array.isArray(data.role) ? [...data.role] : [data.role],
      };
    }
    return null;
  }

  private storeLocalSessionToken(token: string) {
    this.sessionToken = token;
    localStorage.setItem(this.sessionTokenKey, token);
  }

  private loadLocalSessionToken(): string | null {
    this.sessionToken = localStorage.getItem(this.sessionTokenKey);
    return this.sessionToken;
  }

  public removeLocalSessionToken() {
    this.sessionToken = null;
    localStorage.removeItem(this.sessionTokenKey);
  }
}
