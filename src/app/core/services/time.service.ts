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
}
