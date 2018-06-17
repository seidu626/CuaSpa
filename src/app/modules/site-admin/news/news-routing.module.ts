import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from '@app/modules/site-admin/news/containers/news.component';
import { NewsMediaListComponent } from '@app/modules/site-admin/news/components/news-media-list.component';
import { NewsMediaFormComponent } from '@app/modules/site-admin/news/components/news-media-form.component';
import { NewsMediaComponent } from '@app/modules/site-admin/news/containers/news-media.component';




const routes: Routes = [
  {
    path: '',
    data: {
      title: 'News'
    },
    children: [
      {
        path: '',
        component: NewsComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'media/:id',
        component: NewsMediaComponent,
        data: {
          title: 'News Media'
        }
      },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

export class NewsRoutingModule { }
