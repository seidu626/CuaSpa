import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { ApiDataService } from '@app/core/services/api-data.service';
import { NewsComment } from '@app/domain/models/news/news-comment';
import { LoggerService } from '@app/core/services/log4ts/logger.service';
import { LoaderService } from '@app/core/loader/loader.service';



@Injectable()
export class NewsCommentService extends ApiDataService<NewsComment> {

  constructor(protected http: Http, protected logger: LoggerService, protected loaderService: LoaderService) {
    super(http, logger, "newsComments", loaderService);
  }

  post(payload: any): Observable<Response> {
    return super.post(payload);
  }

  put(id: any, payload: any): Observable<Response> {
    return super.put(id, payload);
  }

}
