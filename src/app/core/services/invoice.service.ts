import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Paginate} from '../models/paginate';
import {Invoice} from '../models/invoice';
import * as moment from 'moment';
import {map} from 'rxjs/operators';
import {ResourceService} from '../class/ResourceService';
import {Serializer} from '../models/serializers/Serializer';
import {HttpClient} from '@angular/common/http';
import {sum} from '../../../helper';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends ResourceService<Invoice> {
  constructor(private httpClient: HttpClient) {
    super(
      httpClient,
      'invoice',
      new Serializer());
  }

  duplicate(oldId: number): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${environment.baseUrl}/invoice/duplicate/${oldId}`);
  }

  getById(id: number): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${environment.baseUrl}/invoice/${id}`).pipe(map(invoice => {
      invoice.dueAtDays = Math.ceil(moment(invoice.dueDate).diff(new Date(), 'days', true));

      return invoice;
    }));
  }

  store(invoice: Invoice, relatedId: number = null): Observable<Invoice> {
    return this.httpClient.post<Invoice>(relatedId !== 0 ? `${environment.baseUrl}/invoice/store/${relatedId}` : `${environment.baseUrl}/invoice/store`, invoice);
  }

  storeFromBudget(invoice: Invoice, budgetId: number = null): Observable<Invoice> {
    return this.httpClient.post<Invoice>(`${environment.baseUrl}/invoice/storeFromBudget/${budgetId}`, invoice);
  }

  paginate(page: number, size: number): Observable<Paginate<Invoice>> {
    return this.httpClient.get<Paginate<Invoice>>(`${environment.baseUrl}/invoice/paginate?page=${page}&size=${size}${this.rsqlFilter ? '&filters=' + this.rsqlFilter : ''}`).pipe(map(data => {
      data.content.forEach(invoice => {
        invoice.paymentPrice = sum(invoice.payments, 'payedValue');
        invoice.dueAtDays = Math.ceil(moment(invoice.dueDate).diff(new Date(), 'days', true));
      });

      data.content = data.content.sort((a, b) => +b.number - +a.number);

      return data;
    }));
  }

  taxInvoice(id: number): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${environment.baseUrl}/invoice/tax-invoice/${id}`);
  }

  summaryInvoice(id: number, type: string = null): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${environment.baseUrl}/invoice/summary-invoice/${type ? type + '/' : ''}${id}`);
  }

  pdf(id: number): Observable<any> {
    // @ts-ignore
    return this.httpClient.get<any>(`${environment.baseUrl}/invoice/pdf/${id}`, {responseType: 'blob'});
  }

  findAllByProject(projectId: number, companyIds: number[] = null): Observable<Invoice[]> {
    return this.httpClient.get<Invoice[]>(`${environment.baseUrl}/invoice/project/${projectId}${companyIds && companyIds.length > 0 ? '?companyIds=' + companyIds : ''}`);
  }
}
