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
import { Http, RequestOptionsArgs } from '@angular/http';
import { LoaderService } from '../../../../core/loader/loader.service';




@Injectable()
export class SettingsStore {

}
