import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { routing } from './security-routing.module';
import { UsersComponent } from './components/users.component';
import { UserFormComponent } from './components/user-form.component';
import { RolesComponent } from './components/roles.component';
import { RoleFormComponent } from './components/role-form.component';
import { PermissionsComponent } from './components/permissions.component';
import { PermissionFormComponent } from './components/permission-form.component';
import { RoleService } from './services/role.service';
import { PermissionService } from './services/permission.service';
import { UserManagerService } from './services/user-manager.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../employees/services/employee.service';
import { PasswordStrengthBar } from '../../../core/validators/password-strength-bar.validator';

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
    NgbModule.forRoot(),
  ],
  declarations: [
    UsersComponent,
    UserFormComponent,
    RolesComponent,
    RoleFormComponent,
    PermissionsComponent,
    PermissionFormComponent,
    PasswordStrengthBar
  ],
  providers: [
    UserManagerService,
    PermissionService,
    RoleService,
    EmployeeService
  ]
})
export class SecurityModule { }
