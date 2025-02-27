import { Injectable, inject } from '@angular/core';
import { TemporaryUserBatch } from '../../models/temporary-user-batch';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseRepository } from './base.repository';
import { Result } from '../http/result';
import { CloseTemporaryBatchData, CloseTemporaryBatchResult } from '../../models/close-temporary-batch-result';
import { CreateBatchResult } from '../../models/create-batch-result';

@Injectable({ providedIn: 'root' })
export class TemporaryUserBatchRepository extends BaseRepository {
  env = environment;

  http = inject(HttpClient);

  async loadAllBatches(): Promise<Result<TemporaryUserBatch[]>> {
    const response$ = this.http.get<TemporaryUserBatch[]>(
      `${this.env.API_URL}/v1/temporary-user-batches`
    );

    return this.handleResponse<TemporaryUserBatch[]>(response$);
  }

  async createBatch(typeBatchTemporary: string): Promise<Result<CreateBatchResult>> {
    const response$ = this.http.post<CreateBatchResult>(
      `${this.env.API_URL}/v1/temporary-user-batches`,
      null,
      { params: { typeBatchTemporary } }
    );

    return this.handleResponse<CreateBatchResult>(response$);
  }

  async closeBatch(temporaryBatchId: number): Promise<Result<CloseTemporaryBatchResult>> {

    const httpParams = new HttpParams().set('temporaryBatchId', temporaryBatchId);
    const response$ = this.http.put<CloseTemporaryBatchResult>(
      `${this.env.API_URL}/v1/temporary-user-batches`,
      {}, { params: httpParams }
    );

    return this.handleResponse<CloseTemporaryBatchResult>(response$);
  }

  loadLastBatch() {

    const response$ = this.http.get<CloseTemporaryBatchData>(
      `${this.env.API_URL}/v1/temporary-user-batches/last-closed-batch`
    );

    return this.handleResponse<CloseTemporaryBatchData>(response$);
  }
}
