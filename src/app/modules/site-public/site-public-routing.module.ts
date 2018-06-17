import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Layouts
import { HomeComponent } from '@app/modules/site-public/home/home.component';
import { FullLayoutComponent } from '@app/layouts/public/containers/full-layout.component';
import { AboutComponent } from '@app/modules/site-public/home/containers/about.component';
import { OrganisationComponent } from '@app/modules/site-public/organisation/containers/organisation.component';
import { NewsComponent } from '@app/modules/site-public/press/containers/news.component';
import { ContactUsComponent } from '@app/modules/site-public/home/components/contact.component';
import { GalleryComponent } from '@app/modules/site-public/gallery/containers/gallery.component';
import { FormsComponent } from '@app/modules/site-public/forms/containers/forms.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'home'
    },
    children: [
      {
        path: 'home',
        // resolve: {
        //   contentSliders: ContentSlidersResolver
        // },
        component: HomeComponent,
        data: {
          title: 'Home'
        }
      },
      {
        path: 'about',
        component: AboutComponent,
        data: {
          title: 'About Us'
        }
      },
      {
        path: 'profiles',
        component: OrganisationComponent,
        data: {
          title: 'Organisation'
        },
        children: [
          {
            path: '',
            component: OrganisationComponent,
            data: {
              title: 'Profiles'
            }
          },
          {
            path: 'profile/:id',
            component: OrganisationComponent,
            data: {
              title: 'Member Profile'
            }
          },
        ]
      },
      {
        path: 'gallery',
        component: GalleryComponent,
        data: {
          title: 'press & publications'
        },
        children: [
          {
            path: 'photos',
            component: GalleryComponent,
            data: {
              title: 'Gallery'
            }
          },
          {
            path: 'video',
            component: GalleryComponent,
            data: {
              title: 'Videos'
            }
          }
        ]
      },
      {
        path: 'forms',
        component: FormsComponent,
        data: {
          title: 'press & publications'
        },
        children: [
          {
            path: '',
            component: FormsComponent,
            data: {
              title: 'Forms'
            }
          }
        ]
      },
      {
        path: 'publications',
        component: NewsComponent,
        data: {
          title: 'Publications '
        }
      },
      {
        path: 'contact',
        component: ContactUsComponent,
        data: {
          title: 'Contact Us '
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SitePublicRoutingModule { }

