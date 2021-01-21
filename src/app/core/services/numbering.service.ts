import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DocumentNumbering} from '../models/documentNumbering';
import {environment} from '../../../environments/environment';
import {Paginate} from '../models/paginate';

@Injectable({
  providedIn: 'root'
})
export class NumberingService {

  constructor(private http: HttpClient) {
  }

  public store(documentNumbering: DocumentNumbering): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/numberGenerator/store`, documentNumbering);
  }

  public update(documentNumbering: DocumentNumbering): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/numberGenerator/update`, documentNumbering);
  }

  paginate(page: number, size: number): Observable<Paginate<DocumentNumbering>> {
    return this.http.get<Paginate<DocumentNumbering>>(`${environment.baseUrl}/numberGenerator/paginate?page=${page}&size=${size}`);
  }

  getById(id: number): Observable<DocumentNumbering> {
    return this.http.get<DocumentNumbering>(`${environment.baseUrl}/numberGenerator/${id}`);
  }

  destroy(id: number): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/numberGenerator/destroy/${id}`);
  }

  generateNextNumberByDocumentType(type: string): Observable<string>{
    // @ts-ignore
    return this.http.get<string>(`${environment.baseUrl}/numberGenerator/generateNextByType/${type}`, {responseType: 'text'});
  }

  generateAndSaveNextByType(type: string): Observable<string>{
    return this.http.get<string>(`${environment.baseUrl}/numberGenerator/generateAndSaveNextByType/${type}`);
  }
}
