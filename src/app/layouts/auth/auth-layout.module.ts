import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FullLayoutAuthComponent } from './full-layout-auth.component';
import { siteServiceFactory } from '@app/factories/site-service.factory';
import { NgProgressModule, NgProgressBrowserXhr } from 'ngx-progressbar';
import { BrowserXhr } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

export const COMPONENTS = [
  FullLayoutAuthComponent,
];

@NgModule({
  imports: [CommonModule,
    RouterModule,
    NgProgressModule,
    ReactiveFormsModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr }

  ]
})
export class AuthLayoutModule {

}
