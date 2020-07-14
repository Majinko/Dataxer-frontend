import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Demand} from "../models/demand";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Paginate} from "../models/paginate";

@Injectable({
  providedIn: 'root'
})
export class DemandService {

  constructor(private http: HttpClient) {
  }

  store(demand: Demand): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/demand/store`, demand)
  }

  paginate(page: number, size: number): Observable<Paginate> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Paginate>(environment.baseUrl + `/demand/paginate?page=${page}&size=${size}`);
  }

  getById(id: number): Observable<Demand> {
    return this.http.get<Demand>(`${environment.baseUrl}/demand/${id}`)
  }

  update(demand: Demand): Observable<Demand> {
    return this.http.post<Demand>(`${environment.baseUrl}/demand/update`, demand)
  }
}
