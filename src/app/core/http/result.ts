export class Result<T> {
  success: boolean;
  data: T | null;
  errorCode: string | null;
  statusCode: number | null;
  message: string | null;

  constructor({
    success,
    data,
    errorCode,
    statusCode: statusCode,
    message: message,
  }: {
    success: boolean;
    data?: T | null;
    errorCode?: string | null;
    statusCode?: number | null;
    message?: string | null;
  }) {
    this.success = success;
    this.data = data ?? null;
    this.errorCode = errorCode ?? null;
    this.statusCode = statusCode ?? null;
    this.message = message ?? null;
  }
}
