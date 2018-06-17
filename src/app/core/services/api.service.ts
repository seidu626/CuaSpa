import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoggerService } from './log4ts/logger.service';
import { ResponsePayload } from '../../models/response-payload';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../environments/environment';
import { RequestOptionsArgs, Http } from '@angular/http';
import { LoaderService } from '../loader/loader.service';
import { JwtService } from './jwt.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, finalize, tap } from 'rxjs/operators';

const BASE_API_ENDPOINT = environment.baseApiEndpoint;

@Injectable()
export abstract class ApiService {
  constructor(protected http: Http, protected logger: LoggerService, protected apiUrl: string = null, protected loaderService: LoaderService) {
  }

  public get getBaseApiEndPoint() { return BASE_API_ENDPOINT; }
  // fetch all
  getAll(options?: RequestOptionsArgs): Observable<any> {
    this.showLoader();
    return this.http.get(this.getFullUrl(), this.requestOptions(options))
      .pipe(
        catchError(this.handleError),
        tap((res: Response) => {
          this.onSuccess(res);
        }, (error: any) => {
          this.onError(error);
        }),
        finalize(() => {
          this.onEnd();
        })
      );
  }

  filter(params: any, options?: RequestOptionsArgs): Observable<any> {
    this.showLoader();
    const body = '/filter/' + params;
    return this.http.get(this.getFullUrl(body), this.requestOptions(options))
      .pipe(
        catchError(this.handleError),
        tap((res: Response) => {
          this.onSuccess(res);
        }, (error: any) => {
          this.onError(error);
        }),
        finalize(() => {
          this.onEnd();
        })
      );
  }



  request(options?: RequestOptionsArgs): Observable<any> {
    this.showLoader();
    return this.http.request(this.getFullUrl(), this.requestOptions(options))
      .pipe(
        catchError(this.handleError),
        tap((res: Response) => {
          this.onSuccess(res);
        }, (error: any) => {
          this.onError(error);
        }),
        finalize(() => {
          this.onEnd();
        })
      );
  }

  get(id: any, options?: RequestOptionsArgs): Observable<any> {
    this.showLoader();
    return this.http.get(this.getFullUrl(id), this.requestOptions(options))
      .pipe(
        catchError(this.handleError),
        tap((res: Response) => {
          this.onSuccess(res);
        }, (error: any) => {
          this.onError(error);
        }),
        finalize(() => {
          this.onEnd();
        })
      );
  }

  post(body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.showLoader();
    return this.http.post(this.getFullUrl(), body, this.requestOptions(options))
      .pipe(
        catchError(this.handleError),
        tap((res: Response) => {
          this.onSuccess(res);
        }, (error: any) => {
          this.onError(error);
        }),
        finalize(() => {
          this.onEnd();
        })
      );
  }

  put(id: any, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.showLoader();
    return this.http.put(this.getFullUrl(id), body, this.requestOptions(options))
      .pipe(
        catchError(this.handleError),
        tap((res: Response) => {
          this.onSuccess(res);
        }, (error: any) => {
          this.onError(error);
        }),
        finalize(() => {
          this.onEnd();
        })
      );
  }

  delete(id: any, options?: RequestOptionsArgs): Observable<Response> {
    this.showLoader();
    return this.http.delete(this.getFullUrl(id), this.requestOptions(options))
      .pipe(
        catchError(this.handleError),
        tap((res: Response) => {
          this.onSuccess(res);
        }, (error: any) => {
          this.onError(error);
        }),
        finalize(() => {
          this.onEnd();
        })
      );
  }

  patch(id: any, body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.showLoader();
    return this.http.patch(this.getFullUrl(id), body, this.requestOptions(options))
      .pipe(
        catchError(this.handleError),
        tap((res: Response) => {
          this.onSuccess(res);
        }, (error: any) => {
          this.onError(error);
        }),
        finalize(() => {
          this.onEnd();
        })
      );
  }

  head(options?: RequestOptionsArgs): Observable<Response> {
    this.showLoader();
    return this.http.head(this.getFullUrl(), this.requestOptions(options))
      .pipe(
        catchError(this.handleError),
        tap((res: Response) => {
          this.onSuccess(res);
        }, (error: any) => {
          this.onError(error);
        }),
        finalize(() => {
          this.onEnd();
        })
      );
  }

  options(options?: RequestOptionsArgs): Observable<Response> {
    this.showLoader();
    return this.http.options(this.getFullUrl(), this.requestOptions(options))
      .pipe(
        catchError(this.handleError),
        tap((res: Response) => {
          this.onSuccess(res);
        }, (error: any) => {
          this.onError(error);
        }),
        finalize(() => {
          this.onEnd();
        })
      );
  }



  protected requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {

    if (options == null) {
      options = {};
      // options.headers = new Headers();
    }

    if (options.headers == null) {
      // options.headers = new Headers(); //TODO:
    }

    return options;
  }

  protected getFullUrl(id?: any): string {
    const url = BASE_API_ENDPOINT + this.apiUrl;
    if (id != null) {
      return url + `/${id}`;
    }
    return url;
  }

  protected onCatch(error: any, caught: Observable<any>): Observable<any> {
    return new ErrorObservable(error.error);
  }

  protected onSuccess(res: Response): void {
    console.log('Request successful');
  }

  protected onError(res: Response): void {
    if (res) {
      return console.log('Error, status code: ' + res.status);
    }
    return console.log('Error, Unable to establish connections');

  }

  protected onEnd(): void {
    this.hideLoader();
  }

  protected showLoader(): void {
    this.loaderService.show();
  }

  protected hideLoader(): void {
    this.loaderService.hide();
  }

  // error handler
  protected handleError(err: HttpErrorResponse | any) {
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('ApiService: A client-side or network error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`ApiService: Backend returned code ${err.status} - ${err.statusText} , body was: ${err.error}`);
    }
    return new ErrorObservable(err.error);
  }

  protected prepareHeader(headers: HttpHeaders | null): object {
    headers = headers || new HttpHeaders();


    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    // console.log('Content-Type'+headers.get('Content-Type'));
    return {
      headers: headers
    };
  }

}
