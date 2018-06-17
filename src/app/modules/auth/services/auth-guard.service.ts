import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, catchError, mergeMap, take } from 'rxjs/operators';
import * as Auth from '../store/actions/auth.actions';
import * as fromAuth from '../store/reducers';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store
      .select(fromAuth.getLoggedIn)
      .pipe(
        map(authed => {
          if (!authed) {
            this.store.dispatch(
              new Auth.LoginRedirect({
                queryParams: { returnUrl: state.url }
              }
              )
            );
            return false;
          }
          return true;
        }),
        take(1)
      );

  }
}
