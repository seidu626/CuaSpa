import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsGeneralComponent } from '@app/modules/site-admin/settings/containers/settings-general.component';
import { SettingsComponent } from '@app/modules/site-admin/settings/containers/settings.component';




const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Settings'
    },
    children: [
      {
        path: '',
        component: SettingsComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'general', component: SettingsGeneralComponent,
        data: {
          title: 'General Settings'
        }
      },     
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

export class SettingsRoutingModule { }
