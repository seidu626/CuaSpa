import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MediaItemsComponent } from '@app/modules/site-admin/media/components/media-items.component';
import { MediaItemFormComponent } from '@app/modules/site-admin/media/components/media-item-form.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Media'
    },
    children: [
      {
        path: '',
        component: MediaItemsComponent,
        data: {
          title: 'Media Items'
        }
      },
      {
        path: 'addMedia', component: MediaItemFormComponent,
        data: {
          title: 'Add Media'
        }
      },
      {
        path: 'addMedia/:id', component: MediaItemFormComponent,
        data: {
          title: 'Edit Media'
        }
      },      
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

export class MediaRoutingModule { }
