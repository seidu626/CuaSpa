
import {map, catchError, finalize} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable ,  Subject ,  BehaviorSubject } from 'rxjs';
import { NewsMedia } from '@app/domain/models/news/news-media';
import { ApiService } from '@app/core/services/api.service';
import { Http, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { LoggerService } from '@app/core/services/log4ts/logger.service';
import { LoaderService } from '@app/core/loader/loader.service';
import { environment } from '@env/environment';


@Injectable()
export class NewsMediaService extends ApiService {
  // https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/
  public dataObserver = new BehaviorSubject<NewsMedia[]>(new Array<NewsMedia>());


  constructor(protected http: Http, protected logger: LoggerService, protected loaderService: LoaderService) {
    super(http, logger, 'newsMedia', loaderService);
    this.getAll().subscribe(
      (result) => { this.dataObserver.next(result); }
    );
  }


  getNewsMediaList(id: number): Observable<NewsMedia[]> {
    const url = environment.baseApiEndpoint + `newsMedia/newsMediaList?newsId=${id}`;
    return this.http.get(url).pipe(
      catchError(super.onCatch),
      map((res: Response) => {
        const body = res.json();
        return body || {};
      }),
      map((payload: NewsMedia[]) => {
        return payload;
      }));
  }

  getAll(): Observable<NewsMedia[]> {
    return super.getAll().pipe(
      map((res: Response) => {
        const body = res.json();
        return body || {};
      }),
      map((payload: NewsMedia[]) => {
        return payload;
      }));
  }

  get(id: number): Observable<NewsMedia> {
    return super.get(id).pipe(
      map((res: Response) => {
        const body = res.json();
        return body || {};
      }),
      map((payload: NewsMedia) => {
        return payload;
      }));
  }

  post(payload: FormData): Observable<Response> {
    const observable = super.post(payload, null);
    return observable.pipe(finalize(() => {
      this.getAll().subscribe(
        (result) => { this.dataObserver.next(result); }
      );
    }));
  }

  // update
  put(id: any, payload: FormData, options?: RequestOptionsArgs): Observable<Response> {
    const observable = super.put(id, payload, options);
    return observable.pipe(finalize(() => {
      this.getAll().subscribe(
        (result) => { this.dataObserver.next(result); }
      );
    }));
  }

  // delete
  delete(id: any): Observable<Response> {
    const observable = super.delete(id);
    return observable.pipe(finalize(() => {
      this.getAll().subscribe(
        (result) => { this.dataObserver.next(result); }
      );
    }));
  }

}

