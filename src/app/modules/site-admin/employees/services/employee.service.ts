
import {map, finalize} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable ,  Subject ,  BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from '../../../../core/services/api.service';
import { LoggerService } from '../../../../core/services/log4ts/logger.service';
import { Http, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { LoaderService } from '../../../../core/loader/loader.service';
import { Employee } from '../models/employee';
import { environment } from '@env/environment';



@Injectable()
export class EmployeeService extends ApiService {
  // https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/
  public employeesObserver = new BehaviorSubject<Employee[]>(new Array<Employee>());


  constructor(protected http: Http, protected logger: LoggerService, protected loaderService: LoaderService) {
    super(http, logger, 'employees', loaderService);
    this.getAll().subscribe(
      (result) => { this.employeesObserver.next(result); }
    );
  }

  getAll(): Observable<Employee[]> {
    return super.getAll().pipe(
      map((res: Response) => {
        const body = res.json();
        return body || {};
      }),
      map((payload: Employee[]) => {
        return payload.map(p => {
          p.picturePath = environment.Server + p.picturePath;
          return p;
        });
      }));
  }

  get(id: number): Observable<Employee> {
    return super.get(id).pipe(
      map((res: Response) => {
        const body = res.json();
        return body || {};
      }),
      map((payload: Employee) => {
        payload.picturePath = environment.Server + payload.picturePath;
        return payload;
      }));
  }

  // create
  post(payload: FormData): Observable<Response> {
    const observable = super.post(payload);
    return observable.pipe(finalize(() => {
      this.getAll().subscribe(
        (result) => { this.employeesObserver.next(result); }
      );
    }));
  }

  // update
  put(id: any, payload: FormData, options?: RequestOptionsArgs): Observable<Response> {
    const observable = super.put(id, payload, options);
    return observable.pipe(finalize(() => {
      this.getAll().subscribe(
        (result) => { this.employeesObserver.next(result); }
      );
    }));
  }

  // delete
  delete(id: any): Observable<Response> {
    const observable = super.delete(id);
    return observable.pipe(finalize(() => {
      this.getAll().subscribe(
        (result) => { this.employeesObserver.next(result); }
      );
    }));
  }

}
