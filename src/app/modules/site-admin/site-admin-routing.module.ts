import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Layouts
import { FullLayoutAdminComponent } from '@app/layouts/administration/full-layout-admin.component';
import { SharedModule } from '@app/shared/shared.module';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutAdminComponent,
    data: {
      title: 'Dashboard'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: '@app/modules/site-admin/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'organisation',
        loadChildren: '@app/modules/site-admin/organisation/organisations.module#OrganisationsModule'
      },
      {
        path: 'employees',
        loadChildren: '@app/modules/site-admin/employees/employees.module#EmployeesModule'
      },
      {
        path: 'security',
        loadChildren: '@app/modules/site-admin/security/security.module#SecurityModule'
      },
      {
        path: 'news',
        loadChildren: '@app/modules/site-admin/news/news.module#NewsModule'
      },

      {
        path: 'media',
        loadChildren: '@app/modules/site-admin/media/media.module#MediaModule'
      },

      {
        path: 'settings',
        loadChildren: '@app/modules/site-admin/settings/settings.module#SettingsModule'
      },
      {
        path: 'enquiries',
        loadChildren: '@app/modules/site-admin/enquiries/enquiries.module#EnquiriesModule'
      },
    ]
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

export class SiteAdminRoutingModule { }
