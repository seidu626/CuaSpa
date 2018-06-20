import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { routing } from './employees-routing.module';
import { EmployeeFormComponent } from './components/employee-form.component';
import { EmployeeService } from './services/employee.service';
import { DepartmentsService } from '../organisation/services/departments.service';
import { EmployeeCategoriesService } from './services/employee-categories.service';
import { JobRoleService } from '../organisation/services/job-role.service';
import { EmployeeCategoriesComponent } from './components/employee-categories.component';
import { EmployeeCategoryFormComponent } from './components/employee-category-form.component';
import { MemberTypeService } from './services/member-type.service';
import { MemberTypesComponent } from './components/member-types.component';
import { MemberTypeFormComponent } from './components/member-type-form.component';
import { ProfilesComponent } from './components/profiles.component';
import { ProfileFormComponent } from './components/profile-form.component';
import { DivisionService } from '@app/modules/site-admin/organisation/services/division.service';
import { SectionService } from '@app/modules/site-admin/organisation/services/section.service';
import { LevelService } from '@app/modules/site-admin/organisation/services/level.service';
// Import Angular plugin.
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { EmployeeListComponent } from '@app/modules/site-admin/employees/components/employee-list.component';
import { EmployeesComponent } from '@app/modules/site-admin/employees/containers/employees.component';
import { UploadModule } from '@progress/kendo-angular-upload';
import { ProfileService } from '@app/modules/site-admin/employees/services/profile.service';


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
    UploadModule
  ],
  declarations: [
    EmployeesComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    EmployeeCategoriesComponent,
    EmployeeCategoryFormComponent,
    MemberTypesComponent,
    MemberTypeFormComponent,
    ProfilesComponent,
    ProfileFormComponent
  ],
  providers: [
    EmployeeService,
    DepartmentsService,
    DivisionService,
    SectionService,
    EmployeeCategoriesService,
    JobRoleService,
    MemberTypeService,
    LevelService,
    ProfileService
  ]
})
export class EmployeesModule { }
