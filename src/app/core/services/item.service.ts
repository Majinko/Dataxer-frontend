import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Item, ItemPrice} from "../models/item";
import {environment} from "../../../environments/environment";
import {Paginate} from "../models/paginate";


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {
  }

  getById(id: number): Observable<Item> {
    return this.http.get<Item>(`${environment.baseUrl}/item/${id}`)
  }

  paginate(page: number, size: number): Observable<Paginate> {
    return this.http.get<Paginate>(environment.baseUrl + `/item/paginate?page=${page}&size=${size}`);
  }

  store(item: Item): Observable<Item> {
    return this.http.post<Item>(`${environment.baseUrl}/item/store`, item)
  }

  update(item: Item): Observable<Item> {
    return this.http.post<Item>(`${environment.baseUrl}/item/update`, item)
  }

  destroy(id: number): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/item/destroy/${id}`)
  }

  search(q: string): Observable<Item[]> {
    if (!q.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }

    return this.http.get<Item[]>(`${environment.baseUrl}/item/search/${q}`);
  }
}
