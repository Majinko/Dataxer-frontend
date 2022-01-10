import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AppProfile} from '../models/appProfile';
import firebase from "firebase";
import App = firebase.app.App;

@Injectable({
  providedIn: 'root'
})
export class AppUserProfileService {
  reloadProfile = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<AppProfile[]> {
    return this.http.get<AppProfile[]>(`${environment.baseUrl}/appProfile/all`);
  }

  storeOrUpdate(profile: AppProfile): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/appProfile/storeOrUpdate`, profile);
  }

  destroy(id: number): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/appProfile/destroy/${id}`);
  }

  defaultProfile(): Observable<AppProfile> {
    return this.http.get<AppProfile>(`${environment.baseUrl}/appProfile/defaultProfile`);
  }
}
