import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeFormComponent } from './components/employee-form.component';
import { EmployeeCategoriesComponent } from './components/employee-categories.component';
import { EmployeeCategoryFormComponent } from './components/employee-category-form.component';
import { ProfileFormComponent } from './components/profile-form.component';
import { ProfilesComponent } from './components/profiles.component';
import { MemberTypeFormComponent } from './components/member-type-form.component';
import { MemberTypesComponent } from './components/member-types.component';
import { EmployeesComponent } from '@app/modules/site-admin/employees/containers/employees.component';




const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Employees'
    },
    children: [
      {
        path: '',
        component: EmployeesComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'addEmployee', component: EmployeeFormComponent,
        data: {
          title: 'Add Employee'
        }
      },
      {
        path: 'addEmployee/:id', component: EmployeeFormComponent,
        data: {
          title: 'Edit Employee'
        }
      },
      {
        path: 'categories',
        component: EmployeeCategoriesComponent,
        data: {
          title: 'Categories'
        }
      },
      {
        path: 'addCategory', component: EmployeeCategoryFormComponent,
        data: {
          title: 'Add Category'
        }
      },
      {
        path: 'addCategory/:id', component: EmployeeCategoryFormComponent,
        data: {
          title: 'Edit Category'
        }
      },
      {
        path: 'profile/:id',
        component: ProfilesComponent,
        data: {
          title: 'Profile'
        }
      },
      {
        path: 'addProfile/:id', component: ProfileFormComponent,
        data: {
          title: 'Edit Profile'
        }
      },
      {
        path: 'memberTypes',
        component: MemberTypesComponent,
        data: {
          title: 'Membership Types'
        }
      },
      {
        path: 'addMemberType', component: MemberTypeFormComponent,
        data: {
          title: 'Add Member Type'
        }
      },
      {
        path: 'addMemberType/:id', component: MemberTypeFormComponent,
        data: {
          title: 'Edit Member Type'
        }
      }

    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

export class EmployeesRoutingModule { }
