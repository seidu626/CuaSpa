
import {finalize, tap, catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { Observable ,  Subject ,  BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { LoggerService } from '../../../../core/services/log4ts/logger.service';
import { LoaderService } from '../../../../core/loader/loader.service';
import { ApiDataService } from '../../../../core/services/api-data.service';
import { UserModel } from '../models/user-model';
import { environment } from '../../../../../environments/environment';


@Injectable()
export class UserManagerService extends ApiDataService<UserModel> {
  constructor(protected http: Http, protected logger: LoggerService, protected loaderService: LoaderService) {
    super(http, logger, "usersManagement", loaderService);
  }


  resetPassword(id: any, body: any, options?: RequestOptionsArgs): Observable<Response> {
    let url = environment.baseApiEndpoint + `UsersManagement/PasswordReset/${id}`;
    return this.http.put(url, body, super.requestOptions(options)).pipe(
      catchError(super.onCatch),
      tap((res: Response) => {
        super.onSuccess(res);
      }, (error: any) => {
        this.onError(error);
      }),
      finalize(() => {
        super.onEnd();
      }),);
  }

}
