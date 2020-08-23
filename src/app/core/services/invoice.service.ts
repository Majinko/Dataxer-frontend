import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Invoice} from "../models/Invoice";
import {environment} from "../../../environments/environment";
import {DocumentFilter} from "../filter/document-filter";
import {Paginate} from "../models/paginate";
import {prepareFilter} from "../../../helper";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${environment.baseUrl}/invoice/${id}`);
  }

  store(Invoice: Invoice): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/invoice/store`, Invoice)
  }

  paginate(page: number, size: number, documentFilter: DocumentFilter): Observable<Paginate> {
    let params = prepareFilter(documentFilter);

    return this.http.get<Paginate>(`${environment.baseUrl}/invoice/paginate?page=${page}&size=${size}`, {params});
  }

  destroy(id: number): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/invoice/destroy/${id}`);
  }

  update(Invoice: Invoice): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/invoice/update`, Invoice)
  }
}
