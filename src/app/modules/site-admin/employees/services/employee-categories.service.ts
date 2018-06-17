import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from '../../../../core/services/api.service';
import { LoggerService } from '../../../../core/services/log4ts/logger.service';
import { LoaderService } from '../../../../core/loader/loader.service';
import { EmployeeCategory } from '../models/employee-category';

@Injectable()
export class EmployeeCategoriesService extends ApiService {
  //https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/
  public dataObserver = new BehaviorSubject<EmployeeCategory[]>(new Array<EmployeeCategory>());


  constructor(protected http: Http, protected logger: LoggerService, protected loaderService: LoaderService) {
    super(http, logger, "employeeCategories", loaderService);
    this.getAll().subscribe(
      (result) => { this.dataObserver.next(result); }
    );
  }

  getAll(): Observable<EmployeeCategory[]> {
    return super.getAll()
      .map((res: Response) => {
        let body = res.json();       
        return body || {};
      })
      .map((payload: EmployeeCategory[]) => {       
        return payload;      
      });
  }

  get(id: number): Observable<EmployeeCategory> {
    return super.get(id)
      .map((res: Response) => {
        let body = res.json();     
        return body || {};
      })
      .map((payload: EmployeeCategory) => {
        return payload;
      });
  }

  //create
  post(payload: EmployeeCategory){
    var observable = super.post(payload);
    return observable.finally(() => {
      this.getAll().subscribe(
        (result) => { this.dataObserver.next(result) }
      );
    });
  }

  //update
  put(id: any, payload: EmployeeCategory){
    var observable = super.put(id, payload);
    return observable.finally(() => {
      this.getAll().subscribe(
        (result) => { this.dataObserver.next(result) }
      );
    });
  }

  //delete
  delete(id: any) {
    var observable = super.delete(id);
    return observable.finally(() => {
      this.getAll().subscribe(
        (result) => { this.dataObserver.next(result) }
      );
    });
  }


}
