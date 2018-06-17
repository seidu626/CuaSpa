import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { routing } from './settings-routing.module';
import { DivisionService } from '@app/modules/site-admin/organisation/services/division.service';
import { SectionService } from '@app/modules/site-admin/organisation/services/section.service';
import { LevelService } from '@app/modules/site-admin/organisation/services/level.service';
// Import Angular plugin.
import { EmployeeListComponent } from '@app/modules/site-admin/employees/components/employee-list.component';
import { EmployeesComponent } from '@app/modules/site-admin/employees/containers/employees.component';
import { SettingsGeneralComponent } from '@app/modules/site-admin/settings/containers/settings-general.component';
import { SettingsSocialComponent } from '@app/modules/site-admin/settings/components/settings-social.component';
import { SettingsCompanyInfoComponent } from '@app/modules/site-admin/settings/components/settings-company-info.component';
import { SettingsContactDataComponent } from '@app/modules/site-admin/settings/components/settings-contact-data.component';
import { SettingsFormComponent } from '@app/modules/site-admin/settings/components/settings-form.component';
import { SettingsListComponent } from '@app/modules/site-admin/settings/components/settings-list.component';
import { SettingsComponent } from '@app/modules/site-admin/settings/containers/settings.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    routing,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmationPopoverModule.forRoot({
      cancelButtonType: 'danger',
      confirmButtonType: 'info' // set defaults here
    }),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    NgbModule.forRoot(),
  ],
  declarations: [
    SettingsComponent,
    SettingsGeneralComponent,
    SettingsSocialComponent,
    SettingsCompanyInfoComponent,
    SettingsContactDataComponent,
    SettingsFormComponent,
    SettingsListComponent,
    SettingsSocialComponent
  ],
  providers: [  ]
})
export class SettingsModule { }
