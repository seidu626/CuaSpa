import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NewsItem } from '@app/domain/models/news/news-item';
import { NewsItemService } from '@app/domain/services/news/news-item.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-news-detail',
  templateUrl: './views/news-detail.component.html',
})
export class NewsDetailComponent implements OnInit {

  id: number;
  @Input() newsItem: Observable<NewsItem>;
  @Output() close = new EventEmitter();

  // required for validation


  constructor(private route: ActivatedRoute, private router: Router, private service: NewsItemService) {
  }

  ngOnInit() {

  }
  // #endregion

  onCancel() {
    this.close.emit({ component: 'news_item_list'});
  }

}
