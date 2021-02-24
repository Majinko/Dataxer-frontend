import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {DocumentRelation} from '../models/documentRelation';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentRelationService {
  newDocumentRelation = new Subject<DocumentRelation>();

  constructor(private http: HttpClient) {
  }

  getAllRelationDocuments(documentId: number): Observable<DocumentRelation[]> {
    return this.http.get<DocumentRelation[]>(`${environment.baseUrl}/relation/getRelatedDocuments/${documentId}`);
  }

  destroy(documentId: number, relatedDocumentId: number): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/relation/destroy/${documentId}/${relatedDocumentId}`);
  }

  search(documentId: number, queryString: string = null): Observable<DocumentRelation[]> {
    if (queryString === null){
      return this.http.get<DocumentRelation[]>(`${environment.baseUrl}/relation/search?documentId=${documentId}`);
    }else {
      return this.http.get<DocumentRelation[]>(`${environment.baseUrl}/relation/search?documentId=${documentId}&queryString=${queryString}`);
    }
  }

  store(documentRelation: DocumentRelation): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/relation/store?documentId=${documentRelation.documentId}&relatedDocumentId=${documentRelation.relatedDocumentId}`, null);
  }
}
