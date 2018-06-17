import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FullLayoutComponent } from './containers/full-layout.component';
import { MaterialModule } from '../material.module';
import { NgProgressModule, NgProgressBrowserXhr } from 'ngx-progressbar';
import { BrowserXhr } from '@angular/http';
import { FooterComponent } from '@app/layouts/public/components/footer/footer.component';
import { HeaderComponent } from '@app/layouts/public/components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SideBarComponent } from '@app/layouts/public/components/sidebar/sidebar.component';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';
/* any other core modules */
// (optional) Additional Covalent Modules imports
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CollapseModule } from 'ngx-bootstrap/collapse';

export const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SideBarComponent,
  FullLayoutComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    NgProgressModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    CollapseModule.forRoot(),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr },
    SettingsService,
  ]
})
export class LayoutPublicModule {

}
