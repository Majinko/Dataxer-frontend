import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {BankAccount} from '../models/bank-account';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  accountChanges = new Subject<BankAccount>();

  constructor(private http: HttpClient) {
  }

  store(bankAccount: BankAccount): Observable<BankAccount> {
    return this.http.post<BankAccount>(`${environment.baseUrl}/bank-account/store`, bankAccount);
  }

  update(bankAccount: BankAccount): Observable<BankAccount> {
    return this.http.post<BankAccount>(`${environment.baseUrl}/bank-account/update`, bankAccount);
  }

  getAll(): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(`${environment.baseUrl}/bank-account/get-all`);
  }

  setDefaultBankAccount(id: number): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/bank-account/set-default/${id}`);
  }

  getDefaultBankAccount(companyId: number = null): Observable<BankAccount> {
    return this.http.get<BankAccount>(`${environment.baseUrl}/bank-account/get-default?companyId=${companyId}`);
  }

  destroy(id: number): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/bank-account/destroy/${id}`);
  }
}
