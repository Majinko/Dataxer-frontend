import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CustomFile} from '../models/customFile';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService { // helper service for all documentBase

  constructor(
    private http: HttpClient
  ) {
  }

  downloadPfsInZip(documentType: string, filter: string): Observable<CustomFile> {
    return this.http.get<CustomFile>(`${environment.baseUrl}/document/downloadPfsInZip?documentType=${documentType}&rqlFilter=${filter}`);
  }
}
