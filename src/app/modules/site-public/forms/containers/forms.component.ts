import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Router, Params, UrlTree, PRIMARY_OUTLET, UrlSegmentGroup, UrlSegment } from '@angular/router';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';
import { APP_SETTINGS } from '@app/settings/app-settings';
import { Observable } from 'rxjs/Observable';
import { MediaItem, IMedia } from '@app/modules/site-admin/media/models/media-item';
import { MediaItemService } from '@app/modules/site-admin/media/services/media-item.service';
import { NewsItem } from '@app/domain/models/news/news-item';
import { environment } from '@env/environment';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
})
export class FormsComponent implements OnInit {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  showForms = false;
  viewMode: string;
  params: any;

  requestForms: Observable<MediaItem[]>;

  ngOnInit(): void {
    this.showForms = true;
    this.requestForms = this.getItems(0, 0, 0, 0, 'form');

    //this.route.queryParams.subscribe(params => {
    //  //https://angular.io/api/router/UrlSegment
    //  const tree: UrlTree = this.router.parseUrl(this.router.url);
    //  const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
    //  const s: UrlSegment[] = g.segments;
    //  this.viewMode = s[1].path;
  
    //  this.params = params['mode'];
    
    //});    
  }

  constructor(private router: Router, private route: ActivatedRoute,
    vcr: ViewContainerRef, private service: SettingsService, private mediaItemService: MediaItemService)
  {
 
  }

  getItems(height: number = 0, width: number = 0, thumbHeight: number = 0,
    thumbWidth: number = 0, mediaType: string = "") {
    return this.mediaItemService.getAllMedia(height, width, thumbHeight, thumbWidth, mediaType);
      //.map((stream) => { return stream.filter(p => p.mediaType.toLowerCase() == mediaType.toLowerCase()) });
  }

}
