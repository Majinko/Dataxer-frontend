import {Resource} from '../models/resource';
import {HttpClient} from '@angular/common/http';
import {Serializer} from '../models/serializer';
import {Observable} from 'rxjs';
import {Paginate} from '../models/paginate';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

export class ResourceService<T extends Resource> {
  constructor(
    private http: HttpClient,
    private endpoint: string,
    private serializer: Serializer) {
  }

  paginate(page: number, size: number): Observable<Paginate<T>> {
    return this.http
      .get<Paginate<T>>(environment.baseUrl + `/${environment.baseUrl}/${this.endpoint}?page=${page}&size=${size}`);
  }

  getById(id: number): Observable<T> {
    return this.http
      .get(`${environment.baseUrl}/${this.endpoint}/getById/${id}`)
      .pipe(map((data: any) => this.serializer.fromJson(data) as T));
  }

  getAll(): Observable<T[]> {
    return this.http
      .get(`${environment.baseUrl}/${this.endpoint}/getAll`)
      .pipe(map((data: any) => {
        return data ? data : null;
      }));
  }

  store(item: T): Observable<T> {
    return this.http
      .post<T>(`${environment.baseUrl}/${this.endpoint}/store`, this.serializer.toJson(item))
      .pipe(map(data => this.serializer.fromJson(data) as T));
  }

  private convertData(data: any): T[] {
    return data.map(item => this.serializer.fromJson(item));
  }
}
