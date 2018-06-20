import { Component, OnInit, ViewContainerRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './views/employee-list.component.html',
})
export class EmployeeListComponent implements OnInit {
  
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @Input() rows = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  columns = [
    { name: 'id' },
    { name: 'category' },
    { name: 'jobRole' },
    { name: 'section' },
    { name: 'username' },
    { name: 'surname' },
    { name: 'firstname' },
    { name: 'phone' },
    { name: 'email' },
    { name: 'physicalAddress' },
    { name: 'postalAddress' }
  ];
  @Output() add = new EventEmitter();
  @Output() profile = new EventEmitter<number>();
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
    vcr: ViewContainerRef, private employeesService: EmployeeService) {
  }

 

}
