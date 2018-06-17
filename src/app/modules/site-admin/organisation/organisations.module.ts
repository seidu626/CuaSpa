import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { routing } from './organisations-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DepartmentsComponent } from './components/departments.component';
import { DepartmentFormComponent } from './components/department-form.component';
import { DepartmentsService } from './services/departments.service';
import { JobRolesComponent } from './components/job-roles.component';
import { JobRoleService } from './services/job-role.service';
import { JobRoleFormComponent } from './components/job-role-form.component';
import { DivisionsComponent } from './components/divisions.component';
import { DivisionFormComponent } from './components/division-form.component';
import { LevelsComponent } from './components/levels.component';
import { LevelFormComponent } from './components/level-form.component';
import { SectionsComponent } from './components/sections.component';
import { SectionFormComponent } from './components/section-form.component';
import { DivisionService } from './services/division.service';
import { LevelService } from './services/level.service';
import { SectionService } from './services/section.service';

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
  ],
  declarations: [
    DepartmentsComponent,
    DepartmentFormComponent,
    JobRolesComponent,
    JobRoleFormComponent,
    DivisionsComponent,
    DivisionFormComponent,
    LevelsComponent,
    LevelFormComponent,
    SectionsComponent,
    SectionFormComponent,
  ],
  providers: [
    DepartmentsService,
    JobRoleService,
    DivisionService,
    LevelService,
    SectionService
  ]
})
export class OrganisationsModule { }
