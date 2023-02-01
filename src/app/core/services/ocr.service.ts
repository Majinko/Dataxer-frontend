import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OcrService {

  constructor(private http: HttpClient) {
  }

  public getDataFromImage(base64: any): Observable<ArrayBuffer> {
    // @ts-ignore
    return this.http.post<void>(`${environment.baseUrl}/ocr/getData`, {base64}, {responseType: 'text'});
  }
}
