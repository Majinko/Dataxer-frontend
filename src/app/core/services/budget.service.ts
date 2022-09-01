import {ResourceService} from '../class/ResourceService';
import {Budget, BudgetOverview} from '../models/budget';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Serializer} from '../models/serializers/Serializer';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BudgetService extends ResourceService<Budget> {
  constructor(private httpClient: HttpClient) {
    super(
      httpClient,
      'budget',
      new Serializer());
  }

  getByProjectId(projectId: number, categoryId: number = null): Observable<BudgetOverview[]> {
    return this.httpClient.get <BudgetOverview[]>(`${environment.baseUrl}/budget/project/${projectId}${categoryId ? '?categoryParentId=' + categoryId : ''}`);
  }

  getBudgetData(projectId: string, itemIds: string): Observable<any> {
    return this.httpClient.get <any>(`${environment.baseUrl}/budget/budgetData/${projectId}${itemIds ? '?itemIds=' + itemIds : ''}`);
  }
}
