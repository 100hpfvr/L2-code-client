import { HttpErrorResponse } from '@angular/common/http';
import { Result } from '../http/result';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { Observable } from 'rxjs/internal/Observable';

export abstract class BaseRepository {
  handleError<T>(err: HttpErrorResponse): Result<T> {
    if (err.error && (err?.status == 401 || err?.status == 404)) {
      return new Result<T>({
        success: false,
        errorCode: err.error.errorCode,
        statusCode: err.status,
        message: err.error.message,
      });
    } else {
      return new Result<T>({
        success: false,
        errorCode: err.name,
        statusCode: err.status,
        message: err.error.message,
      });
    }
  }

  async handleResponse<T>(response$: Observable<T>): Promise<Result<T>> {
    try {
      const response = await firstValueFrom(response$); // pega o primeiro valor do Observable;
      return new Result<T>({
        success: true,
        data: response,
      });
    } catch (err) {
      return this.handleError<T>(err as HttpErrorResponse);
    }
  }
}
