import { AuthGuard } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule} from './auth-routing.module';
import { LoginComponent } from '@app/modules/auth/container/login.component';
import { LoginFormComponent } from '@app/modules/auth/components/login-form.component';
import { SharedModule } from '@app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutModule } from '@app/layouts/auth/auth-layout.module';

export const COMPONENTS = [
  LoginComponent,
  LoginFormComponent,
];

@NgModule({
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, AuthLayoutModule, SharedModule],
  declarations: COMPONENTS
})
export class AuthModule {
  static forRoot() {
    return {
      ngModule: RootAuthModule,
      providers: []
    };
  }
}

@NgModule({
  imports: [
    AuthRoutingModule,
    AuthModule
  ],
})

export class RootAuthModule {}
