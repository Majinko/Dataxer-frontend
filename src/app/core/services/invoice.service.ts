import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Paginate} from '../models/paginate';
import {Invoice} from '../models/invoice';
import * as moment from 'moment';
import {map} from 'rxjs/operators';
import {prepareStringFilter} from '../../../helper';
import {ResourceService} from '../class/ResourceService';
import {Serializer} from '../models/serializers/Serializer';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends ResourceService<Invoice> {
  constructor(private httpClient: HttpClient) {
    super(
      httpClient,
      'priceOffer',
      new Serializer());
  }

  getById(id: number): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${environment.baseUrl}/invoice/${id}`).pipe(map(invoice => {
      invoice.dueAtDays = Math.ceil(moment(invoice.dueDate).diff(new Date(), 'days', true));

      return invoice;
    }));
  }

  paginate(page: number, size: number): Observable<Paginate<Invoice>> {
    const filter = prepareStringFilter('invoice', this.filter);

    return this.httpClient.get<Paginate<Invoice>>(`${environment.baseUrl}/invoice/paginate?page=${page}&size=${size}${filter !== '' ? '&filters=' + filter : ''}`).pipe(map(data => {
      data.content.forEach(invoice => {
        invoice.dueAtDays = Math.ceil(moment(invoice.dueDate).diff(new Date(), 'days', true));
      });

      return data;
    }));
  }

  changeInvoiceTypeAndCreate(id: number, type: string): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${environment.baseUrl}/invoice/change-type-create-new/${id}/${type}`);
  }

  taxInvoice(id: number): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${environment.baseUrl}/invoice/tax-invoice/${id}`);
  }

  summaryInvoice(id: number): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${environment.baseUrl}/invoice/summary-invoice/${id}`);
  }

  pdf(id: number): Observable<any> {
    // @ts-ignore
    return this.httpClient.get<any>(`${environment.baseUrl}/invoice/pdf/${id}`, {responseType: 'blob'});
  }

  findAllByProject(projectId: number): Observable<Invoice[]> {
    return this.httpClient.get<Invoice[]>(`${environment.baseUrl}/invoice/project/${projectId}`);
  }
}
