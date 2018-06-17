import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XHRBackend, RequestOptions, HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
// Routing Module
import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core/core.module';
import { MaterialModule } from '@app/layouts/material.module';
import { NgProgressModule, NgProgressBrowserXhr } from 'ngx-progressbar';
import { BrowserXhr } from '@angular/http';
import { PageNotFoundComponent } from '@app/layouts/public/components/page-notfound.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { UploadModule } from '@progress/kendo-angular-upload';
import { AppStoreModule } from '@app/core/store/app-store.module';
import { AppAuthStoreModule } from '@app/modules/auth/app-auth-store.module';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';
import { siteServiceFactory } from '@app/factories/site-service.factory';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgProgressModule,
    PerfectScrollbarModule,
    AppStoreModule,
    AppAuthStoreModule,
    CoreModule.forRoot(),
    UploadModule,
    ToastrModule.forRoot(), // ToastrModule added
    ToastContainerModule
  ],
  providers: [
    SettingsService,
    {
      provide: APP_INITIALIZER,
      useFactory: siteServiceFactory,
      deps: [SettingsService],
      multi: true,
    },
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
