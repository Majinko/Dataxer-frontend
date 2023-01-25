import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Invoice} from '../models/invoice';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {

  constructor(private http: HttpClient) {
  }

  downloadPdf(documentId: number, documentType: string = 'invoice') {
    // @ts-ignore
    return this.http.get<any>(`${environment.baseUrl}/pdf/downloadPdf/${documentId}?docType=${documentType}`, {responseType: 'blob'});
  }

  createImgFromPdf(fileUpload: File): Observable<string[]> {
    const formData = new FormData();

    formData.append('file', fileUpload, fileUpload.name);

    return this.http.post<string[]>(`${environment.baseUrl}/pdf/createImgFromPdf`, formData);
  }
}
