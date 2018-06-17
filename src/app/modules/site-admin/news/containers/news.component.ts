import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '@app/modules/site-admin/employees/models/employee';
import { SettingInfo } from '@app/modules/site-admin/settings/models/settingInfo';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';
import { NewsItem } from '@app/domain/models/news/news-item';
import { NewsItemService } from '@app/domain/services/news/news-item.service';
import { Observable } from 'rxjs/Observable';
import { NewsMedia } from '@app/domain/models/news/news-media';
import { NewsMediaService } from '@app/domain/services/news/news-media.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
})
export class NewsComponent implements OnInit {

  public newsItemList: Observable<NewsItem[]>;
  public newsItem: NewsItem;
  public newsMediaList: Observable<NewsMedia[]>
  public newsMedia: NewsMedia;

  temp = [];
  news_item_edit: boolean;
  news_media_edit: boolean;
  news_media_list: boolean;
  news_item_list: boolean;

  ngOnInit(): void {
    this.news_item_list = true;
    this.news_media_list = false;
    this.news_item_edit = false;
    this.news_media_edit = false;
   
    this.getNewsItemList();
  }
  
  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
    vcr: ViewContainerRef, private newsItemService: NewsItemService, private newMediaService: NewsMediaService) {
  }



  onAdd(event) {
    switch (event.component) {
      case 'news_item_edit': {
        this.news_item_list = false;
        this.news_media_list = false;
        this.news_item_edit = true;
        this.news_media_edit = false;
        break;
      }
      case 'news_media_edit': {
        this.news_item_list = false;
        this.news_media_list = false;
        this.news_item_edit = true;
        this.news_media_edit = false;
        break;
      }
    }
  }

  onEdit(event) {
    console.log(event);
    switch (event.component) {
      case 'news_item_edit': {
        this.getNewsItem(event.id);     
        break;
      }
      case 'news_media_edit': {
        this.getNewsMedia(event.id);      
        break;      }
    }
    
  }

  onDelete(id: number) {
   
  }

  close(event) {
    switch (event.component) {
      case 'news_item_list': {
        this.getNewsItemList();
        this.news_item_list = true;
        this.news_media_list = false;
        this.news_item_edit = false;
        this.news_media_edit = false;
        break;
      }
      case 'news_media_list': {
        this.getNewsMediaList(event.id);
        this.news_item_list = false;
        this.news_media_list = true;
        this.news_item_edit = false;
        this.news_media_edit = false;
        break;
      }
    }
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.VoucherNumber.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows=
    // Whenever the filter changes, always go back to the first page
    //this.table.offset = 0;
  }


  getNewsItemList() {
    this.newsItemList = this.newsItemService.dataObserver;
  }

  getNewsMediaList(id: number) {
    this.newsMediaList = this.newMediaService.getNewsMediaList(id);
  }

  getNewsItem(id: number) {
     this.newsItemService.get(id).subscribe(
       (data) => {
         this.newsItem = data;
         this.news_item_list = false;
         this.news_media_list = false;
         this.news_item_edit = true;
         this.news_media_edit = false;
       
      }
    );
  }

  getNewsMedia(id: number) {
    this.newMediaService.get(id).subscribe((data) => {
      this.newsMedia = data;
      this.news_item_list = false;
      this.news_media_list = false;
      this.news_item_edit = false;
      this.news_media_edit = true;
    });
  }
}
