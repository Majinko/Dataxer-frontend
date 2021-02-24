import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFirestore} from '@angular/fire/firestore';
import {User, UserInit} from '../models/user';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

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
    return this.http.get<User[]>(`${environment.baseUrl}/user/all`);
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
}
