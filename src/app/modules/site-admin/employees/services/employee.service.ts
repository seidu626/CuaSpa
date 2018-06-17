import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';

import { BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from '../../../../core/services/api.service';
import { LoggerService } from '../../../../core/services/log4ts/logger.service';
import { Http, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { LoaderService } from '../../../../core/loader/loader.service';
import { Employee } from '../models/employee';



@Injectable()
export class EmployeeService extends ApiService {
  //https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/
  public employeesObserver = new BehaviorSubject<Employee[]>(new Array<Employee>());


  constructor(protected http: Http, protected logger: LoggerService, protected loaderService: LoaderService) {
    super(http, logger, "employees", loaderService);
    this.getAll().subscribe(
      (result) => { this.employeesObserver.next(result) }
    );
  }

  getAll(): Observable<Employee[]> {
    return super.getAll()
      .map((res: Response) => {
        let body = res.json();
        return body || {};
      })
      .map((payload: Employee[]) => {
        return payload;
      });
  }

  get(id: number): Observable<Employee> {
    return super.get(id)
      .map((res: Response) => {
        let body = res.json();
        return body || {};
      })
      .map((payload: Employee) => {
        return payload;
      });
  }

  //create
  post(payload: FormData): Observable<Response>{
    let options = new RequestOptions();
    options.headers.delete('Content-Type');
    options.headers.append('Content-Type', 'multipart/form-data');
    var observable = super.post(payload, null);
    return observable.finally(() => {
      this.getAll().subscribe(
        (result) => { this.employeesObserver.next(result) }
      );
    });
  }

  //update
  put(id: any, payload: FormData, options?: RequestOptionsArgs): Observable<Response>{
    var observable = super.put(id, payload, options);
    return observable.finally(() => {
      this.getAll().subscribe(
        (result) => { this.employeesObserver.next(result) }
      );
    });
  }

  //delete
  delete(id: any): Observable<Response>{
    var observable = super.delete(id);
    return observable.finally(() => {
      this.getAll().subscribe(
        (result) => { this.employeesObserver.next(result) }
      );
    });
  }

}
