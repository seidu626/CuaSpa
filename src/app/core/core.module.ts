import { NgModule, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XHRBackend, RequestOptions } from '@angular/http';
import { LoaderService } from './loader/loader.service';
import { LoaderComponent } from './loader/loader.component';
import { LoggerService } from './services/log4ts/logger.service';
import { ConsoleLoggerService } from './services/log4ts/console-logger.service';
import { HttpRequestInterceptor } from './interceptors/http-request.interceptor';
// import { environment } from '@env/environment';

import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { debug } from './meta-reducers/debug.reducer';
import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';
import { LocalStorageService } from './local-storage/local-storage.service';
// Import HttpClientModule from @angular/common/http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgProgressModule, NgProgressBrowserXhr, NgProgressInterceptor } from 'ngx-progressbar';
import { TokenInterceptor } from '@app/modules/auth/interceptors/token.interceptor';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    LoaderComponent
  ],
  declarations: [
    LoaderComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },
    LoaderService,
    LoggerService,
    LocalStorageService,
    {
      provide: LoggerService, useClass: ConsoleLoggerService
    },
  ]
})

export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [LocalStorageService],
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
