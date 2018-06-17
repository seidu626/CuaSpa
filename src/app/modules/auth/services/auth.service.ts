import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User, Authenticate } from '../models/user';
import { map, tap, catchError, retry} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private toastyService: ToastrService) { }

  /**
   *
   *
   * @param {Authenticate} { username, password }
   * @returns {Observable<User>}
   * @memberof AuthService
   */
  login({ username, password }: Authenticate): Observable<User> {
    return this.http
      .post<{ data: User }>('auth/login', { username, password }, { observe: 'response' })
      .pipe(
        map(res => {
          const user = res.body.data;
          this.setTokenInLocalStorage(res);
          return user;
        }),
        catchError((err, caught) => {
          console.log(err);
          this.toastyService.error(err.error['login_failure'][0], 'ERROR!!');
          return Observable.empty();
        })
      );
  }

  /**
   *
   *
   * @param {Authenticate} { name, username, password }
   * @returns {Observable<User>}
   * @memberof AuthService
   */
  register({ name, username, password }: Authenticate): Observable<User> {
    return this.http
      .post<{ data: User }>('auth', { name, email: username, password }, { observe: 'response' })
      .pipe(
        map(res => {
          const user = res.body.data;
          this.setTokenInLocalStorage(res);
          return user;
        }),
        catchError((err, caught) => {
          this.toastyService.error(err.error.errors.full_messages.join('<br>'), 'ERROR!!');
          return Observable.empty();
        })
      );
  }

  /**
   *
   *
   * @returns {Observable<boolean>}
   * @memberof AuthService
   */
  authorized(): Observable<boolean> {
    return this.http
      .get<{ status: boolean }>('auth/CheckAuthenticated')
      .pipe(
        retry(2),
        map(body => body.status)
      );
  }

  /**
   *
   *
   * @returns {Observable<User>}
   * @memberof AuthService
   */
  current_user(): Observable<User> {
    return this.http
      .get<User>('users/whoami')
      .map(body => body);
  }

  /**
   *
   *
   * @returns
   *
   * @memberof AuthService
   */
  logout() {
    return this.http
      .delete<{ success: boolean }>('auth/logout')
      .map(body => {
        localStorage.removeItem('user');
        return body.success;
      });
  }

  /**
   *
   *
   * @returns {{}}
   * @memberof AuthService
   */
  getTokenHeader(): HttpHeaders {
    const user = ['undefined', null]
      .indexOf(localStorage.getItem('user')) === -1 ?
      JSON.parse(localStorage.getItem('user')) : {};

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'token-type': 'Bearer',
      'access_token': user.access_token || [],
      'client': user.client || [],
      'uid': user.uid || []
    });
  }

  private setTokenInLocalStorage(res): void {
    const user_data = {
      ...res.body.data,
      access_token: res.headers.get('access-token'),
      client: res.headers.get('client')
    };
    const jsonData = JSON.stringify(user_data);
    console.log('USER_DATA: ' + jsonData);
    localStorage.setItem('user', jsonData);
  }
}
