import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DocumentTemplatesDTO} from './documentTemplates';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentTemplatesService {
  storeUpdateSubject = new Subject();

  constructor(private http: HttpClient) { }

  getAll(): Observable<DocumentTemplatesDTO[]> {
    return this.http.get<DocumentTemplatesDTO[]>(`${environment.baseUrl}/documentTemplates/findAll`);
  }

  findByDocumentType(type: string): Observable<DocumentTemplatesDTO[]> {
    return this.http.get<DocumentTemplatesDTO[]>(`${environment.baseUrl}/documentTemplates/findByDocumentType/${type}`);
  }

  storeOrUpdate(template: DocumentTemplatesDTO): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/documentTemplates/storeOrUpdate`, template).pipe(map(() => {
      this.storeUpdateSubject.next();
    }));
  }
}
