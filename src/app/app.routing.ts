import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from '@app/layouts/public/components/page-notfound.component';
import { AuthGuard } from '@app/modules/auth/services/auth-guard.service';


export const routes: Routes = [
  {
    path: 'public',
    loadChildren: './modules/site-public/site-public.module#SitePublicModule'
  },
  {
    path: 'admin',
    loadChildren: '@app/modules/site-admin/site-admin.module#SiteAdminModule',
    // canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: '@app/modules/auth/auth.module#AuthModule'
  },
  { path: '', redirectTo: 'public/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
       //  enableTracing: true, // <-- debugging purposes only
       // preloadingstrategy: Preloadallmodules
      }
    )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
