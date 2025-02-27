import { inject, Injectable } from "@angular/core";
import { BaseRepository } from "./base.repository";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { MessageService } from "primeng/api";
import { ICpf } from "../../models/cpf-data";
import { environment } from "../../../environments/environment";
import { Result } from "../http/result";

@Injectable({ providedIn: 'root' })
export class DocumentRepository extends BaseRepository {

  env = environment;

  http = inject(HttpClient);

  public async getCpfDataAsync(cpf: string, useInternalDataBase: boolean, birthDate?: Date) {
    let params = new HttpParams()
      .set('cpf', cpf)
      .set('birthDate', birthDate?.toISOString() ?? '')

    const response$ = this.http.get<ICpf>(
      `${this.env.API_URL}/v1/cpf`, { params: params }
    );

    return await this.handleResponse<ICpf>(response$);
  }

  override handleError<T>(err: HttpErrorResponse): Result<T> {

    return new Result<T>({
      success: false,
      errorCode: err.name,
      statusCode: err.status,
      message: this.setErrorMessage(err.status),
    });
  }
  setErrorMessage(status: number): string | null | undefined {
    switch (status) {
      case 400:
        return 'Data de nascimento do estudante inválida';
      case 404:
        return 'Cpf não localizado na receita federal';
      default:
        return 'Erro interno no Servidor';
    }
  }
}
