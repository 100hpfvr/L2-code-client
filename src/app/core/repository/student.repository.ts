import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseRepository } from './base.repository';
import { Result } from '../http/result';
import { StudentEducationLevel, StudentIncomeLevel, StudentLevelsCrossApplication } from '../../models/student';
import { DocumentTypes } from '../../models/enums/document-types';
import { CardCrossUser, StudentCard } from '../../models/student-card';
import { Fib } from '../../models/fib';
import { TemporaryUserSummary } from '../../models/temporary-user';
import { StudentType } from '../../models/student-profile';

@Injectable({ providedIn: 'root' })
export class StudentRepository extends BaseRepository {
  env = environment;

  http = inject(HttpClient);

  async loadStudentIncomeLevels(): Promise<Result<StudentIncomeLevel[]>> {
    const headers = { 'Skip-Interceptor': 'true' };
    const response$ = this.http.get<StudentIncomeLevel[]>(
      `${this.env.API_URL}/v1/student-income-levels`, { headers: headers }
    );

    return this.handleResponse<StudentIncomeLevel[]>(response$);
  }

  async loadStudentEducationLevels(): Promise<Result<StudentEducationLevel[]>> {
    const headers = { 'Skip-Interceptor': 'true' };
    const response$ = this.http.get<StudentEducationLevel[]>(
      `${this.env.API_URL}/v1/student-education-levels`, { headers: headers }
    );

    return this.handleResponse<StudentEducationLevel[]>(response$)
  }
  async loadStudentLevelsCrossApplication(studentIncomeLevelId: number, studentEducationLevelId: number) {
    const headers = { 'Skip-Interceptor': 'true' };
    const params = new HttpParams()
      .set('studentIncomeLevelId', studentIncomeLevelId.toString())
      .set('studentEducationLevelId', studentEducationLevelId.toString());
    const response$ = this.http.get<StudentLevelsCrossApplication>(
      `${this.env.API_URL}/v1/studentlevels-applications`, { headers: headers, params: params }
    );

    return this.handleResponse<StudentLevelsCrossApplication>(response$)
  }

  async loadStudent(studentCard: StudentCard, studentDocument: string,) {
    const params = new HttpParams()
      .set('documentTypeId', DocumentTypes.Cpf)
      .set('documentNumber', studentDocument ?? '')
      .set('cardDesignId', studentCard.cardDesignId)
      .set('cardSerialNumber', studentCard.cardSerialNumber)
      .set('issuerId', studentCard.issuerId);
    const response$ = this.http.get<CardCrossUser[]>(
      `${this.env.API_URL}/v1/cards-users`, { params: params }
    );

    return this.handleResponse<CardCrossUser[]>(response$)

  }

  async loadStudentBatchs( studentDocument: string) {
    const params = new HttpParams()
      .set('documentNumber', studentDocument)
    const response$ = this.http.get<TemporaryUserSummary[]>(
      `${this.env.API_URL}/v1/temporary-user`, { params: params }
    );

    return this.handleResponse<TemporaryUserSummary[]>(response$)
  }

  async createFib(fib: Fib){
    const response$ = this.http.post(
      `${this.env.API_URL}/v1/temporary-user`,
      fib
    );

    return this.handleResponse(response$);
  }

  async loadStudentProfile( documentNumber: string) {
    const params = new HttpParams()
      .set('documentNumber', documentNumber)
    const response$ = this.http.get<StudentType>(
      `${this.env.API_URL}/v1/temporary-user/student-profile`, { params: params }
    );

    return this.handleResponse<StudentType>(response$)
  }


}
