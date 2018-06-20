
import {map} from 'rxjs/operators';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Subject ,  Observable } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '@app/modules/site-admin/employees/models/employee';
import { SettingInfo } from '@app/modules/site-admin/settings/models/settingInfo';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';
import { NewsItem } from '@app/domain/models/news/news-item';
import { NewsItemService } from '@app/domain/services/news/news-item.service';
import { NewsMedia } from '@app/domain/models/news/news-media';
import { NewsMediaService } from '@app/domain/services/news/news-media.service';


@Component({
  selector: 'app-news-media',
  templateUrl: './news-media.component.html',
})
export class NewsMediaComponent implements OnInit {

  public newsMediaList: Observable<NewsMedia[]>
  public newsMedia: NewsMedia;

  news_media_edit: boolean;
  news_media_list: boolean;
  newsItemId: number;

  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
    vcr: ViewContainerRef, private newsItemService: NewsItemService, private newMediaService: NewsMediaService) {
  }

  ngOnInit(): void {
    if (this.newsItemId) {
      this.getNewsMediaList(this.newsItemId);
    } else {
      this.route.params.subscribe(
        (param) => {
          let id = +param['id'];
          this.newsItemId = id;
          this.getNewsMediaList(id);
        });
    }
  }

  onAdd(event) {

    this.news_media_list = false;
    this.news_media_edit = true;
  }

  onEdit(event) {
    this.getNewsMedia(event.id);
  }

  onDelete(id: number) {

  }

  close(event) {
    this.getNewsMediaList(this.newsItemId);
    this.news_media_list = true;
    this.news_media_edit = false;
  }



  getNewsMediaList(id: number) {
    this.newsMediaList = this.newMediaService.dataObserver.pipe(map((payload) => {
      return payload.filter(m => m.newsItemId == id);
    }));
    this.news_media_list = true;
    this.news_media_edit = false;
  }


  getNewsMedia(id: number) {
    this.newMediaService.get(id).subscribe((data) => {
      this.newsMedia = data;
      this.news_media_list = false;
      this.news_media_edit = true;
    });
  }
}
