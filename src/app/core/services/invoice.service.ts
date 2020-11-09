import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Paginate} from "../models/paginate";
import {Invoice} from "../models/invoice";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) {
  }

  getById(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${environment.baseUrl}/invoice/${id}`);
  }

  store(invoice: Invoice): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/invoice/store`, invoice)
  }

  paginate(page: number, size: number): Observable<Paginate> {
    return this.http.get<Paginate>(`${environment.baseUrl}/invoice/paginate?page=${page}&size=${size}`);
  }

  destroy(id: number): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/invoice/destroy/${id}`);
  }

  update(invoice: Invoice): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/invoice/update`, invoice)
  }
}
