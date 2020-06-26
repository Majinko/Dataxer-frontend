import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";
import {Pack} from "../models/pack";
import {Paginate} from "../models/paginate";

@Injectable({
  providedIn: 'root'
})
export class PackService {

  constructor(private http: HttpClient) {
  }

  store(set: Pack): Observable<Pack> {
    return this.http.post<Pack>(`${environment.baseUrl}/pack/store`, set)
  }

  update(set: Pack): Observable<Pack> {
    return this.http.post<Pack>(`${environment.baseUrl}/pack/update`, set)
  }

  getById(id: number): Observable<Pack> {
    return this.http.get<Pack>(`${environment.baseUrl}/pack/${id}`)
  }

  paginate(page: number, size: number): Observable<Paginate> {
    return this.http.get<Paginate>(environment.baseUrl + `/pack/paginate?page=${page}&size=${size}`);
  }

  destroy(id: number): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/pack/destroy/${id}`)
  }

  search(q: string): Observable<Pack[]> {
    if (!q.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }

    return this.http.get<Pack[]>(`${environment.baseUrl}/pack/search/${q}`);
  }
}
