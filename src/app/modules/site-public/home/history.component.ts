import { Component, OnInit, ViewContainerRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-history',
  templateUrl: './views/history.component.html',
})
export class HistoryComponent implements OnInit {

  @Input() history: string;

  ngOnInit(): void {
  }

  constructor(private router: Router, private route: ActivatedRoute, vcr: ViewContainerRef) {
  }
}
