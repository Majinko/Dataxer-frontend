import {Resource} from '../models/resource';
import {HttpClient} from '@angular/common/http';
import {Serializer} from '../models/serializer';
import {Observable} from 'rxjs';
import {Paginate} from '../models/paginate';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {DocumentFilter} from '../models/filters/document-filter';
import {IPaginate} from '../interface/IPaginate';
import {prepareStringFilter} from '../../../helper';
import {CustomFile} from '../models/customFile';
import {UploadContext} from '../models/uploadContext';

export class ResourceService<T extends Resource> implements IPaginate<T> {
  filter: DocumentFilter;

  constructor(
    private http: HttpClient,
    private endpoint: string,
    private serializer: Serializer) {
  }

  paginate(page: number, size: number): Observable<Paginate<T>> {
    const filter = prepareStringFilter(this.endpoint, this.filter);

    return this.http
      .get<Paginate<T>>(`${environment.baseUrl}/${this.endpoint}/paginate?page=${page}&size=${size}${filter !== '' ? '&filters=' + filter : ''}`);
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

  update(item: T): Observable<T> {
    return this.http.post<void>(`${environment.baseUrl}/${this.endpoint}/update`, item)
      .pipe(map(data => this.serializer.fromJson(data) as T));
  }

  storeWithFiles(item: T, files: CustomFile[]): Observable<void> {
    const uploadContext: UploadContext<T> = {
      files,
      object: item
    };

    return this.http
      .post<void>(`${environment.baseUrl}/${this.endpoint}/store`, uploadContext);
  }

  updateWithFiles(item: T, files: CustomFile[]): Observable<void> {
    const uploadContext: UploadContext<T> = {
      files,
      object: item
    };

    return this.http
      .post<void>(`${environment.baseUrl}/${this.endpoint}/update`, uploadContext);
  }

  private convertData(data: any): T[] {
    return data.map(item => this.serializer.fromJson(item));
  }

  destroy(id: number): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/${this.endpoint}/destroy/${id}`);
  }
}
