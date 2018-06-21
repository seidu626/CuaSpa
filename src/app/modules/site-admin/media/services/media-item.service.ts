
import {map, catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { Observable ,  Subject ,  BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { MediaItem } from '@app/modules/site-admin/media/models/media-item';
import { LoggerService } from '@app/core/services/log4ts/logger.service';
import { LoaderService } from '@app/core/loader/loader.service';
import { ApiService } from '@app/core/services/api.service';
import { environment } from '@env/environment';
import { Slider } from '@app/modules/site-public/home/models/slider';
import { APP_SETTINGS } from '@app/settings/app-settings';
import { ApiDataService } from '../../../../core/services/api-data.service';

@Injectable()
export class MediaItemService extends ApiDataService<MediaItem> {

  constructor(protected http: Http, protected logger: LoggerService, protected loaderService: LoaderService) {
    super(http, logger, 'mediaItems', loaderService);
  }


  getSliders(height: number = 450, width: number = 650): Observable<Array<Slider>> {
    const url = environment.baseApiEndpoint + `mediaItems/contentSlider?height=${height}&width=${width}`;
    return this.http.get(url).pipe(
      catchError(super.onCatch),
      map((res: Response) => {
        const body = res.json();
        return body || {};
      }),
      map((payload: MediaItem[]) => {
        const sliders = payload.map(x => new Slider({
          'id': x.id,
          'title': x.title,
          'description': x.description,
          'image': environment.Server + x.path,
          'backgroundColor': x.backgroundColor
        }));
        APP_SETTINGS.contentsliders = sliders;
        return sliders;
      }));
  }
  getAllMedia(height: number = 0, width: number = 0, thumbHeight: number = 0,
    thumbWidth: number = 0, mediaType: string = ''): Observable<MediaItem[]> {
    const url =
      environment.baseApiEndpoint
      + `mediaItems?height=${height}&width=${width}&thumbHeight=${thumbHeight}&thumbWidth=${thumbWidth}&mediaType=${mediaType}`;
    return this.http.get(url).pipe(
      catchError(super.onCatch),
      map((res: Response) => {
        const body = res.json();
        return body || {};
      }),
      map((payload: MediaItem[]) => {
        return payload.map(m => {
          m.path = environment.Server + m.path;
          m.thumbPath = environment.Server + m.thumbPath;
          return m;
        });
      }));
  }

  get(id: number): Observable<MediaItem> {
    return super.get(id).pipe(
      map((payload: MediaItem) => {
        payload.path = environment.Server + payload.path;
        payload.thumbPath = environment.Server + payload.thumbPath;
        return payload;
      }));
  }


}
