import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Cost} from '../models/cost';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Paginate} from '../models/paginate';
import * as moment from 'moment';
import {map} from 'rxjs/operators';
import {ResourceService} from '../class/ResourceService';
import {Serializer} from '../models/serializers/Serializer';
import {Invoice} from '../models/invoice';


@Injectable({
  providedIn: 'root'
})
export class CostService extends ResourceService<Cost> {
  constructor(private httpClient: HttpClient) {
    super(
      httpClient,
      'cost',
      new Serializer());
  }

  paginate(page: number, size: number): Observable<Paginate<Cost>> {
    return this.httpClient.get<Paginate<Cost>>(`${environment.baseUrl}/cost/paginate?page=${page}&size=${size}${this.rsqlFilter ? '&filters=' + this.rsqlFilter : ''}`).pipe(map(data => {
      data.content.forEach(cost => {
        cost.dueAtDays = Math.ceil(moment(cost.dueDate).diff(new Date(), 'days', true));
      });

      return data;
    }));
  }

  getById(id: number): Observable<Cost> {
    return this.httpClient.get<Cost>(`${environment.baseUrl}/cost/getById/${id}`).pipe(map(cost => {
      cost.dueAtDays = Math.ceil(moment(cost.dueDate).diff(new Date(), 'days', true));

      return cost;
    }));
  }

  findAllByProject(projectId: number, companyIds: number[] = null): Observable<Cost[]> {
    return this.httpClient.get<Cost[]>(`${environment.baseUrl}/cost/project/${projectId}${companyIds && companyIds.length > 0 ? '?companyIds=' + companyIds : ''}`);
  }

  getCostsYears(): Observable<number[]> {
    return this.httpClient.get<number[]>(`${environment.baseUrl}/cost/years`);
  }

  duplicate(oldId: number): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${environment.baseUrl}/cost/duplicate/${oldId}`);
  }
}
