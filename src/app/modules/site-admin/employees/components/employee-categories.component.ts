import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../services/employee.service';
import { EmployeeCategory } from '../models/employee-category';
import { EmployeeCategoriesService } from '../services/employee-categories.service';

@Component({
  selector: 'app-employees',
  templateUrl: './views/employee-categories.component.html',
})
export class EmployeeCategoriesComponent implements OnInit {

  public rows: EmployeeCategory[]
  @ViewChild(DatatableComponent) table: DatatableComponent;
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  temp = [];
  columns = [
    { name: 'id' },
    { name: 'code' },
    { name: 'name' },
    { name: 'description' }
  ];



  placements: string[] = ['top', 'left', 'right', 'bottom'];
  popoverTitle: string = 'Delete record?';
  popoverMessage: string = 'Are you really <b>sure</b> you want to do this?';
  confirmText: string = 'Yes <i class="glyphicon glyphicon-ok"></i>';
  cancelText: string = 'No <i class="glyphicon glyphicon-remove"></i>';
  confirmClicked: boolean = false;
  cancelClicked: boolean = false;

  ngOnInit(): void {
    this.getValueBooks();
  }


  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
    vcr: ViewContainerRef, private employeeCategoriesService: EmployeeCategoriesService) {
  }

  onAdd() {
    this.router.navigate(['/admin/employees/addCategory'], { relativeTo: this.route });
  }

  onEdit(id: number) {
    this.router.navigate(['/admin/employees/addCategory', id], { relativeTo: this.route });
    // Emit edit event
    //EmitterService.get(this.editId).emit(id);
  }

  onDelete(id: number) {
    this.employeeCategoriesService.delete(id).subscribe(
      () => { this.toastr.info("Record successfully deleted.", "Record Deleted"); } //complete
    );
    // Todo: error handling
    //.finally(() => this.loadingIndicator = false);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.VoucherNumber.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  getValueBooks() {
    this.employeeCategoriesService.dataObserver.subscribe(
      (results: EmployeeCategory[]) => {
        this.rows = results;
      }
    );

  }

}
