import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';

import {AuthService} from '../services/auth.service';
import {MessageService} from '../services/message.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(MessageService) private readonly messageService: MessageService,
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // auto logout if 401 response returned from api
          this.authService.signOut().then(() => this.router.navigate(['/auth/login']));
        }

        if (error.status === 403) {
          this.messageService.add('Pre túto akciu nemáte oprávnenie.');
        } else {
          this.messageService.add('Somenthing wrong :(');
        }

        return throwError(error);
      })
    );
  }
}
