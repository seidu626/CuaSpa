
import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable ,  Subject ,  BehaviorSubject } from 'rxjs';
import { Http } from '@angular/http';
import { NewsItem } from '@app/domain/models/news/news-item';
import { ApiDataService } from '@app/core/services/api-data.service';
import { LoggerService } from '@app/core/services/log4ts/logger.service';
import { LoaderService } from '@app/core/loader/loader.service';
import { environment } from '@env/environment';



@Injectable()
export class NewsItemService extends ApiDataService<NewsItem> {

  constructor(protected http: Http, protected logger: LoggerService, protected loaderService: LoaderService) {
    super(http, logger, 'newsItems', loaderService);
  }
  get(id: number): Observable<NewsItem> {
    return super.get(id).pipe(
      map((payload: NewsItem) => {
        if (payload.path) {
          payload.path = environment.Server + payload.path;
        }
        if (payload.thumbPath) {
          payload.thumbPath = environment.Server + payload.thumbPath;
        }
        return payload;
      }));
  }

  getAll(height: number = 0, width: number = 0, thumbHeight: number = 0,
    thumbWidth: number = 0, mediaType: string = ''): Observable<NewsItem[]> {
    const url =
      environment.baseApiEndpoint + `newsItems?height=${height}&width=${width}&thumbHeight=${thumbHeight}&thumbWidth=${thumbWidth}`;
    return this.http.get(url).pipe(
      catchError(super.onCatch),
      map((res: Response) => {
        const body = res.json();
        return body || {};
      }),
      map((payload: NewsItem[]) => {
        return payload.map(m => {
          if (m.path) {
            m.path = environment.Server + m.path;
          }
          if (m.thumbPath) {
            m.thumbPath = environment.Server + m.thumbPath;
          }
          return m;
        });
      }), );
  }


  post(payload: any): Observable<Response> {
    return super.post(payload);
  }

  put(id: any, payload: any): Observable<Response> {
    return super.put(id, payload);
  }

}
