
import {map} from 'rxjs/operators';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Subject ,  Observable } from 'rxjs';
import { ActivatedRoute, Router, Params, UrlTree, PRIMARY_OUTLET, UrlSegmentGroup, UrlSegment } from '@angular/router';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';
import { APP_SETTINGS } from '@app/settings/app-settings';
import { MediaItem, IMedia } from '@app/modules/site-admin/media/models/media-item';
import { MediaItemService } from '@app/modules/site-admin/media/services/media-item.service';
import { NewsItem } from '@app/domain/models/news/news-item';
import { environment } from '@env/environment';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  showVidGallery = false;
  showPhotoGallery = false;
  viewMode: string;
  params: any;

  videos: Observable<IMedia[]>;
  photos: Observable<MediaItem[]>;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // https://angular.io/api/router/UrlSegment
      const tree: UrlTree = this.router.parseUrl(this.router.url);
      const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
      const s: UrlSegment[] = g.segments;
      this.viewMode = s[2].path;

      this.params = this.viewMode; // params['mode'];
      console.log(this.viewMode);
      console.log(this.params);
      switch (this.viewMode) {
        case 'photos': {
          this.showPhotoGallery = true;
          this.showVidGallery = false;
          this.photos = this.getItems(400, 400, 250, 250, 'gallery');
          break;
        } // gallery
        case 'videos': {
          this.showPhotoGallery = false;
          this.showVidGallery = true;
          this.videos = this.getItems(0, 0, 0, 0, 'video').pipe(map((payload: MediaItem[]) => {
            return payload.map(m => {
              const mObject: IMedia = {
                title: m.title,
                src: m.path,
                type: 'video/mp4'
              };
              return mObject;
            });
          }));
          break;
        } // videos
        default: {
          console.log('nothing to see here');
          break;
        }
      }
    });
  }

  constructor(private router: Router, private route: ActivatedRoute,
    vcr: ViewContainerRef, private service: SettingsService, private mediaItemService: MediaItemService) {

  }

  getItems(height: number = 0, width: number = 0, thumbHeight: number = 0,
    thumbWidth: number = 0, mediaType: string = '') {
    return this.mediaItemService.getAllMedia(height, width, thumbHeight, thumbWidth, mediaType);
    // .map((stream) => { return stream.filter(p => p.mediaType.toLowerCase() == mediaType.toLowerCase()) });
  }

}
