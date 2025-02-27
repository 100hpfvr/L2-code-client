import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { Observable, map } from "rxjs";
import { Result } from "../http/result";
import { IVersioningSettings } from "../../models/version-config";
import { StudentEducationLevel } from "../../models/student";
import { BaseRepository } from "./base.repository";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class VersionRepository extends BaseRepository {
  clientVersionFile = "/assets/appsettings-version.json";

  env = environment;
  http = inject(HttpClient);

  public async getApiVersionAsync() {
    const response$ = this.http.get<IVersioningSettings>(
      `${this.env.API_URL}/version`
    );
    return await this.handleResponse<IVersioningSettings>(response$);
  }

  public async getClientVersion(): Promise<any> {
    try {
      const response = await fetch(this.clientVersionFile);
      if (!response.ok) {
        throw new Error(`Erro ao carregar o arquivo: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao carregar versão do cliente:", error);
      throw error;
    }
  }

}
