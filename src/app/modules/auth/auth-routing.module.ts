import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@app/modules/auth/container/login.component';
import { FullLayoutAuthComponent } from '@app/layouts/auth/full-layout-auth.component';

const routes: Routes = [
  {
    path: '',
    component: FullLayoutAuthComponent,
    data: {
      title: 'home'
    },
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'recovery', component: LoginComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class AuthRoutingModule { }
