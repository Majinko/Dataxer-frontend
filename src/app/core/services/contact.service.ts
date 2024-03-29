import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Contact} from '../models/contact';
import {environment} from '../../../environments/environment';
import {SlovakiaDigital} from '../models/slovakiaDigital';
import {ResourceService} from '../class/ResourceService';
import {Serializer} from '../models/serializers/Serializer';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends ResourceService<Contact> {
  contractorStore = new Subject<Contact>();

  constructor(
    private httpClient: HttpClient,
  ) {
    super(
      httpClient,
      'contact',
      new Serializer());
  }

  store(contact: Contact): Observable<Contact> {
    return this.httpClient
      .post<Contact>(`${environment.baseUrl}/contact/store`, contact).pipe(map((c) => {
        this.contractorStore.next(c);

        return c;
      }));
  }

  all(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(environment.baseUrl + '/contact/all');
  }

  allHasProject(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(environment.baseUrl + '/contact/allHasProject');
  }

  allHasCost(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(environment.baseUrl + '/contact/allHasCost');
  }

  allHasInvoice(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(environment.baseUrl + '/contact/allHasInvoice');
  }

  allHasPriceOffer(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(environment.baseUrl + '/contact/allHasPriceOffer');
  }

  digitalSlovakia(queryString: string): Observable<SlovakiaDigital[]> {
    return this.httpClient.get<SlovakiaDigital[]>(`https://autoform.ekosystem.slovensko.digital/api/corporate_bodies/search?q=${isNaN(+queryString) ? 'name' : 'cin'}:${queryString}&private_access_token=e62ccee82db4b29937721077ea550c2dc382abffb1a5adb42ef8d533a4360e3798fa2187c2945930`);
  }

  allHasPriceOfferCostInvoice(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(environment.baseUrl + '/contact/allHasPriceOfferCostInvoice');
  }
}
