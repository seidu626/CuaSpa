import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoggerService } from './log4ts/logger.service';
import { ResponsePayload } from '../../models/response-payload';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../environments/environment';
import { RequestOptionsArgs, Http } from '@angular/http';
import { LoaderService } from '../loader/loader.service';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

const BASE_API_ENDPOINT = environment.baseApiEndpoint;

@Injectable()
export abstract class ApiDataService<TEntity> extends ApiService {
  // https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/
  public dataObserver = new BehaviorSubject<TEntity[]>(new Array<TEntity>());


  constructor(protected http: Http, protected logger: LoggerService, protected apiUrl, protected loaderService: LoaderService) {
    super(http, logger, apiUrl, loaderService);
    this.getAll().subscribe(
      (result) => { this.dataObserver.next(result); }
    );
  }

  getAll(): Observable<TEntity[]> {
    return super.getAll()
      .map((res: Response) => {
        const body = res.json();
        return body || {};
      })
      .map((payload: TEntity[]) => {
        return payload;
      });
  }

  get(id: any): Observable<TEntity> {
    return super.get(id)
      .map((res: Response) => {
        const body = res.json();
        return body || {};
      })
      .map((payload: TEntity) => {
        return payload;
      });
  }

  // create
  post(payload: TEntity): Observable<Response> {
    const observable = super.post(payload, );
    return observable.pipe(
      finalize(() => {
        this.getAll().subscribe(
          (result) => { this.dataObserver.next(result); }
        );
      })
    );
  }

  // update
  put(id: any, payload: TEntity): Observable<Response> {
    const observable = super.put(id, payload);
    return observable.pipe(
      finalize(() => {
        this.getAll().subscribe(
          (result) => { this.dataObserver.next(result); }
        );
      })
    );
  }

  // delete
  delete(id: any): Observable<Response> {
    const observable = super.delete(id);
    return observable.pipe(
      finalize(() => {
        this.getAll().subscribe(
          (result) => { this.dataObserver.next(result); }
        );
      })
    );
  }

}
