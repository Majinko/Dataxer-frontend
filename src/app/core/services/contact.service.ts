import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Contact} from '../models/contact';
import {Paginate} from '../models/paginate';
import {environment} from '../../../environments/environment';
import {map, tap} from 'rxjs/operators';
import {SlovakiaDigital} from '../models/slovakiaDigital';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contractorStore = new Subject<Contact>();

  constructor(private http: HttpClient) {
  }

  all(): Observable<Contact[]> {
    return this.http.get<Contact[]>(environment.baseUrl + '/contact/all');
  }

  filter(params = {}): Observable<Contact[]> {
    return this.http.get<Contact[]>(environment.baseUrl + '/contact/filter', {params});
  }

  getById(contactId: number): Observable<Contact> {
    return this.http.get<Contact>(environment.baseUrl + '/contact/' + contactId);
  }

  findByName(name: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(environment.baseUrl + `/contact/search?name=${name}`);
  }

  paginate(page: number, size: number, sort: string, searchedString: string): Observable<Paginate<Contact>> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Paginate<Contact>>(environment.baseUrl + `/contact/paginate?page=${page}&size=${size}&sort=${sort}&email=${searchedString}`);
  }

  store(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(environment.baseUrl + '/contact/store', contact).pipe(map(c => {
      this.contractorStore.next(c);

      return c;
    }));
  }

  update(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${environment.baseUrl}/contact/update`, contact);
  }

  destroy(contactId: number): Observable<void> {
    return this.http.get<void>(environment.baseUrl + '/contact/destroy/' + contactId);
  }

  digitalSlovakia(queryString: string): Observable<SlovakiaDigital[]> {
    return this.http.get<SlovakiaDigital[]>(`https://autoform.ekosystem.slovensko.digital/api/corporate_bodies/search?q=${isNaN(+queryString) ? 'name' : 'cin'}:${queryString}&private_access_token=e62ccee82db4b29937721077ea550c2dc382abffb1a5adb42ef8d533a4360e3798fa2187c2945930`)
  }
}
