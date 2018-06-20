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
  selector: 'app-news',
  templateUrl: './news.component.html',
})
export class NewsComponent implements OnInit {

  public newsItemList: Observable<NewsItem[]>;
  public newsItem: Observable<NewsItem>;


  temp = [];
  news_item_detail: boolean;
  news_item_list: boolean;

  ngOnInit(): void {
    this.getNewsItemList();
    this.news_item_list = true;
    this.news_item_detail = false;
  }

  constructor(private router: Router, private route: ActivatedRoute,
    vcr: ViewContainerRef, private newsItemService: NewsItemService, private newMediaService: NewsMediaService) {
  }


  onDetail(event) {
    console.log('view news');
    this.getNewsItem(event.id);
  }


  close(event) {
    this.getNewsItemList();
    this.news_item_list = true;
    this.news_item_detail = false;
  }

  getNewsItemList() {
    this.newsItemList = this.newsItemService.getAll(215, 300, 215, 300);
  }


  getNewsItem(id: number) {
    console.log(id);
    this.newsItem = this.newsItemService.get(id);
    this.news_item_list = false;
    this.news_item_detail = true;
  }

}
