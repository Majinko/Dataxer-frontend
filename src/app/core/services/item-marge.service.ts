import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ItemMargeDTO} from "../models/item";

@Injectable({
  providedIn: 'root'
})
export class ItemMargeService {

  constructor(private httpClient: HttpClient) {
  }

  get(): Observable<ItemMargeDTO> {
    return this.httpClient.get<ItemMargeDTO>(`${environment.baseUrl}/itemMarge/get`);
  }
  storeOrUpdate(itemMarge: ItemMargeDTO): Observable<void> {
    return this.httpClient.post<void>(`${environment.baseUrl}/itemMarge/storeOrUpdate`, itemMarge);
  }
}
