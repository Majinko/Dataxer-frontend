import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User;
  user$: Observable<User>;

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    //// Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        //user.getIdToken(true).then();

        if (user) {
          this.setUser = user;

          return of(this.user);
        } else {
          user.getIdToken(true).then(token => {
            console.log(token);
            this.http.post<void>(`https://securetoken.googleapis.com/v1/token?key=${token}`, null).subscribe((res) => {
              console.log(res);
            });
          });

          return of(null);
        }
      })
    );
  }

  logInWithEmail(email: string, password: string) {

    return this.afAuth
      .signInWithEmailAndPassword(email, password);
  }

  sendPasswordResetEmail(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  /* registerWithEmail(email: string, password: string): Promise<auth.UserCredential> {
     return this.afAuth.createUserWithEmailAndPassword(email, password);
   }*/

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
