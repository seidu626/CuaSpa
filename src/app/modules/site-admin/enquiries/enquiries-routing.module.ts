import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from '@app/modules/site-admin/enquiries/components/contacts.component';





const routes: Routes = [
  {
    path: '',
    data: {
      title: 'enquiries'
    },
    children: [
      {
        path: '',
        component: ContactsComponent,
        data: {
          title: ''
        }
      },    
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

export class EnquiriesRoutingModule { }
