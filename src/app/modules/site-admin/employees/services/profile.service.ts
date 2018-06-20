
import {map, catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable ,  Subject ,  BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Http, RequestOptionsArgs } from '@angular/http';
import { LoaderService } from '../../../../core/loader/loader.service';
import { LoggerService } from '../../../../core/services/log4ts/logger.service';
import { ApiDataService } from '../../../../core/services/api-data.service';
import { Profile } from '../models/profile';
import { environment } from '@env/environment';



@Injectable()
export class ProfileService extends ApiDataService<Profile> {

  constructor(protected http: Http, protected logger: LoggerService, protected loaderService: LoaderService) {
    super(http, logger, 'memberProfiles', loaderService);
  }

  getAll(height: number = 60, width: number = 60): Observable<Array<Profile>> {
    const url = environment.baseApiEndpoint + `memberProfiles/?height=${height}&width=${width}`;
    return this.http.get(url).pipe(
      catchError(super.onCatch),
      map((res: Response) => {
        const body = res.json();
        return body || {};
      }),
      map((payload: Profile[]) => {
        return payload.map(p => {
          p.picturePath = environment.Server + p.picturePath;
          return p;
        });
      }));
  }

  getCount(): Observable<number> {
    const url = environment.baseApiEndpoint + `memberProfiles/Count`;
    return this.http.get(url).pipe(
      map((res: any) => {
        const body = res.json();
        return body || {};
      }),
      map((payload: number) => {
        return payload;
      }));
  }

  get(id: number, height: number = 60, width: number = 60): Observable<Profile> {
    const url = environment.baseApiEndpoint + `memberProfiles/${id}/?height=${height}&width=${width}`;
    return this.http.get(url).pipe(
      map((res: any) => {
        const body = res.json();
        return body || {};
      }),
      map((payload: Profile) => {
        payload.picturePath = environment.Server + payload.picturePath;
        return payload;
      }));
  }

  post(payload: any): Observable<Response> {
    return super.post(payload);
  }

  put(id: any, payload: any): Observable<Response> {
    return super.put(id, payload);
  }

  getByEmployeeId(id: any, options?: RequestOptionsArgs): Observable<Profile> {
    const url = environment.baseApiEndpoint + `memberProfiles/EmployeeProfile/${id}`;
    return this.http.get(url, super.requestOptions(options)).pipe(
      catchError(super.onCatch),
      map((res: Response) => {
        const body = res.json();
        return body || {};
      }),
      map((payload: Profile) => {
        return payload;
      }));
  }

}
