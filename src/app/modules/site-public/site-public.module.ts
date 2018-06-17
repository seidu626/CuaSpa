import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
// Routing Module
import { SitePublicRoutingModule } from './site-public-routing.module';
// Layouts
import { HomeComponent } from '@app/modules/site-public/home/home.component';
import { MaterialModule } from '@app/layouts/material.module';
import { LayoutPublicModule } from '@app/layouts/public/layout-public.module';
import { SettingsModule } from '@app/modules/site-public/settings';
import { NgbModule, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { MediaItemService } from '@app/modules/site-admin/media/services/media-item.service';
import { SettingsResolver } from '@app/core/resolvers/settings.resolver';
import { ContentSlidersResolver } from '@app/core/resolvers/content-sliders.resolver';
import { AboutComponent } from '@app/modules/site-public/home/containers/about.component';
import { HistoryComponent } from '@app/modules/site-public/home/history.component';
import { MissionVisionComponent } from '@app/modules/site-public/home/mission-vision.component';
import { OrganisationComponent } from '@app/modules/site-public/organisation/containers/organisation.component';
import { MemberProfileComponent } from '@app/modules/site-public/organisation/components/member-profile.component';
import { MemberProfilesComponent } from '@app/modules/site-public/organisation/components/member-profiles.component';
import { ProfileService } from '@app/modules/site-admin/employees/services/profile.service';
// ********************** angular-modal-gallery *****************************
import 'hammerjs'; // Mandatory for angular-modal-gallery 3.x.x or greater (`npm i --save hammerjs`)
import 'mousetrap'; // Mandatory for angular-modal-gallery 3.x.x or greater (`npm i --save mousetrap`)
import { ModalGalleryModule } from 'angular-modal-gallery'; // <----------------- angular-modal-gallery library import
import { NewsComponent } from '@app/modules/site-public/press/containers/news.component';
import { NewsListComponent } from '@app/modules/site-public/press/components/news-list.component.ts';
import { NewsDetailComponent } from '@app/modules/site-public/press/components/news-detail.component';
import { TimeAgoPipe } from '@app/core/time-ago-pipe';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { NewsItemService } from '@app/domain/services/news/news-item.service';
import { NewsMediaService } from '@app/domain/services/news/news-media.service';
import { NgProgressModule } from 'ngx-progressbar';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { ContactUsComponent } from '@app/modules/site-public/home/components/contact.component';
import { SharedModule } from '@app/shared/shared.module';
import { ContactService } from '@app/domain/services/contact.service';
import { PhotoGalleryComponent } from '@app/modules/site-public/gallery/components/photo-gallery.component';
import { VideoGalleryComponent } from '@app/modules/site-public/gallery/components/video-gallery.component';
import { RequestFormsComponent } from '@app/modules/site-public/forms/components/request-forms.component';
import { GalleryComponent } from '@app/modules/site-public/gallery/containers/gallery.component';
import { FormsComponent } from '@app/modules/site-public/forms/containers/forms.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxSpinnerModule , NgxSpinnerService} from 'ngx-spinner';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HttpModule,
    SitePublicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    MaterialModule,
    LayoutPublicModule,
    SettingsModule,
    NgbModule.forRoot(),
    ModalGalleryModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      cancelButtonType: 'danger',
      confirmButtonType: 'info' // set defaults here
    }),
    NgProgressModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    NgxSpinnerModule

  ],
  declarations: [
    HomeComponent,
    AboutComponent,
    HistoryComponent,
    FormsComponent,
    ContactUsComponent,
    GalleryComponent,
    MissionVisionComponent,
    OrganisationComponent,
    MemberProfileComponent,
    MemberProfilesComponent,
    PhotoGalleryComponent,
    VideoGalleryComponent,
    NewsComponent,
    RequestFormsComponent,
    NewsListComponent,
    NewsDetailComponent,
    TimeAgoPipe,
  ],
  providers: [
    MediaItemService,
    ContentSlidersResolver,
    NgbCarouselConfig,
    ProfileService,
    NewsItemService,
    NewsMediaService,
    ContactService,
    NgxSpinnerService
  ],

})
export class SitePublicModule { }
