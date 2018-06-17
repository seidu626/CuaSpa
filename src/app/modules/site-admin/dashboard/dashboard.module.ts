import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgProgressModule, NgProgressBrowserXhr } from 'ngx-progressbar';
import { BrowserXhr } from '@angular/http';
import { NgxSpinnerModule , NgxSpinnerService} from 'ngx-spinner';

@NgModule({
  imports: [
    DashboardRoutingModule,
    NgProgressModule,
    NgxSpinnerModule
  ],
  declarations: [DashboardComponent],
  providers: [
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr },
    NgxSpinnerService
  ]
})
export class DashboardModule { }
