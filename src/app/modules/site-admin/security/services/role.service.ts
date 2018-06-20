import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable ,  Subject ,  BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { LoggerService } from '../../../../core/services/log4ts/logger.service';
import { LoaderService } from '../../../../core/loader/loader.service';
import { ApiDataService } from '../../../../core/services/api-data.service';
import { Role } from '../models/role';

@Injectable()
export class RoleService extends ApiDataService<Role> {

  constructor(protected http: Http, protected logger: LoggerService, protected loaderService: LoaderService) {
    super(http, logger, "rolesManagement", loaderService);
  }
}
