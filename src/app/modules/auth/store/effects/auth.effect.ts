import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import * as Auth from '../actions/auth.actions';
import { of, pipe, } from 'rxjs';
import { map, tap, catchError, exhaustMap, switchMap, filter, finalize } from 'rxjs/operators';

// Object.assign(Actions.prototype, {  map, filter, exhaustMap, switchMap, mergeMap, pipe });

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$
    .ofType(Auth.LOGIN)
    .pipe(
      map((action: Auth.Login) => action.payload),
      exhaustMap(auth =>
        this.authService
          .login(auth)
          .pipe(
            map(user => {
              return new Auth.LoginSuccess({ user });
            }),
            catchError(error => of(new Auth.LoginFailure(error))),
           // finalize(() => )
          )
      )
    );

  @Effect()
  register$ = this.actions$
    .ofType(Auth.REGISTER)
    .pipe(
      map((action: Auth.Register) => action.payload),
      exhaustMap(auth =>
        this.authService
          .register(auth)
          .pipe(
            map(user => new Auth.LoginSuccess({ user })),
            catchError(error => of(new Auth.LoginFailure(error)))
          )
      )
    );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$
    .ofType(Auth.LOGIN_SUCCESS)
    .pipe(tap(() => this.router.navigate(['/'])));

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$
    .ofType(Auth.LOGIN_REDIRECT)
    .pipe(
      map((action: Auth.LoginRedirect) => action.payload),
      tap(params => {
        this.router.navigate(['/auth/login'], { ...params });
      })
    );

  @Effect({ dispatch: false })
  logoutRedirect$ = this.actions$
    .ofType(Auth.LOGOUT)
    .pipe(
      map((action: Auth.Logout) => action.payload),
      exhaustMap(auth =>
        this.authService
          .logout()
          .pipe(
            map(() => this.router.navigate(['/auth/login'])),
            catchError(error => of(new Auth.LoginFailure(error)))
          )
      )
    );

  @Effect()
  authorized$ = this.actions$
    .ofType(Auth.AUTHORIZED)
    .pipe(
      switchMap(() => this.authService.authorized()),
      filter<boolean>(status => status),
      switchMap(() => this.authService.current_user()),
      map(user => new Auth.LoginSuccess({ user }))
    );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) { }
}
