import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFirestore} from '@angular/fire/firestore';
import {User, UserInit} from '../models/user';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {UserOverview} from '../models/userOverview';
import {Paginate} from '../models/paginate';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient
  ) {
  }

  all(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}/user/all`).pipe(map((users) => {
      users.forEach(user => {
        user.displayName = user.firstName + ' ' + user.lastName;
      });

      return users;
    }));
  }

  paginate(page: number, size: number, qString: string): Observable<Paginate<UserOverview>> {
    return this.http.get<Paginate<UserOverview>>(`${environment.baseUrl}/user/overview?page=${page}&size=${size}${qString ? '&qString=' + qString : ''}`);
  }

  loggedUser(): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/user/logged`).pipe(map((user) => {
      user.displayName = user.firstName + ' ' + user.lastName;

      return user;
    }));
  }

  update(user: User): Observable<User> {
    return this.http.post<User>(`${environment.baseUrl}/user/update`, user);
  }

  updateFirebase(oUser: User, user: User) {
    this.afs.collection('users').doc(oUser.uid).set({
      uid: oUser.uid,
      appKey: oUser.appKey,
      displayName: user.firstName + ' ' + user.lastName,
      email: user.email,
      phone: user.phone,
      street: user.street,
      city: user.city,
      postalCode: user.postalCode,
      country: user.country
    });
  }

  store(user: UserInit): Observable<User> {
    return this.http.post<User>(`${environment.baseUrl}/user/store`, user);
  }

  findByUid(uid: string): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/user/${uid}`).pipe(map((user) => {
      user.displayName = user.firstName + ' ' + user.lastName;

      return user;
    }));
  }

  edit(uid: string): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/user/edit/${uid}`);
  }

  deactivate(uid: string): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/user/deactivate/${uid}`);
  }

  activate(uid: string): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/user/activate/${uid}`);
  }

  destroy(uid: string): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/user/destroy/${uid}`);
  }

  switchCompany(companyId: number): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/user/switchCompany/${companyId}`);
  }

  userOverview(uid: string): Observable<UserOverview> {
    return this.http.get<UserOverview>(`${environment.baseUrl}/user/overview/${uid}`);
  }

  switchProfile(id: number) {
    return this.http.get<void>(`${environment.baseUrl}/user/switchProfile/${id}`);
  }
}
