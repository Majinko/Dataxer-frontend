import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Contact} from '../models/contact';
import {Paginate} from '../models/paginate';
import {environment} from '../../../environments/environment';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contractorStore = new Subject<Contact>()


  constructor(private http: HttpClient) {
  }

  all(): Observable<Contact[]> {
    return this.http.get<Contact[]>(environment.baseUrl + '/contact/all').pipe(
      map(response => {

        if (response)
          response.forEach(r => {
            r.fullName = r.firstName + ' ' + r.lastName;
          });

        return response;
      }));
  }

  filter(params = {}): Observable<Contact[]> {
    return this.http.get<Contact[]>(environment.baseUrl + '/contact/filter', {params});
  }

  getById(contactId: number): Observable<Contact> {
    return this.http.get<Contact>(environment.baseUrl + '/contact/' + contactId);
  }

  findByFistNameAndLastName(firstName: string, lastName: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(environment.baseUrl + `/contact/search?firstName=${firstName}&lastName=${lastName}`);
  }

  paginate(page: number, size: number, sort: string, searchedString: string): Observable<Paginate> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Paginate>(environment.baseUrl + `/contact/paginate?page=${page}&size=${size}&sort=${sort}&email=${searchedString}`);
  }

  store(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(environment.baseUrl + '/contact/store', contact).pipe(map(c => {
      this.contractorStore.next(c);

      return c;
    }));
  }

  update(contact: Contact, contactId: number): Observable<Contact> {
    return this.http.put<Contact>(environment.baseUrl + '/contact/update/' + contactId, contact);
  }

  destroy(contactId: number): Observable<void> {
    return this.http.get<void>(environment.baseUrl + '/contact/destroy/' + contactId);
  }
}
