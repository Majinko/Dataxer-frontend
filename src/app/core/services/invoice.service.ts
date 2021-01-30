import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Paginate} from '../models/paginate';
import {Invoice} from '../models/invoice';
import * as moment from 'moment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) {
  }

  getById(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${environment.baseUrl}/invoice/${id}`).pipe(map(invoice => {
      invoice.dueAtDays = Math.ceil(moment(invoice.dueDate).diff(new Date(), 'days', true));

      return invoice;
    }));
  }

  store(invoice: Invoice, relatedId: number = null): Observable<void> {
    return this.http.post<void>(relatedId != null ? `${environment.baseUrl}/invoice/store/${relatedId}` : `${environment.baseUrl}/invoice/store`, invoice);
  }

  paginate(page: number, size: number): Observable<Paginate<Invoice>> {
    return this.http.get<Paginate<Invoice>>(`${environment.baseUrl}/invoice/paginate?page=${page}&size=${size}`);
  }

  destroy(id: number): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/invoice/destroy/${id}`);
  }

  update(invoice: Invoice): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/invoice/update`, invoice);
  }

  getSummaryInvoice(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${environment.baseUrl}/invoice/summary-invoice/${id}`);
  }

  changeInvoiceTypeAndCreate(id: number, type: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${environment.baseUrl}/invoice/change-type-create-new/${id}/${type}`);
  }

  taxInvoice(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${environment.baseUrl}/invoice/tax-invoice/${id}`);
  }
}
