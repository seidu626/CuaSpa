import { Component, OnInit, ViewContainerRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { NewsItem } from '@app/domain/models/news/news-item';


@Component({
  selector: 'app-news-list',
  templateUrl: './views/news-list.component.html',
  styleUrls: ['../styles/news-list.component.css']
})
export class NewsListComponent implements OnInit {
  
  @Input() rows: Observable<NewsItem[]>;
  loadingIndicator: boolean = true;

  @Output() viewEvent = new EventEmitter();

  placements: string[] = ['top', 'left', 'right', 'bottom'];
  popoverTitle: string = 'Delete record?';
  popoverMessage: string = 'Are you really <b>sure</b> you want to do this?';
  confirmText: string = 'Yes <i class="glyphicon glyphicon-ok"></i>';
  cancelText: string = 'No <i class="glyphicon glyphicon-remove"></i>';
  confirmClicked: boolean = false;
  cancelClicked: boolean = false;

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
