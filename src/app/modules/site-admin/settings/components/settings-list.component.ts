import { Component, OnInit, ViewContainerRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '@app/modules/site-admin/settings/services/settings.service';


@Component({
  selector: 'app-settings-list',
  templateUrl: './views/settings-list.component.html',
})
export class SettingsListComponent implements OnInit {
  
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @Input() rows = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  columns = [
    { name: 'id' },
    { name: 'name' },
    { name: 'value' },
    { name: 'description' }
  ];

  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  placements: string[] = ['top', 'left', 'right', 'bottom'];
  popoverTitle: string = 'Delete record?';
  popoverMessage: string = 'Are you really <b>sure</b> you want to do this?';
  confirmText: string = 'Yes <i class="glyphicon glyphicon-ok"></i>';
  cancelText: string = 'No <i class="glyphicon glyphicon-remove"></i>';
  confirmClicked: boolean = false;
  cancelClicked: boolean = false;

  ngOnInit(): void {
    
  }

  updateFilter(event) {

  }



  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
    vcr: ViewContainerRef, private settingsService: SettingsService) {
  }

 

}
