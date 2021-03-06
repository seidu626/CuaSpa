import { Component, OnInit, ViewContainerRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-news-item-list',
  templateUrl: './views/news-item-list.component.html',
})
export class NewsItemListComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @Input() rows = [];
  loadingIndicator = true;
  reorderable = true;
  columns = [
    { name: 'id' },
    { name: 'title' },
    { name: 'author' },
    { name: 'published' },
    { name: 'publishedDate' },
    { name: 'startDateUtc' },
    { name: 'endDateUtc' },
  ];

  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  placements: string[] = ['top', 'left', 'right', 'bottom'];
  popoverTitle = 'Delete record?';
  popoverMessage = 'Are you really <b>sure</b> you want to do this?';
  confirmText = 'Yes <i class="glyphicon glyphicon-ok"></i>';
  cancelText = 'No <i class="glyphicon glyphicon-remove"></i>';
  confirmClicked = false;
  cancelClicked = false;

  ngOnInit(): void {
  }

  updateFilter(event) {

  }


  onNewsMedia(id: number) {
    this.router.navigate(['/admin/news/media', id]);
  }

  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
    vcr: ViewContainerRef) {
  }

}
