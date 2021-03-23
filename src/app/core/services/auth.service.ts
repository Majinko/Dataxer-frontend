import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {User} from '../models/user';
import {nonUndefined} from '../../../helper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User;
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    //// Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.setUser = user;

          return of(this.user);
        } else {
          return of(null);
        }
      })
    );
  }

  logInWithEmail(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password);
  }

  /* registerWithEmail(email: string, password: string): Promise<auth.UserCredential> {
     return this.afAuth.createUserWithEmailAndPassword(email, password);
   }*/

  public updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      appKey: user.uid,
      uid: user.uid,
      email: user.email,
      fullName: user.displayName,
      phone: nonUndefined(user.phone),
      street: nonUndefined(user.street),
      city: nonUndefined(user.city),
      postalCode: nonUndefined(user.postalCode),
      country: nonUndefined(user.country),
    };

    return userRef.set(data);
  }

  loggedUser() {
    return this.afs.doc<User>(`users/${this.user.uid}`).valueChanges();
  }

  async signOut() {
    await this.afAuth.signOut();
  }

  get isAuthenticated() {
    return typeof (this.user) !== 'undefined' ? this.user.token : false;
  }

  set setUser(credential) {
    this.user = {
      token: credential.za,
      uid: credential.uid,
      displayName: credential.displayName,
      email: credential.email
    };

    // todo nechapem preco to neslo priamo v objekte appKey: credential.uid
    this.user.appKey = this.user.uid;
  }
}
