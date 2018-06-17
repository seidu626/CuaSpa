import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/users.component';
import { UserFormComponent } from './components/user-form.component';
import { RolesComponent } from './components/roles.component';
import { RoleFormComponent } from './components/role-form.component';
import { PermissionsComponent } from './components/permissions.component';
import { PermissionFormComponent } from './components/permission-form.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Security'
    },
    children: [
      {
        path: '',
        component: UsersComponent,
        data: {
          title: 'User Accounts'
        }
      },
      {
        path: 'addUser', component: UserFormComponent,
        data: {
          title: 'Add User'
        }
      },
      {
        path: 'addUser/:id', component: UserFormComponent,
        data: {
          title: 'Edit User'
        }
      },
      {
        path: 'roles',
        component: RolesComponent,
        data: {
          title: 'roles'
        }
      },
      {
        path: 'addRole', component: RoleFormComponent,
        data: {
          title: 'Add Role'
        }
      },
      {
        path: 'addRole/:id', component: RoleFormComponent,
        data: {
          title: 'Edit Role'
        }
      },
      {
        path: 'permissions',
        component: PermissionsComponent,
        data: {
          title: 'permissions'
        }
      },
      {
        path: 'addPermission', component: PermissionFormComponent,
        data: {
          title: 'Add Permission'
        }
      },
      {
        path: 'addPermission/:id', component: PermissionFormComponent,
        data: {
          title: 'Edit Permission'
        }
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

export class SecurityRoutingModule { }
