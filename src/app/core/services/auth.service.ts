import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import firebase from 'firebase';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  public user: User;
  public tokenExpirationTime: Date;

  private resetAtMinutes: number = 10;

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    //// Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          this.setUser = user;

          this.resetToken(); // todo spravit efektivnejsie

          return of(this.user);
        } else {

          return of(null);
        }
      })
    );

    this.checkToken();
  }

  public tryResetToken(): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}/user/resetToken/${this.user.uid}`);
  }

  public checkToken(): void {
    setInterval(() => {
      // @ts-ignore
      const tokenValidityInMinutes = Math.round((((this.tokenExpirationTime - new Date()) % 86400000) % 3600000) / 60000);

      if (tokenValidityInMinutes <= this.resetAtMinutes) {
        this.resetToken();
      }
    }, 1000);
  }

  private resetToken(): void {
    this.getToken$().subscribe(r => {
      this.user.token = r.token;
      this.tokenExpirationTime = new Date(r.expirationTime);
    });
  }

  public getToken$(): Observable<firebase.auth.IdTokenResult> {
    return from(this.afAuth.currentUser).pipe(switchMap(user => {
      return from(user.getIdTokenResult(true)).pipe(map(token => {
        return token;
      }));
    }));
  }

  logInWithEmail(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password);
  }

  sendPasswordResetEmail(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
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
