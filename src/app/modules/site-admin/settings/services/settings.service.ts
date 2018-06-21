import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, catchError, finalize } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Http, RequestOptionsArgs } from '@angular/http';
import { ApiDataService } from '@app/core/services/api-data.service';
import { LoggerService } from '@app/core/services/log4ts/logger.service';
import { LoaderService } from '@app/core/loader/loader.service';
import { SettingInfo } from '@app/modules/site-admin/settings/models/settingInfo';
import { environment } from '@env/environment';
import { GeneralSettings } from '@app/modules/site-admin/settings/models/general-settings';
import { APP_SETTINGS } from '@app/settings/app-settings';


@Injectable()
export class SettingsService extends ApiDataService<SettingInfo> {
  generalSettings: GeneralSettings;
  settings: SettingInfo[];

  constructor(protected http: Http, protected logger: LoggerService, protected loaderService: LoaderService) {
    super(http, logger, 'settings', loaderService);
  }
  // https://github.com/IntertechInc/angular-app-initializer
  getSettings(): Promise<any> {
    console.log(`getSettings:: before http.get call`);
    // if (!APP_SETTINGS.generalSettings) {return  Promise.resolve(); }

    const promise = this.getGeneralSettings().toPromise()
      .then(settings => {
        console.log(`Settings from API: `, settings);
        APP_SETTINGS.generalSettings = settings;
        console.log(`APP_SETTINGS: `, APP_SETTINGS);
        return settings;
      });

    return promise;
  }

  getAll(options?: RequestOptionsArgs): Observable<SettingInfo[]> {
    return super.getAll().pipe(map((payload) => {
      this.settings = payload;
      return payload;
    }));
  }

  post(payload: any): Observable<Response> {
    return super.post(payload);
  }

  put(id: any, payload: any): Observable<Response> {
    return super.put(id, payload);
  }

  getGeneralSettings(): Observable<GeneralSettings> {
    const url = environment.baseApiEndpoint + `settings/GeneralSettings`;
    return this.http.get(url)
    .pipe(
      catchError(this.onCatch)
    ).pipe(      map((res: Response) => {
        const body = res.json();
        return body || {};
      }),
      map((payload: GeneralSettings) => {
        return payload;
      }), );
  }

  postGeneralSettings(body: any, options?: RequestOptionsArgs): Observable<Response> {
    this.showLoader();
    const url = environment.baseApiEndpoint + `settings/GeneralSettings`;
    return this.http.post(url, body, this.requestOptions(options))
    .pipe(
      tap((res: any) => {
        this.onSuccess(res);
      }, (error: any) => {
        this.onError(error);
      }),
      catchError(this.handleError),
      finalize(() => {
        this.onEnd();
      })
    );
  }

}
