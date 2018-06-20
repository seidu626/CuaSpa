import { Component, OnInit, ViewContainerRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Subject ,  Observable } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewsItem } from '@app/domain/models/news/news-item';


@Component({
  selector: 'app-news-list',
  templateUrl: './views/news-list.component.html',
  styleUrls: ['../styles/news-list.component.css']
})
export class NewsListComponent implements OnInit {

  @Input() rows: Observable<NewsItem[]>;
  loadingIndicator = true;

  @Output() viewEvent = new EventEmitter();

  placements: string[] = ['top', 'left', 'right', 'bottom'];
  popoverTitle = 'Delete record?';
  popoverMessage = 'Are you really <b>sure</b> you want to do this?';
  confirmText = 'Yes <i class="glyphicon glyphicon-ok"></i>';
  cancelText = 'No <i class="glyphicon glyphicon-remove"></i>';
  confirmClicked = false;
  cancelClicked = false;

  ngOnInit(): void {
  }

  onNewsMedia(id: number) {
    this.router.navigate(['/admin/news/media', id]);
  }

  updateFilter() {

  }

  constructor(private router: Router, private route: ActivatedRoute) {
  }

}
