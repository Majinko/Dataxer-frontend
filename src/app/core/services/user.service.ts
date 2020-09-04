import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../models/user';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

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

  all(): Observable<User[]>{
    return this.http.get<User[]>(`${environment.baseUrl}/user/all`)
  }

  /*all() {
  return this.afs.collection('users').snapshotChanges().pipe(map(users => {
    return users.map(user => {
      return { ...(user.payload.doc.data() as object) } as User;
    })
  }));
}*/

  loggedUser(): Observable<User>{
    return this.http.get<User>(`${environment.baseUrl}/user/logged`)
  }

  update(oUser: User, user: User) {
    this.afs.collection('users').doc(oUser.uid).set({
      uid: oUser.uid,
      appKey: oUser.appKey,
      displayName: user.name + ' ' + user.surname,
      email: user.email,
      phone: user.phone,
      street: user.street,
      city: user.city,
      postalCode: user.postalCode,
      country: user.country
    });
  }
}
