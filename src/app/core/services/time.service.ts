import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Time} from '../models/time';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor(private http: HttpClient) {
  }

  store(time: Time): Observable<Time> {
    return this.http.post<Time>(`${environment.baseUrl}/time/store`, time);
  }

  allForPeriod(from: string, to: string): Observable<Time[]> {
    return this.http.get<Time[]>(`${environment.baseUrl}/time/allForPeriod?from=${from}&to=${to}`);
  }

  getById(id: number): Observable<Time> {
    return this.http.get<Time>(`${environment.baseUrl}/time/${id}`);
  }

  update(time: Time): Observable<Time> {
    return this.http.post<Time>(`${environment.baseUrl}/time/update`, time);
  }

  destroy(id: number): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/time/destroy/${id}`);
  }
}
