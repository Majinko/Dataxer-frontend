import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Cost} from '../models/cost';
import {CustomFile} from '../models/customFile';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {UploadContext} from '../models/uploadContext';
import {Paginate} from '../models/paginate';
import * as moment from 'moment';
import {map} from 'rxjs/operators';
import {IPaginate} from '../interface/IPaginate';
import {DocumentFilter} from '../models/filters/document-filter';
import {prepareStringFilter} from '../../../helper';


@Injectable({
  providedIn: 'root'
})
export class CostService implements IPaginate<Cost> {
  filter: DocumentFilter;

  constructor(private http: HttpClient) {
  }

  paginate(page: number, size: number): Observable<Paginate<Cost>> {
    const filter = prepareStringFilter('priceOffer', this.filter);

    return this.http.get<Paginate<Cost>>(`${environment.baseUrl}/cost/paginate?page=${page}&size=${size}${filter !== '' ? '&filters=' + filter : ''}`).pipe(map(data => {
      data.content.forEach(cost => {
        cost.dueAtDays = Math.ceil(moment(cost.dueDate).diff(new Date(), 'days', true));
      });

      return data;
    }));
  }

  store(cost: Cost, files: CustomFile[]): Observable<void> {
    const data: UploadContext<Cost> = {
      files,
      object: cost
    };

    return this.http.post<void>(`${environment.baseUrl}/cost/store`, data);
  }

  getById(id: number): Observable<Cost> {
    return this.http.get<Cost>(`${environment.baseUrl}/cost/${id}`).pipe(map(cost => {
      cost.dueAtDays = Math.ceil(moment(cost.dueDate).diff(new Date(), 'days', true));

      return cost;
    }));
  }

  destroy(id: number): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/cost/destroy/${id}`);
  }

  update(cost: Cost, files: CustomFile[]): Observable<void> {
    const data: UploadContext<Cost> = {
      files,
      object: cost
    };

    return this.http.post<void>(`${environment.baseUrl}/cost/update`, data);
  }

  findAllByProject(projectId: number): Observable<Cost[]> {
    return this.http.get<Cost[]>(`${environment.baseUrl}/cost/project/${projectId}`);
  }
}
