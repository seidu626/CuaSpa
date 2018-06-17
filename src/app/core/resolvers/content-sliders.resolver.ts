import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MediaItemService } from '@app/modules/site-admin/media/services/media-item.service';
import { Slider } from '@app/modules/site-public/home/models/slider';

@Injectable()
export class ContentSlidersResolver implements Resolve<any> {
  constructor(private mediaItemService: MediaItemService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Slider[] {

    const sliders = sessionStorage.getItem('_content_slider_');
    let result = [];

    if (!sliders) {
      this.mediaItemService.getSliders().subscribe(
        (data) => {
          sessionStorage.setItem('_content_slider_', JSON.stringify(data));
          result = data;
        }
      );
    } else {
      result = JSON.parse(sliders);
    }
    return result;
  }
}
