import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { NAV_DROPDOWN_DIRECTIVES } from '../../shared/nav-dropdown.directive';
import { SIDEBAR_TOGGLE_DIRECTIVES } from '../../shared/sidebar.directive';
import { AsideToggleDirective } from '../../shared/aside.directive';
import { BreadcrumbsComponent } from '../../shared/breadcrumb.component';
// Routing Module
import { routing } from './site-admin-routing.module';
import { UploadModule } from '@progress/kendo-angular-upload';
import { MediaModule } from '@app/modules/site-admin/media/media.module';
import { NgProgressModule } from 'ngx-progressbar';
import { LayoutAdminModule } from '@app/layouts/administration/layout-admin.module';


@NgModule({
  declarations: [
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective
  ],
  imports: [
    CommonModule,
    routing,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutAdminModule,
    UploadModule,
    NgProgressModule
  ],
  providers: [
  ],

})
export class SiteAdminModule { }
