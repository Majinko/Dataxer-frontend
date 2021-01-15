import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {CustomFile} from '../models/customFile';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient) {
  }

  getFileUrl(path: string): Observable<any> {
    // @ts-ignore
    return this.http.get<any>(`${environment.baseUrl}/storage/file-url/${path}`, {responseType: 'text'});
  }

  getPreviewImageWithContent(id: number, type: string): Observable<any> {
    // @ts-ignore
    return this.http.get<any>(`${environment.baseUrl}/storage/preview/${id}/${type}`, {responseType: 'blob'});
  }

  getPreviewImage(id: number, type: string): Observable<CustomFile> {
    return this.http.get<CustomFile>(`${environment.baseUrl}/storage/${id}/${type}`);
  }

  getById(id: number): Observable<CustomFile> {
    return this.http.get<CustomFile>(`${environment.baseUrl}/storage/${id}`);
  }

  destroy(id: number): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/storage/destroy/${id}`);
  }
}
