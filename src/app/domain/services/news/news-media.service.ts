import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { NewsMedia } from '@app/domain/models/news/news-media';
import { ApiService } from '@app/core/services/api.service';
import { Http, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { LoggerService } from '@app/core/services/log4ts/logger.service';
import { LoaderService } from '@app/core/loader/loader.service';
import { environment } from '@env/environment';


@Injectable()
export class NewsMediaService extends ApiService {
  //https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/
  public dataObserver = new BehaviorSubject<NewsMedia[]>(new Array<NewsMedia>());


  constructor(protected http: Http, protected logger: LoggerService, protected loaderService: LoaderService) {
    super(http, logger, "newsMedia", loaderService);
    this.getAll().subscribe(
      (result) => { this.dataObserver.next(result) }
    );
  }


  getNewsMediaList(id: number): Observable<NewsMedia[]> {
    let url = environment.baseApiEndpoint + `newsMedia/newsMediaList?newsId=${id}`;
    return this.http.get(url)
      .catch(super.onCatch)
      .map((res: Response) => {
        let body = res.json();
        return body || {};
      })
      .map((payload: NewsMedia[]) => {
        return payload;
      });
  }

  getAll(): Observable<NewsMedia[]> {
    return super.getAll()
      .map((res: Response) => {
        let body = res.json();
        return body || {};
      })
      .map((payload: NewsMedia[]) => {
        return payload;
      });
  }

  get(id: number): Observable<NewsMedia> {
    return super.get(id)
      .map((res: Response) => {
        let body = res.json();
        return body || {};
      })
      .map((payload: NewsMedia) => {
        return payload;
      });
  }

  //create
  post(payload: FormData): Observable<Response> {
    let options = new RequestOptions();
    options.headers.delete('Content-Type');
    options.headers.append('Content-Type', 'multipart/form-data');
    var observable = super.post(payload, null);
    return observable.finally(() => {
      this.getAll().subscribe(
        (result) => { this.dataObserver.next(result) }
      );
    });
  }

  //update
  put(id: any, payload: FormData, options?: RequestOptionsArgs): Observable<Response> {
    var observable = super.put(id, payload, options);
    return observable.finally(() => {
      this.getAll().subscribe(
        (result) => { this.dataObserver.next(result) }
      );
    });
  }

  //delete
  delete(id: any): Observable<Response> {
    var observable = super.delete(id);
    return observable.finally(() => {
      this.getAll().subscribe(
        (result) => { this.dataObserver.next(result) }
      );
    });
  }

}

