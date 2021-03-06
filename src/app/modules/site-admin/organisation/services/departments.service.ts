
import {map, finalize} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable ,  Subject ,  BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { ApiService } from '../../../../core/services/api.service';
import { Department } from '../models/department';
import { LoaderService } from '../../../../core/loader/loader.service';
import { LoggerService } from '../../../../core/services/log4ts/logger.service';



@Injectable()
export class DepartmentsService extends ApiService {
  //https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/
  public departmentObserver = new BehaviorSubject<Department[]>(new Array<Department>());


  constructor(protected http: Http, protected logger: LoggerService, protected loaderService: LoaderService) {
    super(http, logger, "departments", loaderService);
    this.getAll().subscribe(
      (result) => { this.departmentObserver.next(result) }
    );
  }

  getAll(): Observable<Department[]> {
    return super.getAll().pipe(
      map((res: Response) => {
        let body = res.json();
        return body || {};
      }),
      map((payload: Department[]) => {
        return payload;
      }),);
  }

  get(id: number): Observable<Department> {
    return super.get(id).pipe(
      map((res: Response) => {
        let body = res.json();
        return body || {};
      }),
      map((payload: Department) => {
        return payload;
      }),);
  }

  //create
  post(payload: Department): Observable<Response>{
    var observable = super.post(payload,);
    return observable.pipe(finalize(() => {
      this.getAll().subscribe(
        (result) => { this.departmentObserver.next(result) }
      );
    }));
  }

  //update
  put(id: any, payload: Department): Observable<Response>{
    var observable = super.put(id, payload);
    return observable.pipe(finalize(() => {
      this.getAll().subscribe(
        (result) => { this.departmentObserver.next(result) }
      );
    }));
  }

  //delete
  delete(id: any): Observable<Response>{
    var observable = super.delete(id);
    return observable.pipe(finalize(() => {
      this.getAll().subscribe(
        (result) => { this.departmentObserver.next(result) }
      );
    }));
  }

}
