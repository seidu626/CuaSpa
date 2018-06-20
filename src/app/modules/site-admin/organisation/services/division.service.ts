import { Injectable } from '@angular/core';
import { Observable ,  Subject ,  BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { Department } from '../models/department';
import { LoaderService } from '../../../../core/loader/loader.service';
import { LoggerService } from '../../../../core/services/log4ts/logger.service';
import { ApiDataService } from '../../../../core/services/api-data.service';
import { Division } from '../models/division';



@Injectable()
export class DivisionService extends ApiDataService<Division> {

  constructor(protected http: Http, protected logger: LoggerService, protected loaderService: LoaderService) {
    super(http, logger, "divisions", loaderService);
  }

  post(payload: any): Observable<Response> {
    return super.post(payload);
  }

  put(id: any, payload: any): Observable<Response> {
    return super.put(id, payload);
  }

}
