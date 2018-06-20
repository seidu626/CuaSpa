import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable ,  Subject ,  BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from '../../../../core/services/api.service';
import { LoggerService } from '../../../../core/services/log4ts/logger.service';
import { LoaderService } from '../../../../core/loader/loader.service';
import { ApiDataService } from '../../../../core/services/api-data.service';
import { Permission } from '../models/permission';

@Injectable()
export class PermissionService extends ApiDataService<Permission> {

  constructor(protected http: Http, protected logger: LoggerService, protected loaderService: LoaderService) {
    super(http, logger, "permissions", loaderService);
  }
}
