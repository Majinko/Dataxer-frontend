import {Inject, Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    @Inject(AuthService) private readonly auth: AuthService,
    @Inject(Router) private readonly router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    return this.auth.user$.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/auth/login']).then();
        }
      })
    );
  }
}
