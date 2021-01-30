import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Payment} from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  newPayment = new Subject<Payment>();
  destroyPayment = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  public restToPay(id: number, type: string): Observable<number> {
    return this.http.get<number>(`${environment.baseUrl}/payment/restToPay/${id}/${type}`);
  }

  public store(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${environment.baseUrl}/payment/store`, payment);
  }

  public getDocumentPayments(id: number, type: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${environment.baseUrl}/payment/document-payments/${id}/${type}`);
  }

  public destroy(id: number): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/payment/destroy/${id}`);
  }
}
