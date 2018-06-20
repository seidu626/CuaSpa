import { Injectable } from '@angular/core';
import { Observable ,  Subject ,  BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from '../../../../core/services/api.service';
import { LoggerService } from '../../../../core/services/log4ts/logger.service';
import { Http, RequestOptionsArgs } from '@angular/http';
import { LoaderService } from '../../../../core/loader/loader.service';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';



@Injectable()
export class EmployeeStore {

  private _dataObserver: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>(new Array<Employee>());

  constructor(private service: EmployeeService) {
    this.loadInitialData();
  }


  loadInitialData() {
    this.getAll()
      .subscribe(
      res => {
        this._dataObserver.next(res);
      },
      err => console.log("Error retrieving employees")
      );
  }

  getAll() {
    return this.service.getAll();
  }

}
