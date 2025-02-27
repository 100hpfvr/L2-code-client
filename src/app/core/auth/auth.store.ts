import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { CreateSessionResults } from './models/creation-session-results';
import { AuthRespository } from './auth.repository';
import { JwtService } from './jwt.service';

type AuthState = {
  createSessionResult: CreateSessionResults | null;
  sessionToken: string | null;
};

const initialState: AuthState = {
  createSessionResult: null,
  sessionToken: null,
};

const sessionTokenKey: string = 'session_token';

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, authRepository = inject(AuthRespository)) => ({
    async removeSession() {
      localStorage.removeItem(sessionTokenKey);
      localStorage.removeItem(sessionTokenKey);
      patchState(store, initialState);
    },
    async createSession(sessionData: { identifier: string; password: string }) {
      patchState(store, initialState);
      try {
        const result = await authRepository.createSession({
          identifier: sessionData.identifier,
          password: sessionData.password,
        });
        if (result.success) {
          if (result.data?.token) {
            localStorage.setItem(sessionTokenKey, result.data.token);
          }

          patchState(store, {
            sessionToken: result.data?.token,
            createSessionResult: CreateSessionResults.CreatedWithSuccess,
          });
        } else {
          localStorage.removeItem(sessionTokenKey);
          patchState(store, {
            sessionToken: null,
            createSessionResult: result.errorCode as CreateSessionResults,
          });
        }
      } catch (ex) {
        patchState(store, {
          sessionToken: null,
          createSessionResult: CreateSessionResults.UnknowError,
        });
      }
    },
  })),
  withComputed((state, jwtService = inject(JwtService)) => ({
    isSessionExpired: computed(() => {
      if (state.sessionToken()) {
        return jwtService.isExpired(state.sessionToken()!);
      }
      return null;
    }),
    isAuthenticated: computed(() => state.sessionToken() != null),
    authData: computed(() => {
      if (state.sessionToken()) {
        let data = jwtService.decodeToken(state.sessionToken()!);
        return {
          userName: data.name,
          providerId: data.provider_id,
          roles: Array.isArray(data.role) ? [...data.role] : [data.role],
        };
      }
      return null;
    }),
  })),
  withHooks({
    onInit(store) {
      patchState(store, {
        sessionToken: localStorage.getItem(sessionTokenKey),
      });
    },
  })
);
