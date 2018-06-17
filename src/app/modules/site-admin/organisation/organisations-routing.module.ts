import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentFormComponent } from './components/department-form.component';
import { DepartmentsComponent } from './components/departments.component';
import { JobRolesComponent } from './components/job-roles.component';
import { JobRoleFormComponent } from './components/job-role-form.component';
import { DivisionsComponent } from './components/divisions.component';
import { DivisionFormComponent } from './components/division-form.component';
import { SectionsComponent } from './components/sections.component';
import { SectionFormComponent } from './components/section-form.component';
import { LevelsComponent } from './components/levels.component';
import { LevelFormComponent } from './components/level-form.component';




const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Organisations'
    },
    children: [
      {
        path: '',
        component: DepartmentsComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'addDepartment', component: DepartmentFormComponent,
        data: {
          title: 'Add Department'
        }
      },
      {
        path: 'addDepartment/:id', component: DepartmentFormComponent,
        data: {
          title: 'Edit Department'
        }
      },
      {
        path: 'jobRoles',
        component: JobRolesComponent,
        data: {
          title: 'Job Roles'
        }
      },
      {
        path: 'addJobRole', component: JobRoleFormComponent,
        data: {
          title: 'Add JobRole'
        }
      },
      {
        path: 'addJobRole/:id', component: JobRoleFormComponent,
        data: {
          title: 'Edit JobRole'
        }
      },
      {
        path: 'divisions',
        component: DivisionsComponent,
        data: {
          title: 'Divisions'
        }
      },
      {
        path: 'addDivision', component: DivisionFormComponent,
        data: {
          title: 'Add Division'
        }
      },
      {
        path: 'addDivision/:id', component: DivisionFormComponent,
        data: {
          title: 'Edit Division'
        }
      },
      {
        path: 'sections',
        component: SectionsComponent,
        data: {
          title: 'Sections'
        }
      },
      {
        path: 'addSection', component: SectionFormComponent,
        data: {
          title: 'Add Section'
        }
      },
      {
        path: 'addSection/:id', component: SectionFormComponent,
        data: {
          title: 'Edit Section'
        }
      },
      {
        path: 'levels',
        component: LevelsComponent,
        data: {
          title: 'Levels'
        }
      },
      {
        path: 'addLevel', component: LevelFormComponent,
        data: {
          title: 'Add Level'
        }
      },
      {
        path: 'addLevel/:id', component: LevelFormComponent,
        data: {
          title: 'Edit Level'
        }
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

export class OrganisationsRoutingModule { }
